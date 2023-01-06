import { h, computed } from "vue";
import { ElInput } from "element-plus";

export default {
  props: ["text"],
  emit: ["syncText"],
  setup(props, { emit }) {
    const newText = computed({
      get: () => props.text,
      set: (val) => {
        console.log('trigger set');
        emit("syncText", val);
      },
    });
    return () =>
      h("div", {}, [
        h(ElInput, {
          modelValue: newText.value,
          "onUpdate:modelValue": (value) => {
            newText.value = value;
            // return emit("update:modelValue", value);
          },
        }),
      ]);
  },
};
