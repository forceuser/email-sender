import {
	createMemoryHistory,
	createRouter,
	createWebHistory
} from "vue-router";

import {usePageMeta} from "#app/store/page-meta.js";
// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*.vue");

// console.log("pages", pages);

// TODO: add nice 404 and 500 error page
const routes = [
	{
		path: "/",
		meta: {
			title: "Home | Vite + Vue 3 SSR",
		},
		component: () => import("#app/pages/Home.vue"),
	},
	{
		path: "/about",
		meta: {
			title: "About | Vite + Vue 3 SSR",
		},
		component: () => import("#app/pages/About.vue"),
	},
];


export function createAppRouter (app) {
	// console.log("app", app);

	const router = createRouter({
		// use appropriate history implementation for server/client
		// import.meta.env.SSR is injected by Vite.
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
		routes,
	});

	router.beforeResolve(async (to, from) => {
		app.config.globalProperties.$pageMeta.title = to?.meta?.title ?? "";
	});

	return router;
}
