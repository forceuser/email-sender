import vite from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import nodePath from "path";
import {fileURLToPath} from "url";
import findPackageRoot from "find-package-json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const packageDir = nodePath.dirname(findPackageRoot(__dirname).next().filename);

const {defineConfig} = vite;

export default defineConfig({
	plugins: [
		vuePlugin(),
		vueJsx(),
		{
			name: "virtual",
			resolveId (id) {
				if (id === "@foo") {
					return id;
				}
			},
			load (id) {
				if (id === "@foo") {
					return `export default { msg: 'hi' }`;
				}
			},
		},
	],
	resolve: {
		alias: {
			"#app/": `${nodePath.resolve(packageDir, "src")}/`,
		},
	},
	build: {
		minify: false,
	},
	publicDir: false,
});
