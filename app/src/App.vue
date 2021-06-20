<template>
	<div>
		<router-link to="/">
			Home
		</router-link>|
		<router-link to="/about">
			About
		</router-link>
		<router-view v-slot="{ Component }">
			<Suspense>
				<template #default>
					<component :is="Component" />
				</template>
				<template #fallback>
					loading...
				</template>
			</Suspense>
		</router-view>
	</div>
	<teleport to="title">
		{{ $pageMeta.title }}
	</teleport>
</template>


<script setup>
import {ref, watchEffect} from "vue";
import {useRoute, onBeforeRouteUpdate} from "vue-router";
import {usePageMeta} from "#app/store/page-meta.js";


const pageMeta = usePageMeta();
const route = useRoute();
// onBeforeRouteUpdate(async (to, from) => {
// 	pageMeta.state.title = to?.meta?.title ?? "";
// });

// watchEffect(() => {
// 	pageMeta.state.title = route?.meta?.title ?? "";
// 	console.log("pageMeta.state.title", pageMeta.state.title);
// });

// console.log("route", route);
</script>

<style>
@import "primevue/resources/primevue.min.css";
@import "primevue/resources/themes/saga-blue/theme.css";
@import "primeicons/primeicons.css";
</style>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
