<template>
  <div class="sidebar-compon">
    <div>
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#eee"
        active-text-color="#4dbcff"
        :default-active="TabsNow.path"
        :unique-opened="true"
        class="el-menu-vertical-demo"
      >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
      </el-menu>
    </div>
  </div>
</template> 

<script>
  import {
    toRaw
  } from 'vue'
  import DynamicMenu from "@/components/dynamicMenu";
  // import {mapState, mapGetters} from "vuex";
  export default {
    data() {
      return {
        activeShow: "",
        isCollapse: false,
        sidebarMenu: [],
        TabsNow:''
      };
    },
    computed: {
    },
    methods: {
   
    },
    components: {
      DynamicMenu,
    },
    created(){

    },
    mounted() {
          this.sidebarMenu = toRaw(JSON.parse(localStorage.getItem('getRoutesLists')))
    },
    watch: {
    },
  };
</script>
<style lang="stylus">
.el-menu-vertical-demo{
  width:100% !important
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .sidebar-compon{
    width:200px;
    .img-box{
      width: 100%;
      padding: 10px 5px;
      box-sizing: border-box !important;
      .menu-logo {
        width:100%;
      }
    }
   
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar {
    -ms-overflow-style: none;
  }
  
  .sidebar {
    overflow: -moz-scrollbars-none;
  }


</style>
