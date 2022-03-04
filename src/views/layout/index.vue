<template>
  <div class="layout">
    <SidebarNav class="sidebar" :class="{ sidebarSlide: isShowSidder == true }" />
    <MainContent :class="{ mainSlide: isShowSidder == true }" />
  </div>
</template>
<script lang="ts">
  import MainContent from "./compoments/mainContent/mainContent.vue";
  import SidebarNav from "./compoments/sidebarNav.vue";

  export default {
    data() {
      return {
        isShowSidder: false
      };
    },
    mounted() {},
    components: {
      SidebarNav,
      MainContent,
    },
    computed: {},
    watch: {}
  };
</script>
<style lang="stylus" scoped>
  .layout {
    height: 100%;
    z-index: 101;
  }

  .sidebar {
    height: 100%;
    background: #ccc;
    -webkit-transition: all 0.25s;
    transition: all 0.25s;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    z-index: 100;
    overflow-x: hidden;
  }

  .sidebarSlide {
    width: 77px;
  }

  .mainSlide {
    margin-left: 77px;
  }
</style>