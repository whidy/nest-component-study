import { h, computed } from "vue";
import { ElInput, ElOption, ElSelect } from "element-plus";

export default {
  props: ["config", "modelValue"],
  // emit: ["update:modelValue"],
  setup(props) {
    // const newFilter = computed(() => props.modelValue);
    return () =>
      h(
        "div",
        { class: "test" },
        // [
        //   h(ElInput, {
        //     modelValue: newFilter.value[props.config[0].keyName],
        //     "onUpdate:modelValue": (value) => {
        //       newFilter.value[props.config[0].keyName] = value;
        //     },
        //   }),
        //   h(
        //     ElSelect,
        //     {
        //       modelValue: newFilter.value[props.config[1].keyName],
        //       "onUpdate:modelValue": (value) => {
        //         newFilter.value[props.config[1].keyName] = value;
        //       },
        //     },
        //     () => [
        //       h(ElOption, {
        //         label: props.config[1].options[0].label,
        //         value: props.config[1].options[0].value,
        //         key: props.config[1].options[0].value,
        //       }),
        //       h(ElOption, {
        //         label: props.config[1].options[1].label,
        //         value: props.config[1].options[1].value,
        //         key: props.config[1].options[0].value,
        //       }),
        //     ]
        //   ),
        // ],

        // test
        props.config.map((configItem) => {
          if (configItem.type === "el-input") {
            return h(ElInput, {
              modelValue: props.modelValue[configItem.keyName],
              "onUpdate:modelValue": (value) => {
                props.modelValue[configItem.keyName] = value;
              },
            });
          } else if (configItem.type === "el-select") {
            return h(
              ElSelect,
              {
                modelValue: props.modelValue[configItem.keyName],
                "onUpdate:modelValue": (value) => {
                  props.modelValue[configItem.keyName] = value;
                },
              },
              () =>
                configItem.options.map((optionsItem) => {
                  return h(ElOption, {
                    label: optionsItem.label,
                    value: optionsItem.value,
                    key: optionsItem.value,
                  });
                })
            );
          }
        })
      );
  },
};
