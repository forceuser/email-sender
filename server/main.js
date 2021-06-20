import process from "process";
import nodePath from "path";
import {fileURLToPath} from "url";
import {createRequire} from "module";
import {readFile} from "fs/promises";
import crypto from "crypto";
import Fastify from "fastify";
import FastifyStatic from "fastify-static";
import FastifyCookie from "fastify-cookie";
import FastifyHttpsRedirect from "fastify-https-redirect";
import FastifyExpress from "fastify-express";
import {packageDir, pkg} from "#server/package.js";

const require = createRequire(import.meta.url);

const uniq = (uniqLength) => Array(uniqLength).fill(0).map(() => Math.random().toString(36).charAt(2)).map(ch => Math.random() > 0.5 ? ch.toUpperCase() : ch.toLowerCase()).join("");

const traceIdLength = 26;


const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

const cwd = process.cwd();
const srcDir = nodePath.join(packageDir, "app/src");
const distDir = nodePath.join(packageDir, "app/dist");
const distClientDir = nodePath.join(distDir, "client");
const distServerDir = nodePath.join(distDir, "server");
const staticDir = nodePath.join(packageDir, "static");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer (root = packageDir, isProd = process.env.NODE_ENV === "production") {
	const prod = {index: "", manifest: {}};
	const isDev = !isProd;
	if (isProd) {
		prod.index = await readFile(nodePath.join(distClientDir, "index.html"), "utf-8");
		prod.manifest = JSON.parse(await readFile(nodePath.join(distClientDir, "ssr-manifest.json"), "utf-8"));
	}

	console.log("isProd", isProd);


	const fastify = Fastify(Object.assign({
		// trustProxy: true,
		// trustProxy: argv["trust-proxy"],
		// http2: argv.http2,
		// https: (argv.https || argv.http2) ? sslOptions : false,
	}, {}));


	await fastify.register(FastifyExpress);
	await fastify.register(FastifyCookie);

	/**
     * @type {import("vite").ViteDevServer}
     */
	let vite;
	let entryServer;

	fastify.register(FastifyStatic, {
		root: [staticDir, ...(isProd ? [distClientDir] : [])],
		prefix: "/",
		dotfiles: "allow",
		index: false,
		decorateReply: true, // disable for next regs of FastifyStatic
		setHeaders (response, path, stat) {
			// response.setHeader("trace-id", "nosniff");
			response.setHeader("x-content-type-options", "nosniff");
		},
	});

	if (isProd) {
		entryServer = (require(nodePath.join(distServerDir, "entry-server.cjs")));
	}

	if (isDev) {
		vite = await (await import("vite")).default.createServer({
			root,
			logLevel: isTest ? "error" : "info",
			server: {
				middlewareMode: "ssr",
				watch: {
					// During tests we edit the files too fast and sometimes chokidar
					// misses change events, so enforce polling for consistency
					usePolling: true,
					interval: 100,
				},
			},
		});

		// use vite's connect instance as middleware
		fastify.use(vite.middlewares);
	}

	let entryApis;
	fastify.route({
		method: "POST",
		url: "/api-call/:name",
		handler: async (request, reply) => {
			if (isDev) {
				// console.log("vite.moduleGraph", vite.moduleGraph);
				// vite.moduleGraph.invalidateAll();
				entryServer = (await vite.ssrLoadModule(nodePath.join(srcDir, "entry-server.js")));
				// console.log("dev entry server reload", entryServer);
			}

			const api = (await entryServer.getApis()).get(request.params.name);
			if (api) {
				reply.send(await api.handler(...(request.body?.params ?? [])));
			}
			else {
				reply.code(404).send({errText: "no such api"});
			}
		},
	});

	fastify.setNotFoundHandler(async (request, reply) => {
		let ssrError;
		let renderResult;
		let template;
		try {
			if (isDev) {
				entryServer = (await vite.ssrLoadModule(nodePath.join(srcDir, "entry-server.js"), {
					isolated: true,
				}));
			}

			// const renderedTemplate = Mustache.render(indexTemplate, {
			// 	nonce,
			// 	csrfToken,
			// 	traceId,
			// 	randomX: crypto.randomBytes(16).toString("base64"),
			// });
			const url = request.url;
			// console.log("URL", url);


			if (isProd) {
				template = prod.index;
			}
			else {
			// always read fresh template in dev
				const templateRaw = await readFile(nodePath.join(packageDir, "index.html"), "utf-8");
				template = await vite.transformIndexHtml(url, templateRaw);
			}

			renderResult = await entryServer.render(url, prod.manifest);
			// console.log("appHtml", appHtml);
		}
		catch (error) {
			// If an error is caught, let vite fix the stracktrace so it maps back to
			// your actual source code.
			vite.ssrFixStacktrace(error);
			ssrError = error;
			console.log("ssrError", ssrError);
			// logger.log({level: "error", message: error.message});
		}

		try {
			const nonce = crypto.randomBytes(16).toString("base64");
			const csrfToken = uniq(26);
			const traceId = uniq(26);

			const {appHtml, preloadLinks, pageMeta} = renderResult || {};
			const html = template
				.replace(`<!--preload-links-->`, preloadLinks || "")
				.replace(`<!--app-html-->`, appHtml || "")
				.replace(`<!--page-title-->`, pageMeta?.title || "")
				.replace(`<!--ssr-error-->`, ssrError ? `<script type="ssr-error">${ssrError}</script>` : "")
				.replace(/<(script|style|link)/gm, `<$1 nonce=${nonce}`);


			reply
				.code(200)
				.cookie("csrfToken", csrfToken, {
					secure: true,
					httpOnly: true,
				})
				.cookie("traceId", traceId, {
					secure: true,
					httpOnly: true,
				})
				.headers(Object.assign({}, {
					"trace-id": traceId,
					"content-type": "text/html",
					"content-security-policy": [
						"script-src 'self' https: http: 'unsafe-inline' 'nonce-" + nonce + "' 'strict-dynamic'; ",
						"worker-src 'self';",
						"manifest-src 'self' 'nonce-" + nonce + "';",
						"media-src 'self' 'nonce-" + nonce + "';",
						"object-src 'none';",
						"frame-ancestors 'self';",
						"base-uri 'self' 'nonce-" + nonce + "';",
					].join(""),
					"x-frame-options": "SAMEORIGIN",
					"x-xss-protection": "1",
				}))
				.send(html);
		}
		catch (error) {
			// Show nice 500 error page
			reply.code(500).send(error.message);
		}

	});

	return {fastify, vite};
}

export default async function main () {
	const {fastify} = await createServer();
	fastify.listen(3000, "localhost", (error, address) => {

		if (error) {
			console.log("ERROR", error);
		}
		else {
			console.log("address", address);
		}
		// if (error) {
		// 	health.error = error;
		// 	logger.log({level: "info", message: `error: ${toJson(error)}`});
		// }
		// else {
		// 	health.webServerActive = true;
		// }
		// if (cluster.isMaster) {
		// 	logger.log({level: "info", message: `${pkg.name} - server listening on ${address}`});
		// }
		// else {
		// 	logger.log({level: "info", message: `${pkg.name} - subprocess(${process.pid}) of server(${process.ppid}) listening on ${address}`});
		// }
	});
}

// if (!isTest) {
// 	main();
// }

export {createServer};
