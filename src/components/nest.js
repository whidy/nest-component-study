import { h } from "vue";
import { ref, onBeforeUpdate, watch } from "vue"; // for debug
import { ElInput, ElSelect, ElOption, ElCascader, ElDatePicker } from "element-plus";

export default {
  name: "filter-advanced",
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    /**
     * debug block start
     */
    console.log("setup");
    onBeforeUpdate(() => {
      console.log("update");
    });
    watch(
      () => props,
      (newVal, oldVal) => {
        console.log("changed");
        console.log(newVal, oldVal);
      },
      {
        deep: true,
      }
    );
    /**
     * debug block end
     */
    return () =>
      h(
        "div",
        { class: "left-filter filter_list" },
        props.config.map((configItem) => {
          return h("div", { class: "filter_item" }, [
            h("span", { class: "filter_title" }, configItem.title),
            (() => {
              const { nestComponentAttributes = {} } = configItem;
              if (configItem.nestComponentName === "el-input") {
                return h(ElInput, {
                  modelValue: props.modelValue[configItem.keyName],
                  style: nestComponentAttributes.style,
                  "onUpdate:modelValue": (value) => {
                    props.modelValue[configItem.keyName] = value;
                  },
                });
              } else if (configItem.nestComponentName === "el-select") {
                // console.log(nestComponentAttributes.options.value);
                return h(
                  ElSelect,
                  {
                    modelValue: props.modelValue[configItem.keyName],
                    placeholder: nestComponentAttributes.placeholder,
                    filterable: nestComponentAttributes.filterable,
                    style: nestComponentAttributes.style,
                    "onUpdate:modelValue": (value) => {
                      // console.log(configItem.keyName, value);
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
                    placeholder: nestComponentAttributes.placeholder,
                    clearable: nestComponentAttributes.clearable,
                    props: nestComponentAttributes.props,
                    "collapse-tags": nestComponentAttributes["collapse-tags"],
                    style: nestComponentAttributes.style,
                    "onUpdate:modelValue": (value) => {
                      // console.log("el-cascader update", value);
                      props.modelValue[configItem.keyName] = value || "";
                    },
                    onChange: (() => (value) => {
                      // console.log(value);
                      nestComponentAttributes.onChange(value);
                    })(),
                  },
                  nestComponentAttributes.slot
                    ? {
                        default: ({ data }) => {
                          return h(nestComponentAttributes.slot.tagName, null, data.name);
                        },
                      }
                    : null
                );
              } else if (configItem.nestComponentName === "el-date-picker") {
                return h(ElDatePicker, {
                  modelValue: props.modelValue[configItem.keyName],
                  type: nestComponentAttributes.type,
                  "range-separator": nestComponentAttributes["range-separator"],
                  "start-placeholder": nestComponentAttributes["start-placeholder"],
                  "end-placeholder": nestComponentAttributes["end-placeholder"],
                  "value-format": nestComponentAttributes["value-format"],
                  "onUpdate:modelValue": (value) => {
                    props.modelValue[configItem.keyName] = value;
                  },
                });
              }
            })(),
          ]);
        })
      );
  },
};
