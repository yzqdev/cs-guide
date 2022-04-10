<template>
  <div>
    <div v-for="item in arr1.list" :key="item">
      {{ item }}
    </div>
    <el-button @click="change1">change1</el-button>
    <hr />
    <div v-for="item in arr2" :key="item">
      {{ item }}
    </div>

    <el-button @click="change2">change2</el-button>
    <hr />
    <div>
      <el-form
        ref="formRef"
        :model="form"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item prop="email" label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item prop="name" label="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button type="warning" @click="clearForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
let arr1 = reactive({
  list: [],
});
//一般这样使用
let state = reactive({
  form: {
    name: "yzq",
    email: "1@qq.com",
  },
  num: 45,
});
let { form, num } = toRefs(state);
let arr2 = ref([]);
function change1() {
  console.log("change...");
  let newArr = [1, 2, 3];
  arr1.list = newArr;
}
function change2() {
  console.log("change...");
  let newArr = [1, 2, 3];
  arr2.value = newArr;
}
function submitForm() {
  state.form = { name: "anderson", email: "bill@outlook.com" };
  state.num = 99;
}
function clearForm() {
  form.value = {
    name: "yzq",
    email: "1@qq.com",
  };
  num.value = 45;
}
</script>
