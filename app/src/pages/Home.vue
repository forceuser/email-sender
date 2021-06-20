<template>
	<h1>Home</h1>
	<p>
		<img
			src="../assets/logo.png"
			alt="logo"
		/>
	</p>
	<p>
		ssr api call: {{ x }}
	</p>
	<button @click="state.count++">
		count is: {{ state.count }}
	</button>
	<Foo />
	<p class="virtual">
		msg from virtual module: {{ foo.msg }}
	</p>
	<Button
		label="example api call"
		@click="update()"
	/>
	<FileUpload
		mode="basic"
		name="demo[]"
		url="./upload"
	/>
	<div
		x-v-if="process.browser"
		class="p-fluid p-grid p-formgrid"
	>
		<div class="p-field p-col-12 p-md-4">
			<label for="dateformat">DateFormat</label>
			abc1
			<ClientOnly>
				<Calendar
					id="dateformat"
					v-model="state.date"
					date-format="mm-dd-yy"
				/>
			</ClientOnly>
			def
		</div>
	</div>
	<div style="color: red;">
		state.date: {{ state.date }}
	</div>

	<ImportType />
</template>

<script setup>
import foo from "@foo";
import {reactive, defineAsyncComponent, ref, inject} from "vue";
import FileUpload from "primevue/fileupload";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import process from "process";
import {exampleApi, testApi} from "#app/api/index.js";
import {usePageMeta} from "#app/store/page-meta.js";

const pageMeta = usePageMeta();
const ImportType = load("ImportType");
const Foo = defineAsyncComponent(() =>
	import("../components/Foo").then(mod => mod.Foo)
);

function load (file) {
	return defineAsyncComponent(() => import(`../components/${file}.vue`));
}


const state = reactive({
	date: new Date(2020, 5, 2, 0, 0, 0, 0),
	count: 2,
});

console.log("SETUP HOME");

const x = ref(await exampleApi(1, 3));
async function update () {

	state.count++;
	console.log("pageMeta", pageMeta);
	pageMeta.title = "HEHE" + state.count;
	console.log("exampleApi.handler", exampleApi.handler);
	x.value = await testApi(state.count, "param2");
}



</script>

<style scoped lang="less">
h1,
a {
	color: green;
}
</style>
