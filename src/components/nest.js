import { h, toRaw } from "vue";
import {
  ElInput,
  ElOption,
  ElSelect,
  ElCascader,
  ElDatePicker,
} from "element-plus";

export default {
  name: "filter-group",
  props: ["config", "modelValue"],
  setup(props) {
    return () =>
      h(
        "div",
        { class: "test" },
        props.config.map((configItem) => {
          const { nestComponentAttributes = {} } = configItem;
          if (configItem.nestComponentName === "el-input") {
            return h(ElInput, {
              modelValue: props.modelValue[configItem.keyName],
              "onUpdate:modelValue": (value) => {
                props.modelValue[configItem.keyName] = value;
              },
            });
          } else if (configItem.nestComponentName === "el-select") {
            return h(
              ElSelect,
              {
                modelValue: props.modelValue[configItem.keyName],
                placeholder: nestComponentAttributes.placeholder,
                filterable: nestComponentAttributes.filterable,
                style: `width: ${nestComponentAttributes.width};`,
                "onUpdate:modelValue": (value) => {
                  console.log("el-select update", value);
                  props.modelValue[configItem.keyName] = value;
                },
              },
              () =>
                nestComponentAttributes.options.value.map((optionsItem) => {
                  return h(ElOption, {
                    label: optionsItem.label,
                    value: optionsItem.value,
                    key: optionsItem.value,
                  });
                })
            );
          } else if (configItem.nestComponentName === "el-cascader") {
            return h(
              ElCascader,
              {
                modelValue: props.modelValue[configItem.keyName],
                options: nestComponentAttributes.options.value,
                filterable: nestComponentAttributes.filterable,
                placeholder: nestComponentAttributes["placeholder"],
                clearable: nestComponentAttributes["clearable"],
                props: nestComponentAttributes["props"],
                "collapse-tags": nestComponentAttributes["collapse-tags"],
                style: `width: ${nestComponentAttributes.width};`,
                "onUpdate:modelValue": (value) => {
                  console.log("el-cascader update", value);
                  props.modelValue[configItem.keyName] = value || "";
                },
                onChange: (
                  () => (value) =>
                    nestComponentAttributes.onChange(value)
                )(),
              },
              nestComponentAttributes.slot
                ? {
                    default: ({ data }) => {
                      return h(
                        nestComponentAttributes.slot.tagName,
                        null,
                        data.name
                      );
                    },
                  }
                : null

              // todo 如果有多个child则需要考虑更复杂的场景。
              // nestComponentAttributes.slots
              //   ? () => {
              //       return nestComponentAttributes.slots.map((slot) => {
              //         console.log("do slot");
              //         return h(
              //           slot.slotContent.tagName,
              //           // slots[slot.slotName]({
              //           //   data: { a: 1 },
              //           // })
              //           { default: () => "default slot" }
              //         );
              //       });
              //     }
              //   : null
            );
          } else if (configItem.nestComponentName === "el-date-picker") {
            return h(ElDatePicker, {
              modelValue: props.modelValue[configItem.keyName],
              type: "daterange",
              "range-separator": nestComponentAttributes["range-separator"],
              "start-placeholder": nestComponentAttributes["start-placeholder"],
              "end-placeholder": nestComponentAttributes["end-placeholder"],
              "value-format": nestComponentAttributes["value-format"],
              "onUpdate:modelValue": (value) => {
                props.modelValue[configItem.keyName] = value;
              },
            });
          }
        })
      );
  },
};
