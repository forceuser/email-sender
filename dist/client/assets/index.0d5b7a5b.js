import {o as openBlock, c as createBlock, a as createVNode, w as withCtx, b as createTextVNode, r as resolveComponent, S as Suspense, d as resolveDynamicComponent, e as createRouter, f as createWebHistory, g as ref, h as onMounted, i as createSSRApp, P as PrimeVue} from "./vendor.30138b3b.js";
var App_vue_vue_type_style_index_0_lang = "";
var App_vue_vue_type_style_index_1_lang = "";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_2 = /* @__PURE__ */ createTextVNode("| ");
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" About ");
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" loading... ");
function _sfc_render(_ctx, _cache) {
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock("div", null, [
    createVNode(_component_router_link, {to: "/"}, {
      default: withCtx(() => [
        _hoisted_1
      ]),
      _: 1
    }),
    _hoisted_2,
    createVNode(_component_router_link, {to: "/about"}, {
      default: withCtx(() => [
        _hoisted_3
      ]),
      _: 1
    }),
    createVNode(_component_router_view, null, {
      default: withCtx(({Component}) => [
        (openBlock(), createBlock(Suspense, null, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(Component)))
          ]),
          fallback: withCtx(() => [
            _hoisted_4
          ]),
          _: 2
        }, 1024))
      ]),
      _: 1
    })
  ]);
}
_sfc_main.render = _sfc_render;
let scriptRel;
const seen = {};
const __vitePreload = function preload(baseModule, deps) {
  if (!deps) {
    return baseModule();
  }
  if (scriptRel === void 0) {
    const relList = document.createElement("link").relList;
    scriptRel = relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  }
  return Promise.all(deps.map((dep) => {
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const pages = {"./pages/About.vue": () => true ? __vitePreload(() => import("./About.20f7b640.js"), ["/assets/About.20f7b640.js","/assets/About.d48fb2e0.css","/assets/vendor.30138b3b.js"]) : null, "./pages/Home.vue": () => true ? __vitePreload(() => import("./Home.36c76d3d.js"), ["/assets/Home.36c76d3d.js","/assets/Home.71d7980c.css","/assets/vendor.30138b3b.js"]) : null};
console.log("pages", pages);
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name === "/home" ? "/" : name,
    component: pages[path]
  };
});
function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes
  });
}
var ClientOnly = {
  setup(props, {slots}) {
    const mounted = ref(false);
    onMounted(() => {
      mounted.value = true;
    });
    return () => mounted.value ? [slots.default()] : [];
  }
};
function registerComponents(app) {
  app.component("ClientOnly", ClientOnly);
}
function createApp() {
  const app = createSSRApp(_sfc_main);
  const router = createAppRouter();
  app.use(router);
  app.use(PrimeVue);
  registerComponents(app);
  return {app, router};
}
async function render() {
  const {app, router} = createApp();
  await router.isReady();
  app.mount("#app");
}
render();
export {__vitePreload as _};
