import {r as reactive, a as readonly, i as inject, u as useRoute, b as resolveComponent, c as createBlock, d as createVNode, w as withCtx, T as Teleport, e as createTextVNode, t as toDisplayString, F as Fragment, o as openBlock, S as Suspense, f as resolveDynamicComponent, g as createRouter, h as createWebHistory, j as ref, k as onMounted, l as createSSRApp, P as PrimeVue} from "./vendor.8999bd4d.js";
const pageMetaKey = Symbol("pageMetaKey");
const createState = () => {
  const $state = reactive({
    title: "Vue 111"
  });
  const ctrl = {
    get title() {
      return $state.title;
    },
    set title(value) {
      $state.title = value;
    },
    $state: readonly($state)
  };
  return ctrl;
};
var pageMeta = {
  install(app) {
    const state = createState();
    app.config.globalProperties.$pageMeta = state;
    app.provide(pageMetaKey, state);
  }
};
function usePageMeta() {
  return inject(pageMetaKey);
}
var App_vue_vue_type_style_index_0_lang = "";
var App_vue_vue_type_style_index_1_lang = "";
const _hoisted_1 = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_2 = /* @__PURE__ */ createTextVNode("| ");
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" About ");
const _hoisted_4 = /* @__PURE__ */ createTextVNode(" loading... ");
const _sfc_main = {
  expose: [],
  setup(__props) {
    usePageMeta();
    useRoute();
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(Fragment, null, [
        createVNode("div", null, [
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
        ]),
        (openBlock(), createBlock(Teleport, {to: "title"}, [
          createTextVNode(toDisplayString(_ctx.$pageMeta.title), 1)
        ]))
      ], 64);
    };
  }
};
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
const routes = [
  {
    path: "/",
    meta: {
      title: "Home | Vite + Vue 3 SSR"
    },
    component: () => __vitePreload(() => import("./Home.ee7d50e9.js"), true ? ["/assets/Home.ee7d50e9.js","/assets/Home.cf6ad512.css","/assets/vendor.8999bd4d.js"] : void 0)
  },
  {
    path: "/about",
    meta: {
      title: "About | Vite + Vue 3 SSR"
    },
    component: () => __vitePreload(() => import("./About.95d14b08.js"), true ? ["/assets/About.95d14b08.js","/assets/About.532bec02.css","/assets/vendor.8999bd4d.js"] : void 0)
  }
];
function createAppRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  router.beforeResolve(async (to, from) => {
    var _a, _b;
    app.config.globalProperties.$pageMeta.title = (_b = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.title) != null ? _b : "";
  });
  return router;
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
  const router = createAppRouter(app);
  app.use(router);
  app.use(PrimeVue);
  app.use(pageMeta);
  registerComponents(app);
  if (typeof window === "object") {
    window.app = app;
  }
  return {app, router};
}
async function render() {
  const {app, router} = createApp();
  await router.isReady();
  app.mount("#app");
}
render();
export {__vitePreload as _, usePageMeta as u};
