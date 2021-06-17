import process from "process";
import nodePath from "path";
import express from "express";
import {readFile} from "fs/promises";
import {fileURLToPath} from "url";
import compression from "compression";
import serveStatic from "serve-static";
import findPackageRoot from "find-package-json";


const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const packageDir = nodePath.dirname(findPackageRoot(__dirname).next().filename);
const cwd = process.cwd();
const distClientDir = nodePath.join(packageDir, "dist/client");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer (root = packageDir, isProd = process.env.NODE_ENV === "production") {

	const indexProd = isProd
		? await readFile(nodePath.join(distClientDir, "index.html"), "utf-8")
		: "";
	const manifest = isProd
		? JSON.parse(await readFile(nodePath.join(distClientDir, "ssr-manifest.json"), "utf-8"))
		: {};

	console.log("IS PROD1", isProd);

	const app = express();

	/**
     * @type {import('vite').ViteDevServer}
     */
	let vite;
	if (!isProd) {
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
		app.use(vite.middlewares);
	}
	else {
		app.use(compression());
		app.use(serveStatic(distClientDir, {
			index: false,
		}));
	}
	app.use("*", async (req, res) => {
		try {
			const url = req.originalUrl;
			console.log("URL", url);

			let template; let render;
			if (!isProd) {
				// always read fresh template in dev
				template = await readFile(nodePath.join(packageDir, "index.html"), "utf-8");
				template = await vite.transformIndexHtml(url, template);
				render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
			}
			else {
				template = indexProd;
				render = (await import("./dist/server/entry-server.js")).render;
			}
			const [appHtml, preloadLinks] = await render(url, manifest);
			const html = template
				.replace(`<!--preload-links-->`, preloadLinks)
				.replace(`<!--app-html-->`, appHtml);
			res.status(200).set({"Content-Type": "text/html"}).end(html);
		}
		catch (e) {
			vite && vite.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	});
	return {app, vite};
}

if (!isTest) {
	createServer().then(({app}) => app.listen(3000, () => {
		console.log("http://localhost:3000");
	}));
}
export {createServer};
