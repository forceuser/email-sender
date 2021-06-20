import toJson from "json-stringify-safe";

export const apis = new Map();

/** TODO: support js object serialization of Date,Map,Set,File,Blob... */
export function registerApi (name, handler) {
	const apiCall = async (...params) => {
		console.log("API CALL", params, name);
		if (import.meta.env.SSR) {
			return handler(...params);
		}
		else {
			return fetch(`/api-call/${name}`, {
				method: "POST",
				headers: {
					"accept": "application/json",
					"content-type": "application/json",
				},
				body: toJson({
					params,
				}),
			})
				.then(response => {
					return response.json();
				});
		}
	};
	// apiCall.handler = handler;
	apis.set(name, {handler, apiCall});
	return apiCall;
}
