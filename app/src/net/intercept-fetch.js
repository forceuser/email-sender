function serialize (request) {
	const result = {};
	let proto = request;
	while (proto != null) {
		Object
			.getOwnPropertyNames(proto)
			.forEach(key => {
				try {
					const value = request[key];
					if (!(key in result)) {
						if (typeof value === "object" && typeof value.entries === "function") {
							result[key] = Object.fromEntries(value.entries());
						}
						else if (typeof value !== "function") {
							result[key] = value;
						}
					}
				}
				catch {
					// can't read this value probably due restrictions
				}
			});
		proto = Object.getPrototypeOf(proto);
	}
	return result;
}

const interceptFetch = {
	serialize,
	fetch: globalThis.fetch,
	before: [],
	after: [],
	error: [],
};

export default interceptFetch;

let requestId = 0;

globalThis.fetch = async function (...args) {
	let url;
	let request;
	let originalRequest;
	if (args[0] instanceof Request) {
		originalRequest = args[0];
		request = serialize(args[0]);
		url = request.url;
	}
	else {
		originalRequest = args[1];
		request = args[1] ? serialize(args[1]) : {};
		url = args[0];
		request.url = url;
	}

	const ctrl = {
		id: ++requestId,
		url,
		request,
		data: {},
		original: {
			url,
			originalRequest,
		},
		current: null,
		exit (value) {
			this.exited = true;
			this.exitValue = value;
		},
		skip (name) {
			this.skipTo = name || true;
		},
		async invokeNext () {

			if (this.skipTo === true) {
				return;
			}
			else if (typeof this.skipTo === "string") {
				this.current = this.chain.find(item => typeof item === "object" && item.name === this.skipTo);
				this.skipTo = null;
				if (!this.current) {
					return;
				}
			}
			else if (this.current == null) {
				this.current = this.chain[0];
			}
			else {
				this.current = this.chain[this.chain.indexOf(this.current) + 1];
			}
			if (this.current) {
				if (typeof this.current === "object") {
					await this.current.callback(this);
				}
				else {
					await this.current(this);
				}
				await this.invokeNext();
			}
		},
		async init (chain) {
			this.chain = chain;
			this.skipTo = null;
			this.current = null;
			this.exited = false;
			this.exitValue = null;
			return await this.invokeNext();
		},
	};
	try {
		await ctrl.init(interceptFetch.before);

		if (ctrl.exited) {
			return ctrl.exitValue;
		}

		ctrl.response = await interceptFetch.fetch.call(globalThis, ctrl.url, ctrl.request);
		ctrl.original.response = ctrl.response;

		await ctrl.init(interceptFetch.after);

		if (ctrl.exited) {
			return ctrl.exitValue;
		}
		return ctrl.response;
	}
	catch (error) {
		ctrl.error = error;
		await ctrl.init(interceptFetch.error);

		if (ctrl.exited) {
			return ctrl.exitValue;
		}

		if (ctrl.error) {
			throw ctrl.error;
		}
	}
};



