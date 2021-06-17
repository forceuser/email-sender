import fs from "fs";
import nodePath from "path";
import manifest from "./dist/static/ssr-manifest.json";
import entryServer from "./dist/server/entry-server.js";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);

const toAbsolute = (p) => nodePath.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const {render} = entryServer;
// determine routes to pre-render from src/pages
const routesToPrerender = fs
	.readdirSync(toAbsolute("src/pages"))
	.map((file) => {
		const name = file.replace(/\.vue$/, "").toLowerCase();
		return name === "home" ? `/` : `/${name}`;
	});
(async () => {
	// pre-render each route...
	for (const url of routesToPrerender) {
		const [appHtml, preloadLinks] = await render(url, manifest);
		const html = template
			.replace(`<!--preload-links-->`, preloadLinks)
			.replace(`<!--app-html-->`, appHtml);
		const filePath = `dist/static${url === "/" ? "/index" : url}.html`;
		fs.writeFileSync(toAbsolute(filePath), html);
		console.log("pre-rendered:", filePath);
	}
	// done, delete ssr manifest
	fs.unlinkSync(toAbsolute("dist/static/ssr-manifest.json"));
})();
