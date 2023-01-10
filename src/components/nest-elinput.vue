<template>
  <div class="box">
    <vnode></vnode>
  </div>
</template>

<script setup>
import { h } from "vue";
import { ElInput } from "element-plus";
const props = defineProps(["syncText"]);
const emit = defineEmits(["update:syncText"]);
const vnode = () =>
  h("div", {}, [
    h(ElInput, {
      modelValue: props["syncText"],
      "onUpdate:modelValue": (value) => {
        emit("update:syncText", value);
      },
    }),
  ]);
</script>

<style scoped>
.box {
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
