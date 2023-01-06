<template>
  <vnode></vnode>
  <!-- <div v-for="item in props.config">
    <template v-if="item.type === 'el-input'">
      <el-input v-model="newText" placeholder="Please input" />
    </template>
    <template v-if="item.type === 'el-input'">
      <el-select
        v-model="item.keyName"
        :placeholder="item.placeholder"
        :style="`width: ${item.width}`"
        :filterable="item.filterable"
      >
        <el-option
          v-for="(o, index) in o.options"
          :key="'options' + index"
          :label="o.name"
          :value="o.value"
        >
        </el-option>
      </el-select>
    </template>
  </div> -->
</template>

<script setup>
import { h, ref, computed } from "vue";
import { ElInput, ElOption, ElSelect } from "element-plus";
const props = defineProps({
  config: { type: Object, default: () => {} },
  modelValue: { type: Object, default: () => {} },
});
const emit = defineEmits(["update:modelValue"]);
const newFilter = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
  },
});

console.log(newFilter.value);
console.log(props.config);
const vnode = () =>
  h(
    "div",
    { class: "test" },
    // [
    //   h(ElInput, {
    //     modelValue: newFilter.value.keyName,
    //     "onUpdate:modelValue": (value) => {
    //       newFilter.value.keyName = value;
    //     },
    //   }),
    // ]
    props.config.map((configItem) => {
      if (configItem.type === "el-input") {
        h(ElInput, {
          modelValue: newFilter.value.keyName,
          "onUpdate:modelValue": (value) => {
            newFilter.value.keyName = value;
          },
        });
      } else if (configItem.type === "el-select") {
        h(ElSelect, {
          modelValue: newFilter.value.keyName,
          "onUpdate:modelValue": (value) => {
            newFilter.value.keyName = value;
          },
        });
      }
    })
  );

console.log(vnode());
</script>

<style lang="scss" scoped></style>
