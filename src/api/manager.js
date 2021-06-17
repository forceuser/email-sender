import toJson from "json-stringify-safe";

const manager = {
	apis: new Map(),
	async register (fastify, opts) {
		if (import.meta.env.SSR) {
			this.fastify = fastify;
			fastify.route({
				method: "POST",
				url: "call/:name",
				handler: async (request, reply) => {
					const api = this.apis.get(request.params.name);
					if (api) {
						reply.send(await api.handler(...(request.body?.params ?? [])));
					}
					else {
						reply.code(404).send({errText: "no such api"});
					}
				},
			});
		}
		else {
			console.log("server api manager cannot register on client side");
		}
		// this.apis =
	},
	create (name, handler) {
		const apiCall = async (...params) => {
			console.log("API CALL", params, name);
			if (import.meta.env.SSR) {
				return handler(...params);
			}
			else {
				return fetch(`api/call/${name}`, {
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
		this.apis.set(name, {handler, apiCall});
		return apiCall;
	},
};

export default manager;
