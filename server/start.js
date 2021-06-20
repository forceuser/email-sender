import path from "path";
import process from "process";
import os from "os";
import fs from "fs-extra";
import yargs from "yargs";
import winston from "winston";
import $yaml from "yaml";
import toJson from "json-stringify-safe";
import "isomorphic-unfetch";
import modifyCase from "#app/utils/modify-case.js";
import {packageDir, pkg} from "#server/package.js";
import logger from "#server/logger.js";
import startServer from "#server/main.js";

const health = {
	graylogActive: false,
	consulActive: false,
	webServerActive: false,
};

const envPrefix = `${pkg.name.replace("-", "_").toUpperCase()}_APP`;

async function init (nested = false) {
	if (!nested) {
		const transport = new winston.transports.Console({
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		});

		transport.__name$ = "console";
		logger.add(transport);

		logger.log({level: "http", message: `env prefix is: ${envPrefix}`});
	}


	const argv = await yargs(process.argv.slice(2))
		.parserConfiguration({"strip-aliased": true})
		.command([
			{
				command: "start [port] [host] [backendUrl]",
				aliases: ["s"],
				describe: "start node server",
				handler: async argv => {

					if (!nested && argv["consul-kv"]) {
						logger.log({level: "info", message: "loading consul config..."});
						try {
							const data = await getConsulKV(argv["consul-host"], argv["consul-port"], argv["consul-kv"], argv["consul-token"]);
							Object.entries(data).forEach(([key, value]) => {
								const k = envPrefix + "_" + modifyCase(key, {format: "const", breakByCase: true});
								process.env[k] = value;
							});
							health.consulActive = true;
							try {
								await init(true);
							}
							catch (error) {
								logger.log({level: "error", message: `error initializing web server: ${error.message}`});
								health.error = error;
							}
						}
						catch (error) {
							logger.log({level: "error", message: `error loading config from consul: ${error.message}`});
							health.consulActive = false;
							health.error = error;
						}
					}
					else {
						logger.log({level: "info", message: `app settings is: ${toJson(argv)}`});

						const transports = {
							console: logger.transports.find(t => t.__name$ === "console"),
							graylog: logger.transports.find(t => t.__name$ === "graylog"),
						};

						if (transports.graylog) {
							logger.log({level: "info", message: `graylog - log level is: ${argv["gl-level"]}`});
							transports.graylog.level = argv["gl-level"];
						}
						else {
							logger.log({level: "info", message: `graylog - cant find logger transport by name`});
						}

						if (transports.console) {
							logger.log({level: "info", message: `console - log level is: ${argv["log-level"]}`});
							transports.console.level = argv["log-level"];
						}

						logger.log({level: "info", message: "starting app..."});

						await startServer(argv);
					}
				},
				builder: yargs => {
					return yargs
						.env(envPrefix)
						.positional("http2", {
							describe: "use http2",
							type: "boolean",
							default: false,
						})
						.positional("https", {
							describe: "use https",
							type: "boolean",
							default: false,
						})
						.positional("secure-key", {
							describe: "ssl key for https",
							type: "string",
						})
						.positional("secure-cert", {
							describe: "ssl cert for https",
							type: "string",
						})
						.positional("secure-ca", {
							describe: "ssl ca for https",
							type: "string",
						})
						.positional("backend-url", {
							alias: ["b"],
							describe: "backend server origin url",
							type: "string",
						})
						.positional("trust-proxy", {
							alias: ["t"],
							describe: "use behind reverse proxy",
							type: "boolean",
							default: true,
						})
						.positional("port", {
							alias: ["p", "http-port"],
							describe: "server port",
							type: "number",
							default: 80,
						})
						.positional("https-port", {
							describe: "server port",
							type: "number",
							default: 443,
						})
						.positional("host", {
							alias: ["h"],
							describe: "server host or ip",
							type: "string",
							default: "0.0.0.0",
						})
						.positional("consul-host", {
							describe: "consul host",
							type: "string",
						})
						.positional("consul-port", {
							describe: "consul port",
							type: "number",
						})
						.positional("consul-token", {
							describe: "consul token",
							type: "string",
						})
						.positional("consul-kv", {
							describe: "consul kv key",
							type: "string",
						})
						.positional("gl-address", {
							describe: "graylog host",
							type: "string",
						})
						.positional("gl-port", {
							describe: "graylog port",
							type: "number",
							// default: undefined,
						})
						.positional("gl-start", {
							describe: "graylog enabled",
							type: "boolean",
						})
						.positional("gl-proto", {
							describe: "graylog protocol",
							type: "string",
							default: "udp",
						})
						.positional("gl-level", {
							describe: "graylog log level",
							type: "string",
							default: "info",
						})
						.positional("log-level", {
							describe: "log level",
							type: "string",
							default: "info",
						})
						.positional("letsencrypt-dir", {
							describe: "letsencrypt directory",
							type: "string",
						})
						.positional("multiprocess", {
							alias: ["multi"],
							describe: "use nodejs cluster",
							type: "number",
							default: 0,
						});
				},
			},
		])
		.help("help")
		.demandCommand()
		.showHelpOnFail(true)
		.argv;
}


init();
