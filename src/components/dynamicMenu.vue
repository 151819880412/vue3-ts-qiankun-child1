<template>
  <div class="menu-container">
    <template v-for="v in menuList">
      <el-submenu :index="v.resourcePath" v-if="v.children && v.children.length > 0" :key="v.resourceId">
        <template #title>
          <i style="font-size: 20px; padding: 0 8px" class="iconfont" :class="v.meta.icon"></i>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :key="v.resourceId" :index="v.resourcePath" @click="gotoRoute(v.resourceName, v.meta.name)" v-else>
        <i style="font-size: 20px; padding: 0 8px" class="iconfont" :class="v.meta.icon"></i>
        <span>{{ v.meta.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">

  export default {
    name: 'my-nav',
    props: {
      menuList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        isSidderVal: true
      };
    },
    methods: {
      gotoRoute(name, title) {
        console.log(name, title)
      }
    },
    mounted() {},
    computed: {

    },
    watch: {}
  };
</script>

<style lang='stylus'>
  .el-menu--collapse {
    width: 100%;
    height: 100%
  }

  .el-menu--collapse .el-submenu__title span {
    display: none;
  }

  /* 隐藏 > */
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>