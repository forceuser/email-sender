import {reactive, computed, inject, provide, readonly, toRaw} from "vue";
// import EventEmitter from "eventemitter2";

const symbol = Symbol();

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
		this.state = createState();
		app.config.globalProperties.$pageMeta = this.state;
	},
};

// export default {
// 	symbol,
// 	createState,
// 	use: () => inject(symbol),
// 	provide: (app) => {
// 		const state = createState();
// 		(app ? app.provide : provide)(symbol, state);
// 		return state;
// 	},
// };
