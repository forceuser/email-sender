import {J as defineComponent, d as createVNode, e as createTextVNode} from "./vendor.8999bd4d.js";
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
