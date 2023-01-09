<script setup>
import { ref, reactive, toRef } from "vue";
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
  // state.callbackOptions = [
  //   {
  //     value: "guide",
  //     label: "Guide",
  //     children: [
  //       {
  //         value: "disciplines",
  //         label: "Disciplines",
  //         children: [
  //           {
  //             value: "consistency",
  //             label: "Consistency",
  //           },
  //           {
  //             value: "feedback",
  //             label: "Feedback",
  //           },
  //           {
  //             value: "efficiency",
  //             label: "Efficiency",
  //           },
  //           {
  //             value: "controllability",
  //             label: "Controllability",
  //           },
  //         ],
  //       },
  //       {
  //         value: "navigation",
  //         label: "Navigation",
  //         children: [
  //           {
  //             value: "side nav",
  //             label: "Side Navigation",
  //           },
  //           {
  //             value: "top nav",
  //             label: "Top Navigation",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: "resource",
  //     label: "Resource",
  //     children: [
  //       {
  //         value: "axure",
  //         label: "Axure Components",
  //       },
  //       {
  //         value: "sketch",
  //         label: "Sketch Templates",
  //       },
  //       {
  //         value: "docs",
  //         label: "Design Documentation",
  //       },
  //     ],
  //   },
  // ];
}, 1000);

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
    title: "业务系统名称",
    keyName: "organization_id",
    nestComponentName: "el-select",
    nestComponentAttributes: {
      placeholder: "请选择业务系统名称",
      width: "300px",
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
      width: "300px",
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
      width: "300px",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "range-separator": "至",
      "value-format": "YYYY-MM-DD",
    },
  },
];

const testt = (e) => {
  text.value = e;
};

const submit = () => {
  console.log(state.filter);
};

const testCallback = () => {
  state.callbackOptions = [
    // {
    //   name: "嘻嘻bbb",
    //   value: "1",
    //   Child: [
    //     {
    //       name: "icc",
    //       value: "1-1",
    //       Child: null,
    //     },
    //   ],
    // },
    // {
    //   name: "谷歌",
    //   value: "2",
    //   Child: null,
    // },
    {
      value: "guide",
      label: "Guide",
      children: [
        {
          value: "disciplines",
          label: "Disciplines",
          children: [
            {
              value: "consistency",
              label: "Consistency",
            },
            {
              value: "feedback",
              label: "Feedback",
            },
            {
              value: "efficiency",
              label: "Efficiency",
            },
            {
              value: "controllability",
              label: "Controllability",
            },
          ],
        },
        {
          value: "navigation",
          label: "Navigation",
          children: [
            {
              value: "side nav",
              label: "Side Navigation",
            },
            {
              value: "top nav",
              label: "Top Navigation",
            },
          ],
        },
      ],
    },
    {
      value: "resource",
      label: "Resource",
      children: [
        {
          value: "axure",
          label: "Axure Components",
        },
        {
          value: "sketch",
          label: "Sketch Templates",
        },
        {
          value: "docs",
          label: "Design Documentation",
        },
      ],
    },
  ];
  console.log(state.callbackOptions.length);
  console.log(filterConfig[2].nestComponentAttributes.options.length);
};
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
  <el-button @click="testCallback">测试回调数据响应</el-button>
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
