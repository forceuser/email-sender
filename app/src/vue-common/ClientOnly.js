import {ref, onMounted} from "vue";

export default {
	setup (props, {slots}) {
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});
		return () => mounted.value ? [slots.default()] : [];
	},
};
