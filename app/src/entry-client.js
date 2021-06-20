import {createApp} from "./main";

async function render () {
	const {app, router} = createApp();
	// wait until router is ready before mounting to ensure hydration match
	await router.isReady();
	app.mount("#app");
}

render();
