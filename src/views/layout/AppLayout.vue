<!-- src\layout\AppLayout.vue -->
<template>
  <el-container>
    <el-aside width="200px"> Aside </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
        <Loading></Loading>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import loginServiceImpl from "@/api/login/index";
import Loading from "./components/Loading/Loading.vue"; 
// components: {
//   Loading
// }, 
console.log(
  loginServiceImpl.login({
    languageState: 0,
    tenantId: "3",
    userAccount: "qwe",
    userPwd: "Nxuw/RYqlx4uqyyI9qSljA==",
  })
);
</script>

<style scoped lang="stylus">
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #B3C0D1;
}
.el-aside {
  width: auto;
  background-color: #304156;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
