import App from "./App.vue";
import {createSSRApp} from "vue";
import {createAppRouter} from "./router";
// import process from "process";
// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
import PrimeVue from "primevue/config";
import {registerComponents} from "#app/vue-common/index.js";

export function createApp () {
	const app = createSSRApp(App);
	const router = createAppRouter();
	app.use(router);
	app.use(PrimeVue);

	registerComponents(app);

	return {app, router};
}
