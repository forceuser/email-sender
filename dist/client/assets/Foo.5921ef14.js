import {G as defineComponent, a as createVNode, b as createTextVNode} from "./vendor.30138b3b.js";
var foo = "";
const Foo = defineComponent({
  name: "Foo",
  setup() {
    return () => createVNode("div", {
      "class": "jsx"
    }, [createTextVNode("from JSX")]);
  }
});
export {Foo};
