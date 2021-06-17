
import manager from "#app/api/manager.js";

export const exampleApi = manager.create("example-api", async (...params) => {
	console.log("exampleApi - params", params);
	return {
		data: {example: ":)", params},
	};
});
