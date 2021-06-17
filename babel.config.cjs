const process = require("process");

console.log("BABEL VUE_APP_MODE", process.env.VUE_APP_MODE);
console.log("BABEL NODE_ENV", process.env.NODE_ENV);
console.log("BABEL VUE_APP_CONSOLE", process.env.VUE_APP_CONSOLE);
console.log("BABEL VUE_APP_API_ENV", process.env.VUE_APP_API_ENV);

function pluginsIf (plugins, condition) {
	if (typeof plugins === "function") {
		plugins = plugins();
	}
	if (condition) {
		return plugins;
	}
	return [];
}

module.exports = {
	presets: [
		"@vue/cli-plugin-babel/preset",
	],
	plugins: [
		"@babel/plugin-proposal-unicode-property-regex",
		"@babel/plugin-syntax-top-level-await",
		"@babel/plugin-syntax-typescript",
		// ...
		// ...pluginsIf(["transform-remove-console"], process.env.VUE_APP_CONSOLE === "false"),
	],
	"env": {
		"production": {
		},
	},
};
