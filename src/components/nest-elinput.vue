<template>
  <vnode v-if="props.text"></vnode>
  <vnode v-else></vnode>
</template>

<script setup>
import { h, computed } from "vue";
import { ElInput } from "element-plus";
const props = defineProps(["text", "syncText"]);
const emit = defineEmits(["syncText", "update:sync-text"]);
const newText = computed({
  get: () => props.text,
  set: (value) => {
    emit("syncText", value);
  },
});

const newSyncText = computed({
  get: () => props.syncText,
  set: (value) => {
    emit("update:sync-text", value);
  },
});
const vnode = () =>
  h("div", {}, [
    h(ElInput, {
      modelValue: props.text ? newText.value : newSyncText.value,
      "onUpdate:modelValue": (value) => {
        props.text ? (newText.value = value) : (newSyncText.value = value);
      },
    }),
  ]);
</script>

<style lang="scss" scoped></style>
