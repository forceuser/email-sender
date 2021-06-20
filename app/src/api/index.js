
import {registerApi} from "#app/api-manager.js";


export let exampleApi = registerApi("example-api",
	import.meta.env.SSR &&
	(async (...params) => {
		console.log("exampleApi - params", params);
		return {
			data: {example: ":)123468", params},
		};
	})
);

export let testApi = registerApi("test-api",
	import.meta.env.SSR &&
	(async (...params) => {
		console.log("test api - params", params);
		return {
			data: {test: "heh1", params},
		};
	})
);

if (import.meta.hot) {
	import.meta.hot.accept((newModule) => {
		exampleApi = newModule.exampleApi;
		testApi = newModule.testApi;
	});
}
