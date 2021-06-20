import {reactive, computed, inject, readonly, toRaw} from "vue";
// import EventEmitter from "eventemitter2";

const pageMetaKey = Symbol("pageMetaKey");

const createState = () => {
	const $state = reactive({
		title: "Vue 111",
	});

	const ctrl = {
		// events,
		get title () {
			return $state.title;
		},
		set title (value) {
			$state.title = value;
		},
		$state: readonly($state),
	};

	return ctrl;
};

export default {
	install (app) {
		const state = createState();
		app.config.globalProperties.$pageMeta = state;
		app.provide(pageMetaKey, state);
	},
};

export function usePageMeta () {
	return inject(pageMetaKey);
}
