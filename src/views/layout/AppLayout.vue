<!-- src\layout\AppLayout.vue -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" style="width: 200px">
        <SidebarMenu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import SidebarMenu from "@/compoments/Sidebar/SidebarMenu.vue";
// import {  getCurrentInstance } from "vue";
// import loginServiceImpl from '../../api/login/index'
import Loading from "./components/Loading/Loading.vue";

// 定义了全局方法之后需要扩充类型
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $loading: any;
  }
}
export default {
  name: "Applayout",
  props: [],
  setup() {
    // let { proxy } = getCurrentInstance()!;
    // 调用插件方法
    // loginServiceImpl.queryRoleMenuList()
    // proxy!.$loading.showLoading();
    return {};
  },
  components: {
    Loading,
    SidebarMenu,
  },
};
</script>

<style scoped lang="stylus">
.el-container
  height: 100vh
.el-header
  background-color: #B3C0D1
.el-aside
  width: auto
  background-color: #304156
.el-main
  background-color: #E9EEF3
</style>
