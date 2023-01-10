import { h } from "vue";
import { ElInput } from "element-plus";

export default {
  props: ["modelValue"],
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    return () =>
      h("div", {}, [
        h(ElInput, {
          modelValue: props.modelValue,
          "onUpdate:modelValue": (value) => {
            emit("update:modelValue", value);
          },
        }),
      ]);
  },
};
