"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var serverRenderer = require("@vue/server-renderer");
var vueRouter = require("vue-router");
require("process");
require("json-stringify-safe");
const pageMetaKey = Symbol("pageMetaKey");
const createState = () => {
  const $state = vue.reactive({
    title: "Vue 111"
  });
  const ctrl = {
    get title() {
      return $state.title;
    },
    set title(value) {
      $state.title = value;
    },
    $state: vue.readonly($state)
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
  return vue.inject(pageMetaKey);
}
var App_vue_vue_type_style_index_0_lang = "";
var App_vue_vue_type_style_index_1_lang = "";
const _sfc_main$3 = {
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    usePageMeta();
    vueRouter.useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_router_view = vue.resolveComponent("router-view");
      _push(`<!--[--><div>`);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/"}, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              vue.createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`| `);
      _push(serverRenderer.ssrRenderComponent(_component_router_link, {to: "/about"}, {
        default: vue.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` About `);
          } else {
            return [
              vue.createTextVNode(" About ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.ssrRenderComponent(_component_router_view, null, {
        default: vue.withCtx(({Component}, _push2, _parent2, _scopeId) => {
          if (_push2) {
            serverRenderer.ssrRenderSuspense(_push2, {
              default: () => {
                serverRenderer.ssrRenderVNode(_push2, vue.createVNode(vue.resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
              },
              fallback: () => {
                _push2(` loading... `);
              },
              _: 2
            });
          } else {
            return [
              (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
                ]),
                fallback: vue.withCtx(() => [
                  vue.createTextVNode(" loading... ")
                ]),
                _: 2
              }, 1024))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      serverRenderer.ssrRenderTeleport(_push, (_push2) => {
        _push2(`${serverRenderer.ssrInterpolate(_ctx.$pageMeta.title)}`);
      }, "title", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/home/forceuser/Projects/email-sender/app/src/App.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const routes = [
  {
    path: "/",
    meta: {
      title: "Home | Vite + Vue 3 SSR"
    },
    component: () => Promise.resolve().then(function() {
      return Home;
    })
  },
  {
    path: "/about",
    meta: {
      title: "About | Vite + Vue 3 SSR"
    },
    component: () => Promise.resolve().then(function() {
      return About;
    })
  }
];
function createAppRouter(app) {
  const router = vueRouter.createRouter({
    history: vueRouter.createMemoryHistory(),
    routes
  });
  router.beforeResolve(async (to, from) => {
    var _a, _b;
    app.config.globalProperties.$pageMeta.title = (_b = (_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.title) != null ? _b : "";
  });
  return router;
}
class DomHandler {
  static innerWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);
    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }
  static width(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);
    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }
  static getWindowScrollTop() {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }
  static getWindowScrollLeft() {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }
  static getOuterWidth(el, margin) {
    if (el) {
      let width = el.offsetWidth;
      if (margin) {
        let style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width;
    } else {
      return 0;
    }
  }
  static getOuterHeight(el, margin) {
    if (el) {
      let height = el.offsetHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    } else {
      return 0;
    }
  }
  static getClientHeight(el, margin) {
    if (el) {
      let height = el.clientHeight;
      if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    } else {
      return 0;
    }
  }
  static getViewport() {
    let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
    return {width: w, height: h};
  }
  static getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
    };
  }
  static index(element) {
    let children = element.parentNode.childNodes;
    let num = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i] === element)
        return num;
      if (children[i].nodeType === 1)
        num++;
    }
    return -1;
  }
  static addMultipleClasses(element, className) {
    if (element.classList) {
      let styles = className.split(" ");
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i]);
      }
    } else {
      let styles = className.split(" ");
      for (let i = 0; i < styles.length; i++) {
        element.className += " " + styles[i];
      }
    }
  }
  static addClass(element, className) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += " " + className;
  }
  static removeClass(element, className) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  }
  static hasClass(element, className) {
    if (element) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  }
  static find(element, selector) {
    return element.querySelectorAll(selector);
  }
  static findSingle(element, selector) {
    return element.querySelector(selector);
  }
  static getHeight(el) {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);
    height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    return height;
  }
  static getWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);
    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    return width;
  }
  static absolutePosition(element, target) {
    let elementDimensions = element.offsetParent ? {width: element.offsetWidth, height: element.offsetHeight} : this.getHiddenElementDimensions(element);
    let elementOuterHeight = elementDimensions.height;
    let elementOuterWidth = elementDimensions.width;
    let targetOuterHeight = target.offsetHeight;
    let targetOuterWidth = target.offsetWidth;
    let targetOffset = target.getBoundingClientRect();
    let windowScrollTop = this.getWindowScrollTop();
    let windowScrollLeft = this.getWindowScrollLeft();
    let viewport = this.getViewport();
    let top, left;
    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      element.style.transformOrigin = "bottom";
      if (top < 0) {
        top = windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
      element.style.transformOrigin = "top";
    }
    if (targetOffset.left + elementOuterWidth > viewport.width)
      left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
    else
      left = targetOffset.left + windowScrollLeft;
    element.style.top = top + "px";
    element.style.left = left + "px";
  }
  static relativePosition(element, target) {
    let elementDimensions = element.offsetParent ? {width: element.offsetWidth, height: element.offsetHeight} : this.getHiddenElementDimensions(element);
    const targetHeight = target.offsetHeight;
    const targetOffset = target.getBoundingClientRect();
    const viewport = this.getViewport();
    let top, left;
    if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
      top = -1 * elementDimensions.height;
      element.style.transformOrigin = "bottom";
      if (targetOffset.top + top < 0) {
        top = -1 * targetOffset.top;
      }
    } else {
      top = targetHeight;
      element.style.transformOrigin = "top";
    }
    if (elementDimensions.width > viewport.width) {
      left = targetOffset.left * -1;
    } else if (targetOffset.left + elementDimensions.width > viewport.width) {
      left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
    } else {
      left = 0;
    }
    element.style.top = top + "px";
    element.style.left = left + "px";
  }
  static getParents(element, parents = []) {
    return element["parentNode"] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
  }
  static getScrollableParents(element) {
    let scrollableParents = [];
    if (element) {
      let parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node) => {
        let styleDeclaration = window["getComputedStyle"](node, null);
        return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
      };
      for (let parent of parents) {
        let scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
        if (scrollSelectors) {
          let selectors = scrollSelectors.split(",");
          for (let selector of selectors) {
            let el = this.findSingle(parent, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          }
        }
        if (parent.nodeType !== 9 && overflowCheck(parent)) {
          scrollableParents.push(parent);
        }
      }
    }
    return scrollableParents;
  }
  static getHiddenElementOuterHeight(element) {
    element.style.visibility = "hidden";
    element.style.display = "block";
    let elementHeight = element.offsetHeight;
    element.style.display = "none";
    element.style.visibility = "visible";
    return elementHeight;
  }
  static getHiddenElementOuterWidth(element) {
    element.style.visibility = "hidden";
    element.style.display = "block";
    let elementWidth = element.offsetWidth;
    element.style.display = "none";
    element.style.visibility = "visible";
    return elementWidth;
  }
  static getHiddenElementDimensions(element) {
    var dimensions = {};
    element.style.visibility = "hidden";
    element.style.display = "block";
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = "none";
    element.style.visibility = "visible";
    return dimensions;
  }
  static fadeIn(element, duration) {
    element.style.opacity = 0;
    var last = +new Date();
    var opacity = 0;
    var tick = function() {
      opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();
      if (+opacity < 1) {
        window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
      }
    };
    tick();
  }
  static fadeOut(element, ms) {
    var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
    let fading = setInterval(() => {
      opacity -= gap;
      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fading);
      }
      element.style.opacity = opacity;
    }, interval);
  }
  static getUserAgent() {
    return navigator.userAgent;
  }
  static appendChild(element, target) {
    if (this.isElement(target))
      target.appendChild(element);
    else if (target.el && target.elElement)
      target.elElement.appendChild(element);
    else
      throw new Error("Cannot append " + target + " to " + element);
  }
  static scrollInView(container, item) {
    let borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  }
  static clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document["selection"] && document["selection"].empty) {
      try {
        document["selection"].empty();
      } catch (error) {
      }
    }
  }
  static calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth;
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "p-scrollbar-measure";
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  }
  static getBrowser() {
    if (!this.browser) {
      let matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  }
  static resolveUserAgent() {
    let ua = navigator.userAgent.toLowerCase();
    let match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  }
  static isVisible(element) {
    return element.offsetParent != null;
  }
  static invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  }
  static getFocusableElements(element) {
    let focusableElements = DomHandler.find(element, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`);
    let visibleFocusableElements = [];
    for (let focusableElement of focusableElements) {
      if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
        visibleFocusableElements.push(focusableElement);
    }
    return visibleFocusableElements;
  }
  static isClickable(element) {
    const targetNode = element.nodeName;
    const parentNode = element.parentElement && element.parentElement.nodeName;
    return targetNode == "INPUT" || targetNode == "BUTTON" || targetNode == "A" || parentNode == "INPUT" || parentNode == "BUTTON" || parentNode == "A" || this.hasClass(element, "p-button") || this.hasClass(element.parentElement, "p-button") || this.hasClass(element.parentElement, "p-checkbox") || this.hasClass(element.parentElement, "p-radiobutton");
  }
  static applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = this.style;
    } else {
      for (let prop in this.style) {
        element.style[prop] = style[prop];
      }
    }
  }
  static isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
  }
  static isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  }
}
class ConnectedOverlayScrollHandler {
  constructor(element, listener = () => {
  }) {
    this.element = element;
    this.listener = listener;
  }
  bindScrollListener() {
    this.scrollableParents = DomHandler.getScrollableParents(this.element);
    for (let i = 0; i < this.scrollableParents.length; i++) {
      this.scrollableParents[i].addEventListener("scroll", this.listener);
    }
  }
  unbindScrollListener() {
    if (this.scrollableParents) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].removeEventListener("scroll", this.listener);
      }
    }
  }
  destroy() {
    this.unbindScrollListener();
    this.element = null;
    this.listener = null;
    this.scrollableParents = null;
  }
}
function handler() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : {key, value: baseZIndex};
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({key, value: newZIndex});
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex()
  };
}
var ZIndexUtils = handler();
function primebus() {
  const allHandlers = new Map();
  return {
    on(type, handler2) {
      let handlers = allHandlers.get(type);
      if (!handlers)
        handlers = [handler2];
      else
        handlers.push(handler2);
      allHandlers.set(type, handlers);
    },
    off(type, handler2) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler2) >>> 0, 1);
      }
    },
    emit(type, evt) {
      let handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map((handler2) => {
          handler2(evt);
        });
      }
    }
  };
}
const FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
const defaultOptions = {
  ripple: false,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    emptyMessage: "No available options"
  },
  filterMatchModeOptions: {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS
    ],
    numeric: [
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
    ],
    date: [
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER
    ]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  }
};
const PrimeVueSymbol = Symbol();
var PrimeVue = {
  install: (app, options) => {
    let configOptions = options ? __spreadValues(__spreadValues({}, defaultOptions), options) : __spreadValues({}, defaultOptions);
    const PrimeVue2 = {
      config: vue.reactive(configOptions)
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
var ClientOnly = {
  setup(props, {slots}) {
    const mounted = vue.ref(false);
    vue.onMounted(() => {
      mounted.value = true;
    });
    return () => mounted.value ? [slots.default()] : [];
  }
};
function registerComponents(app) {
  app.component("ClientOnly", ClientOnly);
}
function createApp() {
  const app = vue.createSSRApp(_sfc_main$3);
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
const apis = new Map();
function registerApi(name, handler2) {
  const apiCall = async (...params) => {
    console.log("API CALL", params, name);
    {
      return handler2(...params);
    }
  };
  apis.set(name, {handler: handler2, apiCall});
  return apiCall;
}
async function getApis() {
  await Promise.all(Object.values({"./api/index.js": () => Promise.resolve().then(function() {
    return index;
  })}).map(($) => $()));
  return apis;
}
async function render$6(url, manifest) {
  const {app, router} = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const appHtml = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return {
    appHtml,
    preloadLinks,
    pageMeta: app.config.globalProperties.$pageMeta
  };
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
var About_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  async setup() {
    return {
      msg: "About"
    };
  }
};
const _withId$1 = /* @__PURE__ */ vue.withScopeId("data-v-6dd74d70");
const _sfc_ssrRender = /* @__PURE__ */ _withId$1((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  _push(`<h1${serverRenderer.ssrRenderAttrs(_attrs)} data-v-6dd74d70>${serverRenderer.ssrInterpolate($setup.msg)}</h1>`);
});
_sfc_main$2.ssrRender = _sfc_ssrRender;
_sfc_main$2.__scopeId = "data-v-6dd74d70";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/home/forceuser/Projects/email-sender/app/src/pages/About.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var About = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$2
});
var _imports_0 = "/assets/logo.03d6d6da.png";
var foo$1 = {msg: "hi"};
function bindEvents(el) {
  el.addEventListener("mousedown", onMouseDown);
}
function unbindEvents(el) {
  el.removeEventListener("mousedown", onMouseDown);
}
function create(el) {
  let ink = document.createElement("span");
  ink.className = "p-ink";
  el.appendChild(ink);
  ink.addEventListener("animationend", onAnimationEnd);
}
function remove(el) {
  let ink = getInk(el);
  if (ink) {
    unbindEvents(el);
    ink.removeEventListener("animationend", onAnimationEnd);
    ink.remove();
  }
}
function onMouseDown(event2) {
  let target = event2.currentTarget;
  let ink = getInk(target);
  if (!ink || getComputedStyle(ink, null).display === "none") {
    return;
  }
  DomHandler.removeClass(ink, "p-ink-active");
  if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
    let d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
    ink.style.height = d + "px";
    ink.style.width = d + "px";
  }
  let offset = DomHandler.getOffset(target);
  let x = event2.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
  let y = event2.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
  ink.style.top = y + "px";
  ink.style.left = x + "px";
  DomHandler.addClass(ink, "p-ink-active");
}
function onAnimationEnd(event2) {
  DomHandler.removeClass(event2.currentTarget, "p-ink-active");
}
function getInk(el) {
  for (let i = 0; i < el.children.length; i++) {
    if (typeof el.children[i].className === "string" && el.children[i].className.indexOf("p-ink") !== -1) {
      return el.children[i];
    }
  }
  return null;
}
const Ripple = {
  mounted(el, binding) {
    if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
      create(el);
      bindEvents(el);
    }
  },
  unmounted(el) {
    remove(el);
  }
};
var script$5 = {
  name: "Button",
  props: {
    label: {
      type: String
    },
    icon: {
      type: String
    },
    iconPos: {
      type: String,
      default: "left"
    },
    badge: {
      type: String
    },
    badgeClass: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: "pi pi-spinner pi-spin"
    }
  },
  computed: {
    buttonClass() {
      return {
        "p-button p-component": true,
        "p-button-icon-only": this.icon && !this.label,
        "p-button-vertical": (this.iconPos === "top" || this.iconPos === "bottom") && this.label,
        "p-disabled": this.$attrs.disabled || this.loading,
        "p-button-loading": this.loading,
        "p-button-loading-label-only": this.loading && !this.icon && this.label
      };
    },
    iconClass() {
      return [
        this.loading ? "p-button-loading-icon " + this.loadingIcon : this.icon,
        "p-button-icon",
        {
          "p-button-icon-left": this.iconPos === "left" && this.label,
          "p-button-icon-right": this.iconPos === "right" && this.label,
          "p-button-icon-top": this.iconPos === "top" && this.label,
          "p-button-icon-bottom": this.iconPos === "bottom" && this.label
        }
      ];
    },
    badgeStyleClass() {
      return [
        "p-badge p-component",
        this.badgeClass,
        {
          "p-badge-no-gutter": this.badge && String(this.badge).length === 1
        }
      ];
    },
    disabled() {
      return this.$attrs.disabled || this.loading;
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$4 = {class: "p-button-label"};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");
  return vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
    class: $options.buttonClass,
    type: "button",
    disabled: $options.disabled
  }, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      $props.loading && !$props.icon ? (vue.openBlock(), vue.createBlock("span", {
        key: 0,
        class: $options.iconClass
      }, null, 2)) : vue.createCommentVNode("", true),
      $props.icon ? (vue.openBlock(), vue.createBlock("span", {
        key: 1,
        class: $options.iconClass
      }, null, 2)) : vue.createCommentVNode("", true),
      vue.createVNode("span", _hoisted_1$4, vue.toDisplayString($props.label || "\xA0"), 1),
      $props.badge ? (vue.openBlock(), vue.createBlock("span", {
        key: 2,
        class: $options.badgeStyleClass
      }, vue.toDisplayString($props.badge), 3)) : vue.createCommentVNode("", true)
    ])
  ], 10, ["disabled"])), [
    [_directive_ripple]
  ]);
}
script$5.render = render$5;
var script$4 = {
  name: "ProgressBar",
  props: {
    value: Number,
    mode: {
      type: String,
      default: "determinate"
    },
    showValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    containerClass() {
      return [
        "p-progressbar p-component",
        {
          "p-progressbar-determinate": this.determinate,
          "p-progressbar-indeterminate": this.indeterminate
        }
      ];
    },
    progressStyle() {
      return {
        width: this.value + "%",
        display: "block"
      };
    },
    indeterminate() {
      return this.mode === "indeterminate";
    },
    determinate() {
      return this.mode === "determinate";
    }
  }
};
const _hoisted_1$3 = {
  key: 1,
  class: "p-progressbar-label"
};
const _hoisted_2$3 = {
  key: 2,
  class: "p-progressbar-indeterminate-container"
};
const _hoisted_3$3 = /* @__PURE__ */ vue.createVNode("div", {class: "p-progressbar-value p-progressbar-value-animate"}, null, -1);
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    role: "progressbar",
    class: $options.containerClass,
    "aria-valuemin": "0",
    "aria-valuenow": $props.value,
    "aria-valuemax": "100"
  }, [
    $options.determinate ? (vue.openBlock(), vue.createBlock("div", {
      key: 0,
      class: "p-progressbar-value p-progressbar-value-animate",
      style: $options.progressStyle
    }, null, 4)) : vue.createCommentVNode("", true),
    $options.determinate && $props.value && $props.showValue ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString($props.value + "%"), 1)
      ])
    ])) : vue.createCommentVNode("", true),
    $options.indeterminate ? (vue.openBlock(), vue.createBlock("div", _hoisted_2$3, [
      _hoisted_3$3
    ])) : vue.createCommentVNode("", true)
  ], 10, ["aria-valuenow"]);
}
function styleInject$3(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$3 = "\n.p-progressbar {\n    position: relative;\n    overflow: hidden;\n}\n.p-progressbar-determinate .p-progressbar-value {\n    height: 100%;\n    width: 0%;\n    position: absolute;\n    display: none;\n    border: 0 none;\n}\n.p-progressbar-determinate .p-progressbar-value-animate {\n    -webkit-transition: width 1s ease-in-out;\n    transition: width 1s ease-in-out;\n}\n.p-progressbar-determinate .p-progressbar-label {\n    text-align: center;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    font-weight: bold;\n}\n.p-progressbar-indeterminate .p-progressbar-value::before {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n              animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n.p-progressbar-indeterminate .p-progressbar-value::after {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n            animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    -webkit-animation-delay: 1.15s;\n            animation-delay: 1.15s;\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim {\n0% {\n    left: -35%;\n    right: 100%;\n}\n60% {\n    left: 100%;\n    right: -90%;\n}\n100% {\n    left: 100%;\n    right: -90%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim {\n0% {\n    left: -35%;\n    right: 100%;\n}\n60% {\n    left: 100%;\n    right: -90%;\n}\n100% {\n    left: 100%;\n    right: -90%;\n}\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim-short {\n0% {\n    left: -200%;\n    right: 100%;\n}\n60% {\n    left: 107%;\n    right: -8%;\n}\n100% {\n    left: 107%;\n    right: -8%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim-short {\n0% {\n    left: -200%;\n    right: 100%;\n}\n60% {\n    left: 107%;\n    right: -8%;\n}\n100% {\n    left: 107%;\n    right: -8%;\n}\n}\n";
styleInject$3(css_248z$3);
script$4.render = render$4;
var script$3 = {
  name: "Message",
  emits: ["close"],
  props: {
    severity: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: true
    },
    life: {
      type: Number,
      default: 3e3
    }
  },
  timeout: null,
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    if (!this.sticky) {
      setTimeout(() => {
        this.visible = false;
      }, this.life);
    }
  },
  methods: {
    close(event2) {
      this.visible = false;
      this.$emit("close", event2);
    }
  },
  computed: {
    containerClass() {
      return "p-message p-component p-message-" + this.severity;
    },
    iconClass() {
      return ["p-message-icon pi", {
        "pi-info-circle": this.severity === "info",
        "pi-check": this.severity === "success",
        "pi-exclamation-triangle": this.severity === "warn",
        "pi-times-circle": this.severity === "error"
      }];
    }
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$2 = {class: "p-message-wrapper"};
const _hoisted_2$2 = {class: "p-message-text"};
const _hoisted_3$2 = /* @__PURE__ */ vue.createVNode("i", {class: "p-message-close-icon pi pi-times"}, null, -1);
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "p-message",
    appear: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        class: $options.containerClass,
        role: "alert"
      }, [
        vue.createVNode("div", _hoisted_1$2, [
          vue.createVNode("span", {class: $options.iconClass}, null, 2),
          vue.createVNode("div", _hoisted_2$2, [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          $props.closable ? vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
            key: 0,
            class: "p-message-close p-link",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.close($event)),
            type: "button"
          }, [
            _hoisted_3$2
          ], 512)), [
            [_directive_ripple]
          ]) : vue.createCommentVNode("", true)
        ])
      ], 2), [
        [vue.vShow, $data.visible]
      ])
    ]),
    _: 3
  });
}
function styleInject$2(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$2 = "\n.p-message-wrapper {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-message-close {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n.p-message-enter-from {\n    opacity: 0;\n}\n.p-message-enter-active {\n    -webkit-transition: opacity .3s;\n    transition: opacity .3s;\n}\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n.p-message-leave-active {\n    overflow: hidden;\n    -webkit-transition: max-height .3s cubic-bezier(0, 1, 0, 1), opacity .3s, margin .15s;\n    transition: max-height .3s cubic-bezier(0, 1, 0, 1), opacity .3s, margin .15s;\n}\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
styleInject$2(css_248z$2);
script$3.render = render$3;
var script$2 = {
  name: "FileUpload",
  emits: ["select", "uploader", "before-upload", "progress", "upload", "error", "before-send", "clear", "remove"],
  props: {
    name: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      default: "advanced"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    maxFileSize: {
      type: Number,
      default: null
    },
    invalidFileSizeMessage: {
      type: String,
      default: "{0}: Invalid file size, file size should be smaller than {1}."
    },
    invalidFileTypeMessage: {
      type: String,
      default: "{0}: Invalid file type, allowed file types: {1}."
    },
    fileLimit: {
      type: Number,
      default: null
    },
    invalidFileLimitMessage: {
      type: String,
      default: "Maximum number of files exceeded, limit is {0} at most."
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    previewWidth: {
      type: Number,
      default: 50
    },
    chooseLabel: {
      type: String,
      default: null
    },
    uploadLabel: {
      type: String,
      default: null
    },
    cancelLabel: {
      type: String,
      default: null
    },
    customUpload: {
      type: Boolean,
      default: false
    },
    showUploadButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  duplicateIEEvent: false,
  data() {
    return {
      uploadedFileCount: 0,
      files: [],
      messages: [],
      focused: false,
      progress: null
    };
  },
  methods: {
    onFileSelect(event2) {
      if (event2.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = false;
        return;
      }
      this.messages = [];
      this.files = this.files || [];
      let files = event2.dataTransfer ? event2.dataTransfer.files : event2.target.files;
      for (let file of files) {
        if (!this.isFileSelected(file)) {
          if (this.validate(file)) {
            if (this.isImage(file)) {
              file.objectURL = window.URL.createObjectURL(file);
            }
            this.files.push(file);
          }
        }
      }
      this.$emit("select", {originalEvent: event2, files: this.files});
      if (this.fileLimit) {
        this.checkFileLimit();
      }
      if (this.auto && this.hasFiles && !this.isFileLimitExceeded()) {
        this.upload();
      }
      if (event2.type !== "drop" && this.isIE11()) {
        this.clearIEInput();
      } else {
        this.clearInputElement();
      }
    },
    choose() {
      this.$refs.fileInput.click();
    },
    upload() {
      if (this.customUpload) {
        if (this.fileLimit) {
          this.uploadedFileCount += this.files.length;
        }
        this.$emit("uploader", {files: this.files});
      } else {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        this.$emit("before-upload", {
          "xhr": xhr,
          "formData": formData
        });
        for (let file of this.files) {
          formData.append(this.name, file, file.name);
        }
        xhr.upload.addEventListener("progress", (event2) => {
          if (event2.lengthComputable) {
            this.progress = Math.round(event2.loaded * 100 / event2.total);
          }
          this.$emit("progress", {
            originalEvent: event2,
            progress: this.progress
          });
        });
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            this.progress = 0;
            if (xhr.status >= 200 && xhr.status < 300) {
              if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
              }
              this.$emit("upload", {
                xhr,
                files: this.files
              });
            } else {
              this.$emit("error", {
                xhr,
                files: this.files
              });
            }
            this.clear();
          }
        };
        xhr.open("POST", this.url, true);
        this.$emit("before-send", {
          "xhr": xhr,
          "formData": formData
        });
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
      }
    },
    clear() {
      this.files = [];
      this.messages = null;
      this.$emit("clear");
      if (this.isAdvanced) {
        this.clearInputElement();
      }
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    isFileSelected(file) {
      if (this.files && this.files.length) {
        for (let sFile of this.files) {
          if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size)
            return true;
        }
      }
      return false;
    },
    isIE11() {
      return !!window["MSInputMethodContext"] && !!document["documentMode"];
    },
    validate(file) {
      if (this.accept && !this.isFileTypeValid(file)) {
        this.messages.push(this.invalidFileTypeMessage.replace("{0}", file.name).replace("{1}", this.accept));
        return false;
      }
      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.messages.push(this.invalidFileSizeMessage.replace("{0}", file.name).replace("{1}", this.formatSize(this.maxFileSize)));
        return false;
      }
      return true;
    },
    isFileTypeValid(file) {
      let acceptableTypes = this.accept.split(",").map((type) => type.trim());
      for (let type of acceptableTypes) {
        let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
        if (acceptable) {
          return true;
        }
      }
      return false;
    },
    getTypeClass(fileType) {
      return fileType.substring(0, fileType.indexOf("/"));
    },
    isWildcard(fileType) {
      return fileType.indexOf("*") !== -1;
    },
    getFileExtension(file) {
      return "." + file.name.split(".").pop();
    },
    isImage(file) {
      return /^image\//.test(file.type);
    },
    onDragEnter(event2) {
      if (!this.disabled) {
        event2.stopPropagation();
        event2.preventDefault();
      }
    },
    onDragOver(event2) {
      if (!this.disabled) {
        DomHandler.addClass(this.$refs.content, "p-fileupload-highlight");
        event2.stopPropagation();
        event2.preventDefault();
      }
    },
    onDragLeave() {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
      }
    },
    onDrop(event2) {
      if (!this.disabled) {
        DomHandler.removeClass(this.$refs.content, "p-fileupload-highlight");
        event2.stopPropagation();
        event2.preventDefault();
        const files = event2.dataTransfer ? event2.dataTransfer.files : event2.target.files;
        const allowDrop = this.multiple || files && files.length === 1;
        if (allowDrop) {
          this.onFileSelect(event2);
        }
      }
    },
    onBasicUploaderClick() {
      if (this.hasFiles)
        this.upload();
      else
        this.$refs.fileInput.click();
    },
    remove(index2) {
      this.clearInputElement();
      let removedFile = this.files.splice(index2, 1)[0];
      this.files = [...this.files];
      this.$emit("remove", {
        file: removedFile,
        files: this.files
      });
    },
    clearInputElement() {
      this.$refs.fileInput.value = "";
    },
    clearIEInput() {
      if (this.$refs.fileInput) {
        this.duplicateIEEvent = true;
        this.$refs.fileInput.value = "";
      }
    },
    formatSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1e3, dm = 3, sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    isFileLimitExceeded() {
      if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused) {
        this.focused = false;
      }
      return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    },
    checkFileLimit() {
      if (this.isFileLimitExceeded()) {
        this.messages.push(this.invalidFileLimitMessage.replace("{0}", this.fileLimit.toString()));
      }
    }
  },
  computed: {
    isAdvanced() {
      return this.mode === "advanced";
    },
    isBasic() {
      return this.mode === "basic";
    },
    advancedChooseButtonClass() {
      return [
        "p-button p-component p-fileupload-choose",
        {
          "p-disabled": this.disabled,
          "p-focus": this.focused
        }
      ];
    },
    basicChooseButtonClass() {
      return ["p-button p-component p-fileupload-choose", {
        "p-fileupload-choose-selected": this.hasFiles,
        "p-disabled": this.disabled,
        "p-focus": this.focused
      }];
    },
    basicChooseButtonIconClass() {
      return ["p-button-icon p-button-icon-left pi", {
        "pi-plus": !this.hasFiles || this.auto,
        "pi-upload": this.hasFiles && !this.auto
      }];
    },
    basicChooseButtonLabel() {
      return this.auto ? this.chooseButtonLabel : this.hasFiles ? this.files[0].name : this.chooseButtonLabel;
    },
    hasFiles() {
      return this.files && this.files.length > 0;
    },
    chooseDisabled() {
      return this.disabled || this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    },
    uploadDisabled() {
      return this.disabled || !this.hasFiles || this.fileLimit < this.files.length;
    },
    cancelDisabled() {
      return this.disabled || !this.hasFiles;
    },
    chooseButtonLabel() {
      return this.chooseLabel || this.$primevue.config.locale.choose;
    },
    uploadButtonLabel() {
      return this.uploadLabel || this.$primevue.config.locale.upload;
    },
    cancelButtonLabel() {
      return this.cancelLabel || this.$primevue.config.locale.cancel;
    }
  },
  components: {
    "FileUploadButton": script$5,
    "FileUploadProgressBar": script$4,
    "FileUploadMessage": script$3
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "p-fileupload p-fileupload-advanced p-component"
};
const _hoisted_2$1 = {class: "p-fileupload-buttonbar"};
const _hoisted_3$1 = /* @__PURE__ */ vue.createVNode("span", {class: "p-button-icon p-button-icon-left pi pi-fw pi-plus"}, null, -1);
const _hoisted_4$1 = {class: "p-button-label"};
const _hoisted_5$1 = {
  key: 1,
  class: "p-fileupload-files"
};
const _hoisted_6$1 = {class: "p-fileupload-filename"};
const _hoisted_7$1 = {
  key: 2,
  class: "p-fileupload-empty"
};
const _hoisted_8$1 = {
  key: 1,
  class: "p-fileupload p-fileupload-basic p-component"
};
const _hoisted_9$1 = {class: "p-button-label"};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FileUploadButton = vue.resolveComponent("FileUploadButton");
  const _component_FileUploadProgressBar = vue.resolveComponent("FileUploadProgressBar");
  const _component_FileUploadMessage = vue.resolveComponent("FileUploadMessage");
  const _directive_ripple = vue.resolveDirective("ripple");
  return $options.isAdvanced ? (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
    vue.createVNode("div", _hoisted_2$1, [
      vue.withDirectives(vue.createVNode("span", {
        class: $options.advancedChooseButtonClass,
        onClick: _cache[2] || (_cache[2] = (...args) => $options.choose && $options.choose(...args)),
        onKeydown: _cache[3] || (_cache[3] = vue.withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
        onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[5] || (_cache[5] = (...args) => $options.onBlur && $options.onBlur(...args)),
        tabindex: "0"
      }, [
        vue.createVNode("input", {
          ref: "fileInput",
          type: "file",
          onChange: _cache[1] || (_cache[1] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
          multiple: $props.multiple,
          accept: $props.accept,
          disabled: $options.chooseDisabled
        }, null, 40, ["multiple", "accept", "disabled"]),
        _hoisted_3$1,
        vue.createVNode("span", _hoisted_4$1, vue.toDisplayString($options.chooseButtonLabel), 1)
      ], 34), [
        [_directive_ripple]
      ]),
      $props.showUploadButton ? (vue.openBlock(), vue.createBlock(_component_FileUploadButton, {
        key: 0,
        label: $options.uploadButtonLabel,
        icon: "pi pi-upload",
        onClick: $options.upload,
        disabled: $options.uploadDisabled
      }, null, 8, ["label", "onClick", "disabled"])) : vue.createCommentVNode("", true),
      $props.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_FileUploadButton, {
        key: 1,
        label: $options.cancelButtonLabel,
        icon: "pi pi-times",
        onClick: $options.clear,
        disabled: $options.cancelDisabled
      }, null, 8, ["label", "onClick", "disabled"])) : vue.createCommentVNode("", true)
    ]),
    vue.createVNode("div", {
      ref: "content",
      class: "p-fileupload-content",
      onDragenter: _cache[6] || (_cache[6] = (...args) => $options.onDragEnter && $options.onDragEnter(...args)),
      onDragover: _cache[7] || (_cache[7] = (...args) => $options.onDragOver && $options.onDragOver(...args)),
      onDragleave: _cache[8] || (_cache[8] = (...args) => $options.onDragLeave && $options.onDragLeave(...args)),
      onDrop: _cache[9] || (_cache[9] = (...args) => $options.onDrop && $options.onDrop(...args))
    }, [
      $options.hasFiles ? (vue.openBlock(), vue.createBlock(_component_FileUploadProgressBar, {
        key: 0,
        value: $data.progress
      }, null, 8, ["value"])) : vue.createCommentVNode("", true),
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.messages, (msg) => {
        return vue.openBlock(), vue.createBlock(_component_FileUploadMessage, {
          severity: "error",
          key: msg
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(msg), 1)
          ]),
          _: 2
        }, 1024);
      }), 128)),
      $options.hasFiles ? (vue.openBlock(), vue.createBlock("div", _hoisted_5$1, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.files, (file, index2) => {
          return vue.openBlock(), vue.createBlock("div", {
            class: "p-fileupload-row",
            key: file.name + file.type + file.size
          }, [
            vue.createVNode("div", null, [
              $options.isImage(file) ? (vue.openBlock(), vue.createBlock("img", {
                key: 0,
                role: "presentation",
                alt: file.name,
                src: file.objectURL,
                width: $props.previewWidth
              }, null, 8, ["alt", "src", "width"])) : vue.createCommentVNode("", true)
            ]),
            vue.createVNode("div", _hoisted_6$1, vue.toDisplayString(file.name), 1),
            vue.createVNode("div", null, vue.toDisplayString($options.formatSize(file.size)), 1),
            vue.createVNode("div", null, [
              vue.createVNode(_component_FileUploadButton, {
                type: "button",
                icon: "pi pi-times",
                onClick: ($event) => $options.remove(index2)
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128))
      ])) : vue.createCommentVNode("", true),
      _ctx.$slots.empty && !$options.hasFiles ? (vue.openBlock(), vue.createBlock("div", _hoisted_7$1, [
        vue.renderSlot(_ctx.$slots, "empty")
      ])) : vue.createCommentVNode("", true)
    ], 544)
  ])) : $options.isBasic ? (vue.openBlock(), vue.createBlock("div", _hoisted_8$1, [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.messages, (msg) => {
      return vue.openBlock(), vue.createBlock(_component_FileUploadMessage, {
        severity: "error",
        key: msg
      }, {
        default: vue.withCtx(() => [
          vue.createTextVNode(vue.toDisplayString(msg), 1)
        ]),
        _: 2
      }, 1024);
    }), 128)),
    vue.withDirectives(vue.createVNode("span", {
      class: $options.basicChooseButtonClass,
      onMouseup: _cache[13] || (_cache[13] = (...args) => $options.onBasicUploaderClick && $options.onBasicUploaderClick(...args)),
      onKeydown: _cache[14] || (_cache[14] = vue.withKeys((...args) => $options.choose && $options.choose(...args), ["enter"])),
      onFocus: _cache[15] || (_cache[15] = (...args) => $options.onFocus && $options.onFocus(...args)),
      onBlur: _cache[16] || (_cache[16] = (...args) => $options.onBlur && $options.onBlur(...args)),
      tabindex: "0"
    }, [
      vue.createVNode("span", {class: $options.basicChooseButtonIconClass}, null, 2),
      vue.createVNode("span", _hoisted_9$1, vue.toDisplayString($options.basicChooseButtonLabel), 1),
      !$options.hasFiles ? (vue.openBlock(), vue.createBlock("input", {
        key: 0,
        ref: "fileInput",
        type: "file",
        accept: $props.accept,
        disabled: $props.disabled,
        onChange: _cache[10] || (_cache[10] = (...args) => $options.onFileSelect && $options.onFileSelect(...args)),
        onFocus: _cache[11] || (_cache[11] = (...args) => $options.onFocus && $options.onFocus(...args)),
        onBlur: _cache[12] || (_cache[12] = (...args) => $options.onBlur && $options.onBlur(...args))
      }, null, 40, ["accept", "disabled"])) : vue.createCommentVNode("", true)
    ], 34), [
      [_directive_ripple]
    ])
  ])) : vue.createCommentVNode("", true);
}
function styleInject$1(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z$1 = "\n.p-fileupload-content {\n    position: relative;\n}\n.p-fileupload-row {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-fileupload-row > div {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 25%;\n}\n.p-fileupload-row > div:last-child {\n    text-align: right;\n}\n.p-fileupload-content .p-progressbar {\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-button.p-fileupload-choose {\n    position: relative;\n    overflow: hidden;\n}\n.p-button.p-fileupload-choose input[type=file] {\n    display: none;\n}\n.p-fileupload-choose.p-fileupload-choose-selected input[type=file] {\n    display: none;\n}\n.p-fileupload-filename {\n    word-break: break-all;\n}\n.p-fluid .p-fileupload .p-button {\n    width: auto;\n}\n";
styleInject$1(css_248z$1);
script$2.render = render$2;
var OverlayEventBus = primebus();
var script$1 = {
  name: "InputText",
  emits: ["update:modelValue"],
  props: {
    modelValue: null
  },
  methods: {
    onInput(event2) {
      this.$emit("update:modelValue", event2.target.value);
    }
  },
  computed: {
    filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("input", {
    class: ["p-inputtext p-component", {"p-filled": $options.filled}],
    value: $props.modelValue,
    onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args))
  }, null, 42, ["value"]);
}
script$1.render = render$1;
var script = {
  name: "Calendar",
  inheritAttrs: false,
  emits: ["show", "hide", "month-change", "year-change", "date-select", "update:modelValue", "today-click", "clear-click"],
  props: {
    modelValue: null,
    selectionMode: {
      type: String,
      default: "single"
    },
    dateFormat: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    showOtherMonths: {
      type: Boolean,
      default: true
    },
    selectOtherMonths: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "pi pi-calendar"
    },
    numberOfMonths: {
      type: Number,
      default: 1
    },
    view: {
      type: String,
      default: "date"
    },
    touchUI: {
      type: Boolean,
      default: false
    },
    monthNavigator: {
      type: Boolean,
      default: false
    },
    yearNavigator: {
      type: Boolean,
      default: false
    },
    yearRange: {
      type: String,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    minDate: {
      type: Date,
      value: null
    },
    maxDate: {
      type: Date,
      value: null
    },
    disabledDates: {
      type: Array,
      value: null
    },
    disabledDays: {
      type: Array,
      value: null
    },
    maxDateCount: {
      type: Number,
      value: null
    },
    showOnFocus: {
      type: Boolean,
      default: true
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    showButtonBar: {
      type: Boolean,
      default: false
    },
    shortYearCutoff: {
      type: String,
      default: "+10"
    },
    showTime: {
      type: Boolean,
      default: false
    },
    timeOnly: {
      type: Boolean,
      default: false
    },
    hourFormat: {
      type: String,
      default: "24"
    },
    stepHour: {
      type: Number,
      default: 1
    },
    stepMinute: {
      type: Number,
      default: 1
    },
    stepSecond: {
      type: Number,
      default: 1
    },
    showSeconds: {
      type: Boolean,
      default: false
    },
    hideOnDateTimeSelect: {
      type: Boolean,
      default: false
    },
    timeSeparator: {
      type: String,
      default: ":"
    },
    showWeek: {
      type: Boolean,
      default: false
    },
    manualInput: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: "body"
    },
    inputClass: null,
    inputStyle: null,
    class: null,
    style: null
  },
  navigationState: null,
  scrollHandler: null,
  outsideClickListener: null,
  maskClickListener: null,
  resizeListener: null,
  overlay: null,
  mask: null,
  timePickerTimer: null,
  isKeydown: false,
  created() {
    this.updateCurrentMetaData();
  },
  mounted() {
    if (this.inline && !this.$attrs.disabled) {
      this.initFocusableCell();
    }
  },
  updated() {
    if (this.overlay) {
      this.updateFocus();
    }
    if (this.$refs.input && this.selectionStart != null && this.selectionEnd != null) {
      this.$refs.input.$el.selectionStart = this.selectionStart;
      this.$refs.input.$el.selectionEnd = this.selectionEnd;
      this.selectionStart = null;
      this.selectionEnd = null;
    }
  },
  beforeUnmount() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
    }
    if (this.mask) {
      this.destroyMask();
    }
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay && this.autoZIndex) {
      ZIndexUtils.clear(this.overlay);
    }
    this.overlay = null;
  },
  data() {
    return {
      currentMonth: null,
      currentYear: null,
      currentHour: null,
      currentMinute: null,
      currentSecond: null,
      pm: null,
      focused: false,
      overlayVisible: false
    };
  },
  watch: {
    modelValue() {
      this.updateCurrentMetaData();
    },
    showTime() {
      this.updateCurrentMetaData();
    }
  },
  methods: {
    isComparable() {
      return this.modelValue != null && typeof this.modelValue !== "string";
    },
    isSelected(dateMeta) {
      if (!this.isComparable()) {
        return false;
      }
      if (this.modelValue) {
        if (this.isSingleSelection()) {
          return this.isDateEquals(this.modelValue, dateMeta);
        } else if (this.isMultipleSelection()) {
          let selected = false;
          for (let date of this.modelValue) {
            selected = this.isDateEquals(date, dateMeta);
            if (selected) {
              break;
            }
          }
          return selected;
        } else if (this.isRangeSelection()) {
          if (this.modelValue[1])
            return this.isDateEquals(this.modelValue[0], dateMeta) || this.isDateEquals(this.modelValue[1], dateMeta) || this.isDateBetween(this.modelValue[0], this.modelValue[1], dateMeta);
          else {
            return this.isDateEquals(this.modelValue[0], dateMeta);
          }
        }
      }
      return false;
    },
    isMonthSelected(month) {
      return this.isComparable() ? this.modelValue.getMonth() === month && this.modelValue.getFullYear() === this.currentYear : false;
    },
    isDateEquals(value, dateMeta) {
      if (value)
        return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
      else
        return false;
    },
    isDateBetween(start, end, dateMeta) {
      let between = false;
      if (start && end) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }
      return between;
    },
    getFirstDayOfMonthIndex(month, year) {
      let day = new Date();
      day.setDate(1);
      day.setMonth(month);
      day.setFullYear(year);
      let dayIndex = day.getDay() + this.sundayIndex;
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    },
    getDaysCountInMonth(month, year) {
      return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    },
    getDaysCountInPrevMonth(month, year) {
      let prev = this.getPreviousMonthAndYear(month, year);
      return this.getDaysCountInMonth(prev.month, prev.year);
    },
    getPreviousMonthAndYear(month, year) {
      let m, y;
      if (month === 0) {
        m = 11;
        y = year - 1;
      } else {
        m = month - 1;
        y = year;
      }
      return {"month": m, "year": y};
    },
    getNextMonthAndYear(month, year) {
      let m, y;
      if (month === 11) {
        m = 0;
        y = year + 1;
      } else {
        m = month + 1;
        y = year;
      }
      return {"month": m, "year": y};
    },
    daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    isToday(today, day, month, year) {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    },
    isSelectable(day, month, year, otherMonth) {
      let validMin = true;
      let validMax = true;
      let validDate = true;
      let validDay = true;
      if (otherMonth && !this.selectOtherMonths) {
        return false;
      }
      if (this.minDate) {
        if (this.minDate.getFullYear() > year) {
          validMin = false;
        } else if (this.minDate.getFullYear() === year) {
          if (this.minDate.getMonth() > month) {
            validMin = false;
          } else if (this.minDate.getMonth() === month) {
            if (this.minDate.getDate() > day) {
              validMin = false;
            }
          }
        }
      }
      if (this.maxDate) {
        if (this.maxDate.getFullYear() < year) {
          validMax = false;
        } else if (this.maxDate.getFullYear() === year) {
          if (this.maxDate.getMonth() < month) {
            validMax = false;
          } else if (this.maxDate.getMonth() === month) {
            if (this.maxDate.getDate() < day) {
              validMax = false;
            }
          }
        }
      }
      if (this.disabledDates) {
        validDate = !this.isDateDisabled(day, month, year);
      }
      if (this.disabledDays) {
        validDay = !this.isDayDisabled(day, month, year);
      }
      return validMin && validMax && validDate && validDay;
    },
    onOverlayEnter(el) {
      if (this.autoZIndex) {
        if (this.touchUI)
          ZIndexUtils.set("modal", el, this.baseZIndex || this.$primevue.config.zIndex.modal);
        else
          ZIndexUtils.set("overlay", el, this.baseZIndex || this.$primevue.config.zIndex.overlay);
      }
      this.alignOverlay();
      this.$emit("show");
    },
    onOverlayEnterComplete() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      if (this.mask) {
        this.disableModality();
      }
      this.overlay = null;
    },
    onPrevButtonClick(event2) {
      if (this.showOtherMonths) {
        this.navigationState = {backward: true, button: true};
        this.navBackward(event2);
      }
    },
    onNextButtonClick(event2) {
      if (this.showOtherMonths) {
        this.navigationState = {backward: false, button: true};
        this.navForward(event2);
      }
    },
    navBackward(event2) {
      event2.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.view === "month") {
        this.decrementYear();
      } else {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.decrementYear();
        } else {
          this.currentMonth--;
        }
        this.$emit("month-change", {month: this.currentMonth, year: this.currentYear});
      }
    },
    navForward(event2) {
      event2.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.view === "month") {
        this.incrementYear();
      } else {
        if (this.currentMonth === 11) {
          this.currentMonth = 0;
          this.incrementYear();
        } else {
          this.currentMonth++;
        }
        this.$emit("month-change", {month: this.currentMonth, year: this.currentYear});
      }
    },
    decrementYear() {
      this.currentYear--;
    },
    incrementYear() {
      this.currentYear++;
    },
    isEnabled() {
      return !this.$attrs.disabled && !this.$attrs.readonly;
    },
    updateCurrentTimeMeta(date) {
      let currentHour = date.getHours();
      if (this.hourFormat === "12") {
        this.pm = currentHour > 11;
        if (currentHour >= 12)
          currentHour = currentHour == 12 ? 12 : currentHour - 12;
        else
          currentHour = currentHour == 0 ? 12 : currentHour;
      }
      this.currentHour = Math.floor(currentHour / this.stepHour) * this.stepHour;
      this.currentMinute = Math.floor(date.getMinutes() / this.stepMinute) * this.stepMinute;
      this.currentSecond = Math.floor(date.getSeconds() / this.stepSecond) * this.stepSecond;
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event2) => {
          if (this.overlayVisible && this.isOutsideClicked(event2)) {
            this.overlayVisible = false;
          }
        };
        document.addEventListener("mousedown", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("mousedown", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener() {
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
          if (this.overlayVisible) {
            this.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.overlayVisible) {
            this.overlayVisible = false;
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    isOutsideClicked(event2) {
      return !(this.$el.isSameNode(event2.target) || this.isNavIconClicked(event2) || this.$el.contains(event2.target) || this.overlay && this.overlay.contains(event2.target));
    },
    isNavIconClicked(event2) {
      return DomHandler.hasClass(event2.target, "p-datepicker-prev") || DomHandler.hasClass(event2.target, "p-datepicker-prev-icon") || DomHandler.hasClass(event2.target, "p-datepicker-next") || DomHandler.hasClass(event2.target, "p-datepicker-next-icon");
    },
    alignOverlay() {
      if (this.touchUI) {
        this.enableModality();
      } else if (this.overlay) {
        if (this.appendDisabled) {
          DomHandler.relativePosition(this.overlay, this.$el);
        } else {
          this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
          DomHandler.absolutePosition(this.overlay, this.$el);
        }
      }
    },
    onButtonClick() {
      if (this.isEnabled()) {
        if (!this.overlayVisible) {
          this.$refs.input.$el.focus();
          this.overlayVisible = true;
        } else {
          this.overlayVisible = false;
        }
      }
    },
    isDateDisabled(day, month, year) {
      if (this.disabledDates) {
        for (let disabledDate of this.disabledDates) {
          if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
            return true;
          }
        }
      }
      return false;
    },
    isDayDisabled(day, month, year) {
      if (this.disabledDays) {
        let weekday = new Date(year, month, day);
        let weekdayNumber = weekday.getDay();
        return this.disabledDays.indexOf(weekdayNumber) !== -1;
      }
      return false;
    },
    onMonthDropdownChange(value) {
      this.currentMonth = parseInt(value);
      this.$emit("month-change", {month: this.currentMonth + 1, year: this.currentYear});
    },
    onYearDropdownChange(value) {
      this.currentYear = parseInt(value);
      this.$emit("year-change", {month: this.currentMonth + 1, year: this.currentYear});
    },
    onDateSelect(event2, dateMeta) {
      if (this.$attrs.disabled || !dateMeta.selectable) {
        return;
      }
      DomHandler.find(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled)").forEach((cell) => cell.tabIndex = -1);
      if (event2) {
        event2.currentTarget.focus();
      }
      if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
        let newValue = this.modelValue.filter((date) => !this.isDateEquals(date, dateMeta));
        this.updateModel(newValue);
      } else {
        if (this.shouldSelectDate(dateMeta)) {
          if (dateMeta.otherMonth) {
            this.currentMonth = dateMeta.month;
            this.currentYear = dateMeta.year;
            this.selectDate(dateMeta);
          } else {
            this.selectDate(dateMeta);
          }
        }
      }
      if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
        setTimeout(() => {
          this.overlayVisible = false;
        }, 150);
      }
    },
    selectDate(dateMeta) {
      let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      if (this.showTime) {
        if (this.hourFormat === "12" && this.pm && this.currentHour != 12)
          date.setHours(this.currentHour + 12);
        else
          date.setHours(this.currentHour);
        date.setMinutes(this.currentMinute);
        date.setSeconds(this.currentSecond);
      }
      if (this.minDate && this.minDate > date) {
        date = this.minDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      if (this.maxDate && this.maxDate < date) {
        date = this.maxDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      let modelVal = null;
      if (this.isSingleSelection()) {
        modelVal = date;
      } else if (this.isMultipleSelection()) {
        modelVal = this.modelValue ? [...this.modelValue, date] : [date];
      } else if (this.isRangeSelection()) {
        if (this.modelValue && this.modelValue.length) {
          let startDate = this.modelValue[0];
          let endDate = this.modelValue[1];
          if (!endDate && date.getTime() >= startDate.getTime()) {
            endDate = date;
          } else {
            startDate = date;
            endDate = null;
          }
          modelVal = [startDate, endDate];
        } else {
          modelVal = [date, null];
        }
      }
      if (modelVal !== null) {
        this.updateModel(modelVal);
      }
      this.$emit("date-select", date);
    },
    updateModel(value) {
      this.$emit("update:modelValue", value);
    },
    shouldSelectDate() {
      if (this.isMultipleSelection())
        return this.maxDateCount != null ? this.maxDateCount > (this.modelValue ? this.modelValue.length : 0) : true;
      else
        return true;
    },
    isSingleSelection() {
      return this.selectionMode === "single";
    },
    isRangeSelection() {
      return this.selectionMode === "range";
    },
    isMultipleSelection() {
      return this.selectionMode === "multiple";
    },
    formatValue(value) {
      if (typeof value === "string") {
        return value;
      }
      let formattedValue = "";
      if (value) {
        try {
          if (this.isSingleSelection()) {
            formattedValue = this.formatDateTime(value);
          } else if (this.isMultipleSelection()) {
            for (let i = 0; i < value.length; i++) {
              let dateAsString = this.formatDateTime(value[i]);
              formattedValue += dateAsString;
              if (i !== value.length - 1) {
                formattedValue += ", ";
              }
            }
          } else if (this.isRangeSelection()) {
            if (value && value.length) {
              let startDate = value[0];
              let endDate = value[1];
              formattedValue = this.formatDateTime(startDate);
              if (endDate) {
                formattedValue += " - " + this.formatDateTime(endDate);
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }
      return formattedValue;
    },
    formatDateTime(date) {
      let formattedValue = null;
      if (date) {
        if (this.timeOnly) {
          formattedValue = this.formatTime(date);
        } else {
          formattedValue = this.formatDate(date, this.datePattern);
          if (this.showTime) {
            formattedValue += " " + this.formatTime(date);
          }
        }
      }
      return formattedValue;
    },
    formatDate(date, format) {
      if (!date) {
        return "";
      }
      let iFormat;
      const lookAhead = (match) => {
        const matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, formatNumber = (match, value, len) => {
        let num = "" + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = "0" + num;
          }
        }
        return num;
      }, formatName = (match, value, shortNames, longNames) => {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
      let output = "";
      let literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;
              case "D":
                output += formatName("D", date.getDay(), this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
                break;
              case "o":
                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;
              case "M":
                output += formatName("M", date.getMonth(), this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
                break;
              case "y":
                output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                break;
              case "@":
                output += date.getTime();
                break;
              case "!":
                output += date.getTime() * 1e4 + this.ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    formatTime(date) {
      if (!date) {
        return "";
      }
      let output = "";
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (this.hourFormat === "12" && hours > 11 && hours !== 12) {
        hours -= 12;
      }
      if (this.hourFormat === "12") {
        output += hours === 0 ? 12 : hours < 10 ? "0" + hours : hours;
      } else {
        output += hours < 10 ? "0" + hours : hours;
      }
      output += ":";
      output += minutes < 10 ? "0" + minutes : minutes;
      if (this.showSeconds) {
        output += ":";
        output += seconds < 10 ? "0" + seconds : seconds;
      }
      if (this.hourFormat === "12") {
        output += date.getHours() > 11 ? " PM" : " AM";
      }
      return output;
    },
    onTodayButtonClick(event2) {
      let date = new Date();
      let dateMeta = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
        today: true,
        selectable: true
      };
      this.onDateSelect(null, dateMeta);
      this.$emit("today-click", date);
      event2.preventDefault();
    },
    onClearButtonClick(event2) {
      this.updateModel(null);
      this.overlayVisible = false;
      this.$emit("clear-click", event2);
      event2.preventDefault();
    },
    onTimePickerElementMouseDown(event2, type, direction) {
      if (this.isEnabled()) {
        this.repeat(event2, null, type, direction);
        event2.preventDefault();
      }
    },
    onTimePickerElementMouseUp(event2) {
      if (this.isEnabled()) {
        this.clearTimePickerTimer();
        this.updateModelTime();
        event2.preventDefault();
      }
    },
    onTimePickerElementMouseLeave() {
      this.clearTimePickerTimer();
    },
    repeat(event2, interval, type, direction) {
      let i = interval || 500;
      this.clearTimePickerTimer();
      this.timePickerTimer = setTimeout(() => {
        this.repeat(event2, 100, type, direction);
      }, i);
      switch (type) {
        case 0:
          if (direction === 1)
            this.incrementHour(event2);
          else
            this.decrementHour(event2);
          break;
        case 1:
          if (direction === 1)
            this.incrementMinute(event2);
          else
            this.decrementMinute(event2);
          break;
        case 2:
          if (direction === 1)
            this.incrementSecond(event2);
          else
            this.decrementSecond(event2);
          break;
      }
    },
    convertTo24Hour(hours, pm) {
      if (this.hourFormat == "12") {
        if (hours === 12) {
          return pm ? 12 : 0;
        } else {
          return pm ? hours + 12 : hours;
        }
      }
      return hours;
    },
    validateTime(hour, minute, second, pm) {
      let value = this.modelValue;
      const convertedHour = this.convertTo24Hour(hour, pm);
      if (!this.isComparable()) {
        return true;
      }
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      const valueDateString = value ? value.toDateString() : null;
      if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
        if (this.minDate.getHours() > convertedHour) {
          return false;
        }
        if (this.minDate.getHours() === convertedHour) {
          if (this.minDate.getMinutes() > minute) {
            return false;
          }
          if (this.minDate.getMinutes() === minute) {
            if (this.minDate.getSeconds() > second) {
              return false;
            }
          }
        }
      }
      if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
        if (this.maxDate.getHours() < convertedHour) {
          return false;
        }
        if (this.maxDate.getHours() === convertedHour) {
          if (this.maxDate.getMinutes() < minute) {
            return false;
          }
          if (this.maxDate.getMinutes() === minute) {
            if (this.maxDate.getSeconds() < second) {
              return false;
            }
          }
        }
      }
      return true;
    },
    incrementHour(event2) {
      let prevHour = this.currentHour;
      let newHour = this.currentHour + this.stepHour;
      let newPM = this.pm;
      if (this.hourFormat == "24")
        newHour = newHour >= 24 ? newHour - 24 : newHour;
      else if (this.hourFormat == "12") {
        if (prevHour < 12 && newHour > 11) {
          newPM = !this.pm;
        }
        newHour = newHour >= 13 ? newHour - 12 : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event2.preventDefault();
    },
    decrementHour(event2) {
      let newHour = this.currentHour - this.stepHour;
      let newPM = this.pm;
      if (this.hourFormat == "24")
        newHour = newHour < 0 ? 24 + newHour : newHour;
      else if (this.hourFormat == "12") {
        if (this.currentHour === 12) {
          newPM = !this.pm;
        }
        newHour = newHour <= 0 ? 12 + newHour : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event2.preventDefault();
    },
    incrementMinute(event2) {
      let newMinute = this.currentMinute + this.stepMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, true)) {
        this.currentMinute = newMinute > 59 ? newMinute - 60 : newMinute;
      }
      event2.preventDefault();
    },
    decrementMinute(event2) {
      let newMinute = this.currentMinute - this.stepMinute;
      newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, true)) {
        this.currentMinute = newMinute;
      }
      event2.preventDefault();
    },
    incrementSecond(event2) {
      let newSecond = this.currentSecond + this.stepSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, true)) {
        this.currentSecond = newSecond > 59 ? newSecond - 60 : newSecond;
      }
      event2.preventDefault();
    },
    decrementSecond(event2) {
      let newSecond = this.currentSecond - this.stepSecond;
      newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, true)) {
        this.currentSecond = newSecond;
      }
      event2.preventDefault();
    },
    updateModelTime() {
      let value = this.isComparable() ? this.modelValue : new Date();
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      value = value ? new Date(value.getTime()) : new Date();
      if (this.hourFormat == "12") {
        if (this.currentHour === 12)
          value.setHours(this.pm ? 12 : 0);
        else
          value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      } else {
        value.setHours(this.currentHour);
      }
      value.setMinutes(this.currentMinute);
      value.setSeconds(this.currentSecond);
      if (this.isRangeSelection()) {
        if (this.modelValue[1])
          value = [this.modelValue[0], value];
        else
          value = [value, null];
      }
      if (this.isMultipleSelection()) {
        value = [...this.modelValue.slice(0, -1), value];
      }
      this.updateModel(value);
      this.$emit("date-select", value);
    },
    toggleAMPM(event2) {
      this.pm = !this.pm;
      this.updateModelTime();
      event2.preventDefault();
    },
    clearTimePickerTimer() {
      if (this.timePickerTimer) {
        clearInterval(this.timePickerTimer);
      }
    },
    onMonthSelect(event2, index2) {
      this.onDateSelect(event2, {year: this.currentYear, month: index2, day: 1, selectable: true});
    },
    enableModality() {
      if (!this.mask) {
        this.mask = document.createElement("div");
        this.mask.style.zIndex = String(parseInt(this.overlay.style.zIndex, 10) - 1);
        DomHandler.addMultipleClasses(this.mask, "p-datepicker-mask p-datepicker-mask-scrollblocker");
        this.maskClickListener = () => {
          this.overlayVisible = false;
        };
        this.mask.addEventListener("click", this.maskClickListener);
        document.body.appendChild(this.mask);
        DomHandler.addClass(document.body, "p-overflow-hidden");
        setTimeout(() => {
          DomHandler.addClass(this.mask, "p-component-overlay");
        }, 1);
      }
    },
    disableModality() {
      if (this.mask) {
        DomHandler.addClass(this.mask, "p-datepicker-mask-leave");
        this.mask.addEventListener("transitionend", () => {
          this.destroyMask();
        });
      }
    },
    destroyMask() {
      this.mask.removeEventListener("click", this.maskClickListener);
      this.maskClickListener = null;
      document.body.removeChild(this.mask);
      this.mask = null;
      let bodyChildren = document.body.children;
      let hasBlockerMasks;
      for (let i = 0; i < bodyChildren.length; i++) {
        let bodyChild = bodyChildren[i];
        if (DomHandler.hasClass(bodyChild, "p-datepicker-mask-scrollblocker")) {
          hasBlockerMasks = true;
          break;
        }
      }
      if (!hasBlockerMasks) {
        DomHandler.removeClass(document.body, "p-overflow-hidden");
      }
    },
    updateCurrentMetaData() {
      const viewDate = this.viewDate;
      this.currentMonth = viewDate.getMonth();
      this.currentYear = viewDate.getFullYear();
      if (this.showTime || this.timeOnly) {
        this.updateCurrentTimeMeta(viewDate);
      }
    },
    isValidSelection(value) {
      let isValid = true;
      if (this.isSingleSelection()) {
        if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
          isValid = false;
        }
      } else if (value.every((v) => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
        if (this.isRangeSelection()) {
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
        }
      }
      return isValid;
    },
    parseValue(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }
      let value;
      if (this.isSingleSelection()) {
        value = this.parseDateTime(text);
      } else if (this.isMultipleSelection()) {
        let tokens = text.split(",");
        value = [];
        for (let token of tokens) {
          value.push(this.parseDateTime(token.trim()));
        }
      } else if (this.isRangeSelection()) {
        let tokens = text.split(" - ");
        value = [];
        for (let i = 0; i < tokens.length; i++) {
          value[i] = this.parseDateTime(tokens[i].trim());
        }
      }
      return value;
    },
    parseDateTime(text) {
      let date;
      let parts = text.split(" ");
      if (this.timeOnly) {
        date = new Date();
        this.populateTime(date, parts[0], parts[1]);
      } else {
        const dateFormat = this.datePattern;
        if (this.showTime) {
          date = this.parseDate(parts[0], dateFormat);
          this.populateTime(date, parts[1], parts[2]);
        } else {
          date = this.parseDate(text, dateFormat);
        }
      }
      return date;
    },
    populateTime(value, timeString, ampm) {
      if (this.hourFormat == "12" && !ampm) {
        throw "Invalid Time";
      }
      this.pm = ampm === "PM" || ampm === "pm";
      let time = this.parseTime(timeString);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
    },
    parseTime(value) {
      let tokens = value.split(":");
      let validTokenLength = this.showSeconds ? 3 : 2;
      let regex = /^[0-9][0-9]$/;
      if (tokens.length !== validTokenLength || !tokens[0].match(regex) || !tokens[1].match(regex) || this.showSeconds && !tokens[2].match(regex)) {
        throw "Invalid time";
      }
      let h = parseInt(tokens[0]);
      let m = parseInt(tokens[1]);
      let s = this.showSeconds ? parseInt(tokens[2]) : null;
      if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || this.hourFormat == "12" && h > 12 || this.showSeconds && (isNaN(s) || s > 59)) {
        throw "Invalid time";
      } else {
        if (this.hourFormat == "12" && h !== 12 && this.pm) {
          h += 12;
        }
        return {hour: h, minute: m, second: s};
      }
    },
    parseDate(value, format) {
      if (format == null || value == null) {
        throw "Invalid arguments";
      }
      value = typeof value === "object" ? value.toString() : value + "";
      if (value === "") {
        return null;
      }
      let iFormat, dim, extra, iValue = 0, shortYearCutoff = typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
        let matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, getNumber = (match) => {
        let isDoubled = lookAhead(match), size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2, minSize = match === "y" ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
        if (!num) {
          throw "Missing number at position " + iValue;
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      }, getName = (match, shortNames, longNames) => {
        let index2 = -1;
        let arr = lookAhead(match) ? longNames : shortNames;
        let names = [];
        for (let i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort((a, b) => {
          return -(a[1].length - b[1].length);
        });
        for (let i = 0; i < names.length; i++) {
          let name = names[i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index2 = names[i][0];
            iValue += name.length;
            break;
          }
        }
        if (index2 !== -1) {
          return index2 + 1;
        } else {
          throw "Unknown name at position " + iValue;
        }
      }, checkLiteral = () => {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw "Unexpected literal at position " + iValue;
        }
        iValue++;
      };
      if (this.view === "month") {
        day = 1;
      }
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day = getNumber("d");
              break;
            case "D":
              getName("D", this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
              break;
            case "o":
              doy = getNumber("o");
              break;
            case "m":
              month = getNumber("m");
              break;
            case "M":
              month = getName("M", this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
              break;
            case "y":
              year = getNumber("y");
              break;
            case "@":
              date = new Date(getNumber("@"));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "!":
              date = new Date((getNumber("!") - this.ticksTo1970) / 1e4);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw "Extra/unparsed characters found in date: " + extra;
        }
      }
      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = this.getDaysCountInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day -= dim;
        } while (true);
      }
      date = this.daylightSavingAdjust(new Date(year, month - 1, day));
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        throw "Invalid date";
      }
      return date;
    },
    getWeekNumber(date) {
      let checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      let time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 864e5) / 7) + 1;
    },
    onDateCellKeydown(event2, date, groupIndex) {
      const cellContent = event2.currentTarget;
      const cell = cellContent.parentElement;
      switch (event2.which) {
        case 40: {
          cellContent.tabIndex = "-1";
          let cellIndex = DomHandler.index(cell);
          let nextRow = cell.parentElement.nextElementSibling;
          if (nextRow) {
            let focusCell = nextRow.children[cellIndex].children[0];
            if (DomHandler.hasClass(focusCell, "p-disabled")) {
              this.navigationState = {backward: false};
              this.navForward(event2);
            } else {
              nextRow.children[cellIndex].children[0].tabIndex = "0";
              nextRow.children[cellIndex].children[0].focus();
            }
          } else {
            this.navigationState = {backward: false};
            this.navForward(event2);
          }
          event2.preventDefault();
          break;
        }
        case 38: {
          cellContent.tabIndex = "-1";
          let cellIndex = DomHandler.index(cell);
          let prevRow = cell.parentElement.previousElementSibling;
          if (prevRow) {
            let focusCell = prevRow.children[cellIndex].children[0];
            if (DomHandler.hasClass(focusCell, "p-disabled")) {
              this.navigationState = {backward: true};
              this.navBackward(event2);
            } else {
              focusCell.tabIndex = "0";
              focusCell.focus();
            }
          } else {
            this.navigationState = {backward: true};
            this.navBackward(event2);
          }
          event2.preventDefault();
          break;
        }
        case 37: {
          cellContent.tabIndex = "-1";
          let prevCell = cell.previousElementSibling;
          if (prevCell) {
            let focusCell = prevCell.children[0];
            if (DomHandler.hasClass(focusCell, "p-disabled")) {
              this.navigateToMonth(true, groupIndex);
            } else {
              focusCell.tabIndex = "0";
              focusCell.focus();
            }
          } else {
            this.navigateToMonth(true, groupIndex);
          }
          event2.preventDefault();
          break;
        }
        case 39: {
          cellContent.tabIndex = "-1";
          let nextCell = cell.nextElementSibling;
          if (nextCell) {
            let focusCell = nextCell.children[0];
            if (DomHandler.hasClass(focusCell, "p-disabled")) {
              this.navigateToMonth(false, groupIndex);
            } else {
              focusCell.tabIndex = "0";
              focusCell.focus();
            }
          } else {
            this.navigateToMonth(false, groupIndex);
          }
          event2.preventDefault();
          break;
        }
        case 13: {
          this.onDateSelect(event2, date);
          event2.preventDefault();
          break;
        }
        case 27: {
          this.overlayVisible = false;
          event2.preventDefault();
          break;
        }
        case 9: {
          if (!this.inline) {
            this.trapFocus(event2);
          }
          break;
        }
      }
    },
    navigateToMonth(prev, groupIndex) {
      if (prev) {
        if (this.numberOfMonths === 1 || groupIndex === 0) {
          this.navigationState = {backward: true};
          this.navBackward(event);
        } else {
          let prevMonthContainer = this.overlay.children[groupIndex - 1];
          let cells = DomHandler.find(prevMonthContainer, ".p-datepicker-calendar td span:not(.p-disabled)");
          let focusCell = cells[cells.length - 1];
          focusCell.tabIndex = "0";
          focusCell.focus();
        }
      } else {
        if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
          this.navigationState = {backward: false};
          this.navForward(event);
        } else {
          let nextMonthContainer = this.overlay.children[groupIndex + 1];
          let focusCell = DomHandler.findSingle(nextMonthContainer, ".p-datepicker-calendar td span:not(.p-disabled)");
          focusCell.tabIndex = "0";
          focusCell.focus();
        }
      }
    },
    onMonthCellKeydown(event2, index2) {
      const cell = event2.currentTarget;
      switch (event2.which) {
        case 38:
        case 40: {
          cell.tabIndex = "-1";
          var cells = cell.parentElement.children;
          var cellIndex = DomHandler.index(cell);
          let nextCell = cells[event2.which === 40 ? cellIndex + 3 : cellIndex - 3];
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event2.preventDefault();
          break;
        }
        case 37: {
          cell.tabIndex = "-1";
          let prevCell = cell.previousElementSibling;
          if (prevCell) {
            prevCell.tabIndex = "0";
            prevCell.focus();
          }
          event2.preventDefault();
          break;
        }
        case 39: {
          cell.tabIndex = "-1";
          let nextCell = cell.nextElementSibling;
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event2.preventDefault();
          break;
        }
        case 13: {
          this.onMonthSelect(event2, index2);
          event2.preventDefault();
          break;
        }
        case 27: {
          this.overlayVisible = false;
          event2.preventDefault();
          break;
        }
        case 9: {
          this.trapFocus(event2);
          break;
        }
      }
    },
    updateFocus() {
      let cell;
      if (this.navigationState) {
        if (this.navigationState.button) {
          this.initFocusableCell();
          if (this.navigationState.backward)
            DomHandler.findSingle(this.overlay, ".p-datepicker-prev").focus();
          else
            DomHandler.findSingle(this.overlay, ".p-datepicker-next").focus();
        } else {
          if (this.navigationState.backward) {
            let cells = DomHandler.find(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled)");
            cell = cells[cells.length - 1];
          } else {
            cell = DomHandler.findSingle(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled)");
          }
          if (cell) {
            cell.tabIndex = "0";
            cell.focus();
          }
        }
        this.navigationState = null;
      } else {
        this.initFocusableCell();
      }
    },
    initFocusableCell() {
      let cell;
      if (this.view === "month") {
        let cells = DomHandler.find(this.overlay, ".p-monthpicker .p-monthpicker-month");
        let selectedCell = DomHandler.findSingle(this.overlay, ".p-monthpicker .p-monthpicker-month.p-highlight");
        cells.forEach((cell2) => cell2.tabIndex = -1);
        cell = selectedCell || cells[0];
      } else {
        cell = DomHandler.findSingle(this.overlay, "span.p-highlight");
        if (!cell) {
          let todayCell = DomHandler.findSingle(this.overlay, "td.p-datepicker-today span:not(.p-disabled)");
          if (todayCell)
            cell = todayCell;
          else
            cell = DomHandler.findSingle(this.overlay, ".p-datepicker-calendar td span:not(.p-disabled)");
        }
      }
      if (cell) {
        cell.tabIndex = "0";
      }
    },
    trapFocus(event2) {
      event2.preventDefault();
      let focusableElements = DomHandler.getFocusableElements(this.overlay);
      if (focusableElements && focusableElements.length > 0) {
        if (!document.activeElement) {
          focusableElements[0].focus();
        } else {
          let focusedIndex = focusableElements.indexOf(document.activeElement);
          if (event2.shiftKey) {
            if (focusedIndex == -1 || focusedIndex === 0)
              focusableElements[focusableElements.length - 1].focus();
            else
              focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1)
              focusableElements[0].focus();
            else
              focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    },
    onContainerButtonKeydown(event2) {
      switch (event2.which) {
        case 9:
          this.trapFocus(event2);
          break;
        case 27:
          this.overlayVisible = false;
          event2.preventDefault();
          break;
      }
    },
    onInput(event2) {
      if (!this.isKeydown) {
        return;
      }
      this.isKeydown = false;
      try {
        this.selectionStart = this.$refs.input.$el.selectionStart;
        this.selectionEnd = this.$refs.input.$el.selectionEnd;
        let value = this.parseValue(event2.target.value);
        if (this.isValidSelection(value)) {
          this.updateModel(value);
        }
      } catch (err) {
        this.updateModel(event2.target.value);
      }
    },
    onFocus() {
      if (this.showOnFocus && this.isEnabled()) {
        this.overlayVisible = true;
      }
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onKeyDown(event2) {
      this.isKeydown = true;
      if (event2.keyCode === 40 && this.overlay) {
        this.trapFocus(event2);
      } else if (event2.keyCode === 27) {
        if (this.overlayVisible) {
          this.overlayVisible = false;
          event2.preventDefault();
        }
      } else if (event2.keyCode === 9) {
        if (this.overlay) {
          DomHandler.getFocusableElements(this.overlay).forEach((el) => el.tabIndex = "-1");
        }
        if (this.overlayVisible) {
          this.overlayVisible = false;
        }
      }
    },
    overlayRef(el) {
      this.overlay = el;
    },
    getMonthName(index2) {
      return this.$primevue.config.locale.monthNames[index2];
    },
    onOverlayClick(event2) {
      if (!this.inline) {
        OverlayEventBus.emit("overlay-click", {
          originalEvent: event2,
          target: this.$el
        });
      }
    }
  },
  computed: {
    viewDate() {
      let propValue = this.modelValue;
      if (typeof propValue === "string") {
        return new Date();
      }
      if (propValue && Array.isArray(propValue)) {
        propValue = propValue[0];
      }
      return propValue || new Date();
    },
    inputFieldValue() {
      return this.formatValue(this.modelValue);
    },
    containerClass() {
      return [
        "p-calendar p-component p-inputwrapper",
        this.class,
        {
          "p-calendar-w-btn": this.showIcon,
          "p-calendar-timeonly": this.timeOnly,
          "p-inputwrapper-filled": this.modelValue,
          "p-inputwrapper-focus": this.focused
        }
      ];
    },
    panelStyleClass() {
      return ["p-datepicker p-component", this.panelClass, {
        "p-datepicker-inline": this.inline,
        "p-disabled": this.$attrs.disabled,
        "p-datepicker-timeonly": this.timeOnly,
        "p-datepicker-multiple-month": this.numberOfMonths > 1,
        "p-datepicker-monthpicker": this.view === "month",
        "p-datepicker-touch-ui": this.touchUI,
        "p-input-filled": this.$primevue.config.inputStyle === "filled",
        "p-ripple-disabled": this.$primevue.config.ripple === false
      }];
    },
    months() {
      let months = [];
      for (let i = 0; i < this.numberOfMonths; i++) {
        let month = this.currentMonth + i;
        let year = this.currentYear;
        if (month > 11) {
          month = month % 11 - 1;
          year = year + 1;
        }
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i2 = 0; i2 < monthRows; i2++) {
          let week = [];
          if (i2 == 0) {
            for (let j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
              let prev = this.getPreviousMonthAndYear(month, year);
              week.push({
                day: j,
                month: prev.month,
                year: prev.year,
                otherMonth: true,
                today: this.isToday(today, j, prev.month, prev.year),
                selectable: this.isSelectable(j, prev.month, prev.year, true)
              });
            }
            let remainingDaysLength = 7 - week.length;
            for (let j = 0; j < remainingDaysLength; j++) {
              week.push({
                day: dayNo,
                month,
                year,
                today: this.isToday(today, dayNo, month, year),
                selectable: this.isSelectable(dayNo, month, year, false)
              });
              dayNo++;
            }
          } else {
            for (let j = 0; j < 7; j++) {
              if (dayNo > daysLength) {
                let next = this.getNextMonthAndYear(month, year);
                week.push({
                  day: dayNo - daysLength,
                  month: next.month,
                  year: next.year,
                  otherMonth: true,
                  today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                  selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                });
              } else {
                week.push({
                  day: dayNo,
                  month,
                  year,
                  today: this.isToday(today, dayNo, month, year),
                  selectable: this.isSelectable(dayNo, month, year, false)
                });
              }
              dayNo++;
            }
          }
          if (this.showWeek) {
            weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
          }
          dates.push(week);
        }
        months.push({
          month,
          year,
          dates,
          weekNumbers
        });
      }
      return months;
    },
    weekDays() {
      let weekDays = [];
      let dayIndex = this.$primevue.config.locale.firstDayOfWeek;
      for (let i = 0; i < 7; i++) {
        weekDays.push(this.$primevue.config.locale.dayNamesMin[dayIndex]);
        dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
      }
      return weekDays;
    },
    ticksTo1970() {
      return ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 1e7;
    },
    sundayIndex() {
      return this.$primevue.config.locale.firstDayOfWeek > 0 ? 7 - this.$primevue.config.locale.firstDayOfWeek : 0;
    },
    datePattern() {
      return this.dateFormat || this.$primevue.config.locale.dateFormat;
    },
    yearOptions() {
      if (this.yearRange) {
        let $vm = this;
        const years = this.yearRange.split(":");
        let yearStart = parseInt(years[0]);
        let yearEnd = parseInt(years[1]);
        let yearOptions = [];
        if (this.currentYear < yearStart) {
          $vm.currentYear = yearEnd;
        } else if (this.currentYear > yearEnd) {
          $vm.currentYear = yearStart;
        }
        for (let i = yearStart; i <= yearEnd; i++) {
          yearOptions.push(i);
        }
        return yearOptions;
      } else {
        return null;
      }
    },
    monthPickerValues() {
      let monthPickerValues = [];
      for (let i = 0; i <= 11; i++) {
        monthPickerValues.push(this.$primevue.config.locale.monthNamesShort[i]);
      }
      return monthPickerValues;
    },
    formattedCurrentHour() {
      return this.currentHour < 10 ? "0" + this.currentHour : this.currentHour;
    },
    formattedCurrentMinute() {
      return this.currentMinute < 10 ? "0" + this.currentMinute : this.currentMinute;
    },
    formattedCurrentSecond() {
      return this.currentSecond < 10 ? "0" + this.currentSecond : this.currentSecond;
    },
    todayLabel() {
      return this.$primevue.config.locale.today;
    },
    clearLabel() {
      return this.$primevue.config.locale.clear;
    },
    weekHeaderLabel() {
      return this.$primevue.config.locale.weekHeader;
    },
    monthNames() {
      return this.$primevue.config.locale.monthNames;
    },
    appendDisabled() {
      return this.appendTo === "self" || this.inline;
    },
    appendTarget() {
      return this.appendDisabled ? null : this.appendTo;
    }
  },
  components: {
    "CalendarInputText": script$1,
    "CalendarButton": script$5
  },
  directives: {
    "ripple": Ripple
  }
};
const _hoisted_1 = {class: "p-datepicker-group-container"};
const _hoisted_2 = {class: "p-datepicker-header"};
const _hoisted_3 = /* @__PURE__ */ vue.createVNode("span", {class: "p-datepicker-prev-icon pi pi-chevron-left"}, null, -1);
const _hoisted_4 = {class: "p-datepicker-title"};
const _hoisted_5 = {
  key: 0,
  class: "p-datepicker-month"
};
const _hoisted_6 = {
  key: 2,
  class: "p-datepicker-year"
};
const _hoisted_7 = /* @__PURE__ */ vue.createVNode("span", {class: "p-datepicker-next-icon pi pi-chevron-right"}, null, -1);
const _hoisted_8 = {
  key: 0,
  class: "p-datepicker-calendar-container"
};
const _hoisted_9 = {class: "p-datepicker-calendar"};
const _hoisted_10 = {
  key: 0,
  scope: "col",
  class: "p-datepicker-weekheader p-disabled"
};
const _hoisted_11 = {
  key: 0,
  class: "p-datepicker-weeknumber"
};
const _hoisted_12 = {class: "p-disabled"};
const _hoisted_13 = {
  key: 0,
  style: {"visibility": "hidden"}
};
const _hoisted_14 = {
  key: 0,
  class: "p-monthpicker"
};
const _hoisted_15 = {
  key: 1,
  class: "p-timepicker"
};
const _hoisted_16 = {class: "p-hour-picker"};
const _hoisted_17 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-up"}, null, -1);
const _hoisted_18 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-down"}, null, -1);
const _hoisted_19 = {class: "p-separator"};
const _hoisted_20 = {class: "p-minute-picker"};
const _hoisted_21 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-up"}, null, -1);
const _hoisted_22 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-down"}, null, -1);
const _hoisted_23 = {
  key: 0,
  class: "p-separator"
};
const _hoisted_24 = {
  key: 1,
  class: "p-second-picker"
};
const _hoisted_25 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-up"}, null, -1);
const _hoisted_26 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-down"}, null, -1);
const _hoisted_27 = {
  key: 2,
  class: "p-separator"
};
const _hoisted_28 = {
  key: 3,
  class: "p-ampm-picker"
};
const _hoisted_29 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-up"}, null, -1);
const _hoisted_30 = /* @__PURE__ */ vue.createVNode("span", {class: "pi pi-chevron-down"}, null, -1);
const _hoisted_31 = {
  key: 2,
  class: "p-datepicker-buttonbar"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CalendarInputText = vue.resolveComponent("CalendarInputText");
  const _component_CalendarButton = vue.resolveComponent("CalendarButton");
  const _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createBlock("span", {
    ref: "container",
    class: $options.containerClass,
    style: $props.style
  }, [
    !$props.inline ? (vue.openBlock(), vue.createBlock(_component_CalendarInputText, vue.mergeProps({
      key: 0,
      ref: "input",
      type: "text"
    }, _ctx.$attrs, {
      value: $options.inputFieldValue,
      onInput: $options.onInput,
      onFocus: $options.onFocus,
      onBlur: $options.onBlur,
      onKeydown: $options.onKeyDown,
      readonly: !$props.manualInput,
      inputmode: "none",
      class: $props.inputClass,
      style: $props.inputStyle
    }), null, 16, ["value", "onInput", "onFocus", "onBlur", "onKeydown", "readonly", "class", "style"])) : vue.createCommentVNode("", true),
    $props.showIcon ? (vue.openBlock(), vue.createBlock(_component_CalendarButton, {
      key: 1,
      icon: $props.icon,
      tabindex: "-1",
      class: "p-datepicker-trigger",
      disabled: _ctx.$attrs.disabled,
      onClick: $options.onButtonClick,
      type: "button",
      "aria-label": $options.inputFieldValue
    }, null, 8, ["icon", "disabled", "onClick", "aria-label"])) : vue.createCommentVNode("", true),
    (vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: $options.appendTarget,
      disabled: $options.appendDisabled
    }, [
      vue.createVNode(vue.Transition, {
        name: "p-connected-overlay",
        onEnter: _cache[48] || (_cache[48] = ($event) => $options.onOverlayEnter($event)),
        onAfterEnter: $options.onOverlayEnterComplete,
        onAfterLeave: $options.onOverlayAfterLeave,
        onLeave: $options.onOverlayLeave
      }, {
        default: vue.withCtx(() => [
          ($props.inline ? true : $data.overlayVisible) ? (vue.openBlock(), vue.createBlock("div", {
            key: 0,
            ref: $options.overlayRef,
            class: $options.panelStyleClass,
            role: $props.inline ? null : "dialog",
            onClick: _cache[47] || (_cache[47] = (...args) => $options.onOverlayClick && $options.onOverlayClick(...args))
          }, [
            !$props.timeOnly ? (vue.openBlock(), vue.createBlock(vue.Fragment, {key: 0}, [
              vue.createVNode("div", _hoisted_1, [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.months, (month, groupIndex) => {
                  return vue.openBlock(), vue.createBlock("div", {
                    class: "p-datepicker-group",
                    key: month.month + month.year
                  }, [
                    vue.createVNode("div", _hoisted_2, [
                      vue.renderSlot(_ctx.$slots, "header"),
                      groupIndex === 0 ? vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
                        key: 0,
                        class: "p-datepicker-prev p-link",
                        onClick: _cache[1] || (_cache[1] = (...args) => $options.onPrevButtonClick && $options.onPrevButtonClick(...args)),
                        type: "button",
                        onKeydown: _cache[2] || (_cache[2] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                        disabled: _ctx.$attrs.disabled
                      }, [
                        _hoisted_3
                      ], 40, ["disabled"])), [
                        [_directive_ripple]
                      ]) : vue.createCommentVNode("", true),
                      vue.createVNode("div", _hoisted_4, [
                        !$props.monthNavigator && $props.view !== "month" ? (vue.openBlock(), vue.createBlock("span", _hoisted_5, vue.toDisplayString($options.getMonthName(month.month)), 1)) : vue.createCommentVNode("", true),
                        $props.monthNavigator && $props.view !== "month" && $props.numberOfMonths === 1 ? (vue.openBlock(), vue.createBlock("select", {
                          key: 1,
                          class: "p-datepicker-month",
                          onChange: _cache[3] || (_cache[3] = ($event) => $options.onMonthDropdownChange($event.target.value))
                        }, [
                          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.monthNames, (monthName, index2) => {
                            return vue.openBlock(), vue.createBlock("option", {
                              value: index2,
                              key: monthName,
                              selected: index2 === month.month
                            }, vue.toDisplayString(monthName), 9, ["value", "selected"]);
                          }), 128))
                        ], 32)) : vue.createCommentVNode("", true),
                        !$props.yearNavigator ? (vue.openBlock(), vue.createBlock("span", _hoisted_6, vue.toDisplayString($props.view === "month" ? $data.currentYear : month.year), 1)) : vue.createCommentVNode("", true),
                        $props.yearNavigator && $props.numberOfMonths === 1 ? (vue.openBlock(), vue.createBlock("select", {
                          key: 3,
                          class: "p-datepicker-year",
                          onChange: _cache[4] || (_cache[4] = ($event) => $options.onYearDropdownChange($event.target.value))
                        }, [
                          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.yearOptions, (year) => {
                            return vue.openBlock(), vue.createBlock("option", {
                              value: year,
                              key: year,
                              selected: year === $data.currentYear
                            }, vue.toDisplayString(year), 9, ["value", "selected"]);
                          }), 128))
                        ], 32)) : vue.createCommentVNode("", true)
                      ]),
                      ($props.numberOfMonths === 1 ? true : groupIndex === $props.numberOfMonths - 1) ? vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
                        key: 1,
                        class: "p-datepicker-next p-link",
                        onClick: _cache[5] || (_cache[5] = (...args) => $options.onNextButtonClick && $options.onNextButtonClick(...args)),
                        type: "button",
                        onKeydown: _cache[6] || (_cache[6] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                        disabled: _ctx.$attrs.disabled
                      }, [
                        _hoisted_7
                      ], 40, ["disabled"])), [
                        [_directive_ripple]
                      ]) : vue.createCommentVNode("", true)
                    ]),
                    $props.view === "date" ? (vue.openBlock(), vue.createBlock("div", _hoisted_8, [
                      vue.createVNode("table", _hoisted_9, [
                        vue.createVNode("thead", null, [
                          vue.createVNode("tr", null, [
                            $props.showWeek ? (vue.openBlock(), vue.createBlock("th", _hoisted_10, [
                              vue.createVNode("span", null, vue.toDisplayString($options.weekHeaderLabel), 1)
                            ])) : vue.createCommentVNode("", true),
                            (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.weekDays, (weekDay) => {
                              return vue.openBlock(), vue.createBlock("th", {
                                scope: "col",
                                key: weekDay
                              }, [
                                vue.createVNode("span", null, vue.toDisplayString(weekDay), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        vue.createVNode("tbody", null, [
                          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(month.dates, (week, i) => {
                            return vue.openBlock(), vue.createBlock("tr", {
                              key: week[0].day + "" + week[0].month
                            }, [
                              $props.showWeek ? (vue.openBlock(), vue.createBlock("td", _hoisted_11, [
                                vue.createVNode("span", _hoisted_12, [
                                  month.weekNumbers[i] < 10 ? (vue.openBlock(), vue.createBlock("span", _hoisted_13, "0")) : vue.createCommentVNode("", true),
                                  vue.createTextVNode(" " + vue.toDisplayString(month.weekNumbers[i]), 1)
                                ])
                              ])) : vue.createCommentVNode("", true),
                              (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(week, (date) => {
                                return vue.openBlock(), vue.createBlock("td", {
                                  key: date.day + "" + date.month,
                                  class: {"p-datepicker-other-month": date.otherMonth, "p-datepicker-today": date.today}
                                }, [
                                  vue.withDirectives(vue.createVNode("span", {
                                    class: {"p-highlight": $options.isSelected(date), "p-disabled": !date.selectable},
                                    onClick: ($event) => $options.onDateSelect($event, date),
                                    draggable: "false",
                                    onKeydown: ($event) => $options.onDateCellKeydown($event, date, groupIndex)
                                  }, [
                                    vue.renderSlot(_ctx.$slots, "date", {date}, () => [
                                      vue.createTextVNode(vue.toDisplayString(date.day), 1)
                                    ])
                                  ], 42, ["onClick", "onKeydown"]), [
                                    [_directive_ripple]
                                  ])
                                ], 2);
                              }), 128))
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : vue.createCommentVNode("", true)
                  ]);
                }), 128))
              ]),
              $props.view === "month" ? (vue.openBlock(), vue.createBlock("div", _hoisted_14, [
                (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.monthPickerValues, (m, i) => {
                  return vue.withDirectives((vue.openBlock(), vue.createBlock("span", {
                    key: m,
                    onClick: ($event) => $options.onMonthSelect($event, i),
                    onKeydown: ($event) => $options.onMonthCellKeydown($event, i),
                    class: ["p-monthpicker-month", {"p-highlight": $options.isMonthSelected(i)}]
                  }, vue.toDisplayString(m), 43, ["onClick", "onKeydown"])), [
                    [_directive_ripple]
                  ]);
                }), 128))
              ])) : vue.createCommentVNode("", true)
            ], 64)) : vue.createCommentVNode("", true),
            $props.showTime || $props.timeOnly ? (vue.openBlock(), vue.createBlock("div", _hoisted_15, [
              vue.createVNode("div", _hoisted_16, [
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[7] || (_cache[7] = ($event) => $options.onTimePickerElementMouseDown($event, 0, 1)),
                  onMouseup: _cache[8] || (_cache[8] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[9] || (_cache[9] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[11] || (_cache[11] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, 1), ["enter"]))
                  ],
                  onMouseleave: _cache[10] || (_cache[10] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[12] || (_cache[12] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_17
                ], 544), [
                  [_directive_ripple]
                ]),
                vue.createVNode("span", null, vue.toDisplayString($options.formattedCurrentHour), 1),
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[13] || (_cache[13] = ($event) => $options.onTimePickerElementMouseDown($event, 0, -1)),
                  onMouseup: _cache[14] || (_cache[14] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[15] || (_cache[15] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[17] || (_cache[17] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 0, -1), ["enter"]))
                  ],
                  onMouseleave: _cache[16] || (_cache[16] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[18] || (_cache[18] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_18
                ], 544), [
                  [_directive_ripple]
                ])
              ]),
              vue.createVNode("div", _hoisted_19, [
                vue.createVNode("span", null, vue.toDisplayString($props.timeSeparator), 1)
              ]),
              vue.createVNode("div", _hoisted_20, [
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[19] || (_cache[19] = ($event) => $options.onTimePickerElementMouseDown($event, 1, 1)),
                  onMouseup: _cache[20] || (_cache[20] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[21] || (_cache[21] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[23] || (_cache[23] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, 1), ["enter"]))
                  ],
                  disabled: _ctx.$attrs.disabled,
                  onMouseleave: _cache[22] || (_cache[22] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[24] || (_cache[24] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_21
                ], 40, ["disabled"]), [
                  [_directive_ripple]
                ]),
                vue.createVNode("span", null, vue.toDisplayString($options.formattedCurrentMinute), 1),
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[25] || (_cache[25] = ($event) => $options.onTimePickerElementMouseDown($event, 1, -1)),
                  onMouseup: _cache[26] || (_cache[26] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[27] || (_cache[27] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[29] || (_cache[29] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 1, -1), ["enter"]))
                  ],
                  disabled: _ctx.$attrs.disabled,
                  onMouseleave: _cache[28] || (_cache[28] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[30] || (_cache[30] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_22
                ], 40, ["disabled"]), [
                  [_directive_ripple]
                ])
              ]),
              $props.showSeconds ? (vue.openBlock(), vue.createBlock("div", _hoisted_23, [
                vue.createVNode("span", null, vue.toDisplayString($props.timeSeparator), 1)
              ])) : vue.createCommentVNode("", true),
              $props.showSeconds ? (vue.openBlock(), vue.createBlock("div", _hoisted_24, [
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[31] || (_cache[31] = ($event) => $options.onTimePickerElementMouseDown($event, 2, 1)),
                  onMouseup: _cache[32] || (_cache[32] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[33] || (_cache[33] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[35] || (_cache[35] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, 1), ["enter"]))
                  ],
                  disabled: _ctx.$attrs.disabled,
                  onMouseleave: _cache[34] || (_cache[34] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[36] || (_cache[36] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_25
                ], 40, ["disabled"]), [
                  [_directive_ripple]
                ]),
                vue.createVNode("span", null, vue.toDisplayString($options.formattedCurrentSecond), 1),
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onMousedown: _cache[37] || (_cache[37] = ($event) => $options.onTimePickerElementMouseDown($event, 2, -1)),
                  onMouseup: _cache[38] || (_cache[38] = ($event) => $options.onTimePickerElementMouseUp($event)),
                  onKeydown: [
                    _cache[39] || (_cache[39] = (...args) => $options.onContainerButtonKeydown && $options.onContainerButtonKeydown(...args)),
                    _cache[41] || (_cache[41] = vue.withKeys(($event) => $options.onTimePickerElementMouseDown($event, 2, -1), ["enter"]))
                  ],
                  disabled: _ctx.$attrs.disabled,
                  onMouseleave: _cache[40] || (_cache[40] = ($event) => $options.onTimePickerElementMouseLeave()),
                  onKeyup: _cache[42] || (_cache[42] = vue.withKeys(($event) => $options.onTimePickerElementMouseUp($event), ["enter"])),
                  type: "button"
                }, [
                  _hoisted_26
                ], 40, ["disabled"]), [
                  [_directive_ripple]
                ])
              ])) : vue.createCommentVNode("", true),
              $props.hourFormat == "12" ? (vue.openBlock(), vue.createBlock("div", _hoisted_27, [
                vue.createVNode("span", null, vue.toDisplayString($props.timeSeparator), 1)
              ])) : vue.createCommentVNode("", true),
              $props.hourFormat == "12" ? (vue.openBlock(), vue.createBlock("div", _hoisted_28, [
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onClick: _cache[43] || (_cache[43] = ($event) => $options.toggleAMPM($event)),
                  type: "button",
                  disabled: _ctx.$attrs.disabled
                }, [
                  _hoisted_29
                ], 8, ["disabled"]), [
                  [_directive_ripple]
                ]),
                vue.createVNode("span", null, vue.toDisplayString($data.pm ? "PM" : "AM"), 1),
                vue.withDirectives(vue.createVNode("button", {
                  class: "p-link",
                  onClick: _cache[44] || (_cache[44] = ($event) => $options.toggleAMPM($event)),
                  type: "button",
                  disabled: _ctx.$attrs.disabled
                }, [
                  _hoisted_30
                ], 8, ["disabled"]), [
                  [_directive_ripple]
                ])
              ])) : vue.createCommentVNode("", true)
            ])) : vue.createCommentVNode("", true),
            $props.showButtonBar ? (vue.openBlock(), vue.createBlock("div", _hoisted_31, [
              vue.createVNode(_component_CalendarButton, {
                type: "button",
                label: $options.todayLabel,
                onClick: _cache[45] || (_cache[45] = ($event) => $options.onTodayButtonClick($event)),
                class: "p-button-text",
                onKeydown: $options.onContainerButtonKeydown
              }, null, 8, ["label", "onKeydown"]),
              vue.createVNode(_component_CalendarButton, {
                type: "button",
                label: $options.clearLabel,
                onClick: _cache[46] || (_cache[46] = ($event) => $options.onClearButtonClick($event)),
                class: "p-button-text",
                onKeydown: $options.onContainerButtonKeydown
              }, null, 8, ["label", "onKeydown"])
            ])) : vue.createCommentVNode("", true),
            vue.renderSlot(_ctx.$slots, "footer")
          ], 10, ["role"])) : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["onAfterEnter", "onAfterLeave", "onLeave"])
    ], 8, ["to", "disabled"]))
  ], 6);
}
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = "\n.p-calendar {\n    position: relative;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.p-calendar .p-inputtext {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n}\n.p-calendar-w-btn .p-inputtext {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-calendar-w-btn .p-datepicker-trigger {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n/* Fluid */\n.p-fluid .p-calendar {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-calendar .p-inputtext {\n    width: 1%;\n}\n\n/* Datepicker */\n.p-calendar .p-datepicker {\n    min-width: 100%;\n}\n.p-datepicker {\n	width: auto;\n    position: absolute;\n}\n.p-datepicker-inline {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    position: static;\n}\n\n/* Header */\n.p-datepicker-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.p-datepicker-header .p-datepicker-title {\n    margin: 0 auto;\n}\n.p-datepicker-prev,\n.p-datepicker-next {\n    cursor: pointer;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Multiple Month DatePicker */\n.p-datepicker-multiple-month .p-datepicker-group-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n/* DatePicker Table */\n.p-datepicker table {\n	width: 100%;\n	border-collapse: collapse;\n}\n.p-datepicker td > span {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    cursor: pointer;\n    margin: 0 auto;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Month Picker */\n.p-monthpicker-month {\n    width: 33.3%;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n/*  Button Bar */\n.p-datepicker-buttonbar {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n\n/* Time Picker */\n.p-timepicker {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.p-timepicker button {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n.p-timepicker > div {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n\n/* Touch UI */\n.p-datepicker-touch-ui,\n.p-calendar .p-datepicker-touch-ui {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    min-width: 80vw;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n}\n.p-datepicker-mask {\n    background-color: transparent;\n    -webkit-transition-property: background-color;\n    transition-property: background-color;\n}\n.p-datepicker-mask.p-datepicker-mask-leave.p-component-overlay {\n    background-color: transparent;\n}\n";
styleInject(css_248z);
script.render = render;
let exampleApi = registerApi("example-api", async (...params) => {
  console.log("exampleApi - params", params);
  return {
    data: {example: ":)123468", params}
  };
});
let testApi = registerApi("test-api", async (...params) => {
  console.log("test api - params", params);
  return {
    data: {test: "heh1", params}
  };
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  exampleApi,
  testApi
});
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case "../components/ImportType.vue":
      return Promise.resolve().then(function() {
        return ImportType;
      });
    default:
      return Promise.reject(new Error("Unknown variable dynamic import: " + path));
  }
}
const _withId = /* @__PURE__ */ vue.withScopeId("data-v-0e819617");
const _sfc_main$1 = {
  expose: [],
  __ssrInlineRender: true,
  async setup(__props) {
    usePageMeta();
    const ImportType2 = load("ImportType");
    const Foo2 = vue.defineAsyncComponent(() => Promise.resolve().then(function() {
      return Foo$1;
    }).then((mod) => mod.Foo));
    function load(file) {
      return vue.defineAsyncComponent(() => __variableDynamicImportRuntime1__(`../components/${file}.vue`));
    }
    const state = vue.reactive({
      date: new Date(2020, 5, 2, 0, 0, 0, 0),
      count: 2
    });
    console.log("SETUP HOME");
    const x = vue.ref(await exampleApi(1, 3));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = vue.resolveComponent("ClientOnly");
      _push(`<!--[--><h1 data-v-0e819617>Home</h1><p data-v-0e819617><img${serverRenderer.ssrRenderAttr("src", _imports_0)} alt="logo" data-v-0e819617></p><p data-v-0e819617> ssr api call: ${serverRenderer.ssrInterpolate(x.value)}</p><button data-v-0e819617> count is: ${serverRenderer.ssrInterpolate(vue.unref(state).count)}</button>`);
      _push(serverRenderer.ssrRenderComponent(vue.unref(Foo2), null, null, _parent));
      _push(`<p class="virtual" data-v-0e819617> msg from virtual module: ${serverRenderer.ssrInterpolate(vue.unref(foo$1).msg)}</p>`);
      _push(serverRenderer.ssrRenderComponent(vue.unref(script$5), {label: "example api call"}, null, _parent));
      _push(serverRenderer.ssrRenderComponent(vue.unref(script$2), {
        mode: "basic",
        name: "demo[]",
        url: "./upload"
      }, null, _parent));
      _push(`<div x-v-if="process.browser" class="p-fluid p-grid p-formgrid" data-v-0e819617><div class="p-field p-col-12 p-md-4" data-v-0e819617><label for="dateformat" data-v-0e819617>DateFormat</label> abc1 `);
      _push(serverRenderer.ssrRenderComponent(_component_ClientOnly, null, {
        default: _withId((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.ssrRenderComponent(vue.unref(script), {
              id: "dateformat",
              modelValue: vue.unref(state).date,
              "onUpdate:modelValue": ($event) => vue.unref(state).date = $event,
              "date-format": "mm-dd-yy"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vue.createVNode(vue.unref(script), {
                id: "dateformat",
                modelValue: vue.unref(state).date,
                "onUpdate:modelValue": ($event) => vue.unref(state).date = $event,
                "date-format": "mm-dd-yy"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` def </div></div><div style="${serverRenderer.ssrRenderStyle({"color": "red"})}" data-v-0e819617> state.date: ${serverRenderer.ssrInterpolate(vue.unref(state).date)}</div>`);
      _push(serverRenderer.ssrRenderComponent(vue.unref(ImportType2), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-0e819617";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/home/forceuser/Projects/email-sender/app/src/pages/Home.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Home = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main$1
});
var _sfc_main = vue.defineComponent({
  expose: [],
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${serverRenderer.ssrRenderAttrs(_attrs)}>import type should be removed without side-effect</p>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("/home/forceuser/Projects/email-sender/app/src/components/ImportType.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ImportType = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _sfc_main
});
var foo = "";
function ssrRegisterHelper(comp, filename) {
  const setup = comp.setup;
  comp.setup = (props, ctx) => {
    const ssrContext = vue.useSSRContext();
    (ssrContext.modules || (ssrContext.modules = new Set())).add(filename);
    if (setup) {
      return setup(props, ctx);
    }
  };
}
const Foo = vue.defineComponent({
  name: "Foo",
  setup() {
    return () => vue.createVNode("div", {
      "class": "jsx"
    }, [vue.createTextVNode("from JSX")]);
  }
});
const __moduleId = "/home/forceuser/Projects/email-sender/app/src/components/Foo.jsx";
ssrRegisterHelper(Foo, __moduleId);
var Foo$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  Foo
});
exports.getApis = getApis;
exports.render = render$6;
