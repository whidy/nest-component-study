<script setup>
import { ref, reactive, toRef, onBeforeMount } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import nestElInputVue from "./components/nest-elinput.vue";
import nestElInput from "./components/nest-elinput";
import nest from "./components/nest";
import nestVue from "./components/nest.vue";

const filterInitDataLoaded = ref(false);
const text = ref("hello world");
const syncText = ref("sync");
const state = reactive({
  filter: {
    title: "hello world",
    organization_id: "",
    service_version: "",
  },
  option: [
    {
      label: "嘻嘻",
      value: "1",
    },
    {
      label: "谷歌",
      value: "2",
    },
  ],
  callbackOptions: [],
});

const testt = (e) => {
  text.value = e;
};

const changeData = (val) => {
  console.log("changeData", val);
  state.option = [
    {
      label: "bbbbbb",
      value: "1",
    },
    {
      label: "xxxxxx",
      value: "2",
    },
  ];
};

const filterInitData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await getOrgList();
      console.log(filterConfig);
      resolve(true);
    } catch (error) {
      ElMessage.error("初始化高级搜索数据失败");
      reject(false);
      new Error("初始化高级搜索数据失败");
    }
  });
};

const getOrgList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state.callbackOptions = [
        {
          name: "嘻嘻aaa",
          id: "1",
          Child: [
            {
              name: "icc",
              id: "1-1",
              Child: null,
            },
          ],
        },
        {
          name: "谷歌",
          id: "2",
          Child: null,
        },
      ];
      resolve();
    }, 1000);
  });
};

const submit = () => {
  console.log(state.filter);
};

const testUpdateNest = () => {
  state.callbackOptions = [
    {
      name: "嘻嘻bbb",
      value: "1",
      Child: [
        {
          name: "icc",
          value: "1-1",
          Child: null,
        },
      ],
    },
    {
      name: "谷歌",
      value: "2",
      Child: null,
    },
  ];
  // console.log(state.callbackOptions.length);
  // console.log(filterConfig[2].nestComponentAttributes.options.length);
};

const filterConfig = [
  {
    title: "业务系统名称",
    keyName: "title",
    nestComponentName: "el-input",
    nestComponentAttributes: {
      placeholder: "请输入名称",
    },
  },
  {
    title: "组织",
    keyName: "organization_id",
    nestComponentName: "el-select",
    nestComponentAttributes: {
      placeholder: "请选择业务系统名称",
      style: "width: 300px;",
      filterable: true,
      options: toRef(state, "option"),
    },
  },
  {
    title: "所属业务系统",
    keyName: "service_version",
    nestComponentName: "el-cascader",
    nestComponentAttributes: {
      placeholder: "请输入关键字进行模糊搜索",
      style: "width: 300px;",
      filterable: true,
      props: {
        expandTrigger: "hover",
        label: "name",
        value: "id",
        emitPath: false,
        children: "Child",
      },
      clearable: true,
      "collapse-tags": true,
      options: toRef(state, "callbackOptions"),
      onChange: changeData,
      slot: { tagName: "span", attributes: {}, children: "" },
      // slots: [
      //   {
      //     slotName: "default",
      //     slotData: {},
      //     slotContent: { tagName: "span", attributes: {}, children: "" },
      //   },
      // ],
    },
  },
  {
    title: "调用时间",
    keyName: "time",
    nestComponentName: "el-date-picker",
    nestComponentAttributes: {
      type: "daterange",
      style: "width: 300px;",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "range-separator": "至",
      "value-format": "YYYY-MM-DD",
    },
  },
];

onBeforeMount(() => {
  filterInitData().then((res) => {
    filterInitDataLoaded.value = res;
  });
});
</script>

<template>
  <!-- <div>nest - el - input - js</div>
  <nestElInput :text="text" @sync-text="testt"></nestElInput> -->
  <!-- <div>nest - el - input - vue</div>
  <nestElInputVue :text="text" @sync-text="testt"></nestElInputVue>
  <nestElInputVue v-model:sync-text="syncText"></nestElInputVue>
  <div>{{ text }}</div> -->

  <!-- <nestVue :config="filterConfig" v-model="state.filter"></nestVue> -->
  <nest
    v-if="filterInitDataLoaded"
    :config="filterConfig"
    v-model="state.filter"
  ></nest>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <el-button @click="testUpdateNest">测试回调数据响应</el-button>
  <div>
    <el-button @click="submit">submit</el-button>
    {{ JSON.stringify(state.filter) }}
  </div>
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
