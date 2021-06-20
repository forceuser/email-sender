import {apis} from "#app/api-manager.js";
// import "#app/api/index.js";

export async function getApis () {
	await Promise.all(Object.values(import.meta.glob("./api/**/*.js")).map($ => $()));
	return apis;
}
