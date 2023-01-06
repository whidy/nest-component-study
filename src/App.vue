<script setup>
import { ref, reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import nestElInputVue from "./components/nest-elinput.vue";
import nestElInput from "./components/nest-elinput";
import nest from "./components/nest";
import nestVue from "./components/nest.vue";
const text = ref("hello world");
const syncText = ref("sync");
const state = reactive({
  filter: {
    title: "hello world",
    organization_id: 1,
  },
  option: [
    {
      label: "嘻嘻",
      value: 1,
    },
    {
      label: "谷歌",
      value: 2,
    },
  ],
  option2: [],
});

setTimeout(() => {
  state.option2 = [
    {
      label: "嘻嘻",
      value: 1,
    },
    {
      label: "谷歌",
      value: 2,
    },
  ];
}, 1000);

const filterConfig = [
  {
    title: "业务系统名称",
    keyName: "title",
    placeholder: "请输入名称",
    type: "el-input",
  },
  {
    title: "业务系统名称",
    keyName: "organization_id",
    placeholder: "请选择业务系统名称",
    type: "el-select",
    width: "300px",
    filterable: true,
    options: state.option,
  },
];

const testt = (e) => {
  text.value = e;
};

const submit = () => {
  console.log(state.filter);
}
</script>

<template>
  <!-- <div>nest - el - input - js</div>
  <nestElInput :text="text" @sync-text="testt"></nestElInput> -->
  <!-- <div>nest - el - input - vue</div>
  <nestElInputVue :text="text" @sync-text="testt"></nestElInputVue>
  <nestElInputVue v-model:sync-text="syncText"></nestElInputVue>
  <div>{{ text }}</div> -->

  <!-- <nestVue :config="filterConfig" v-model="state.filter"></nestVue> -->
  <nest :config="filterConfig" v-model="state.filter"></nest>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <el-button @click="submit">submit</el-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
