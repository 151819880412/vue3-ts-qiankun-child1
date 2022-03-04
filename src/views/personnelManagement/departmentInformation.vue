<template>
  <div class="contents">
    <div class="header" style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-edit" @click="toAdd">新 增</el-button>
      <div class="operationBtn" style="float: right">
        <el-tooltip class="item" effect="dark" placement="top">
          <el-button icon="el-icon-search" circle class="crudHeaderBtn"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="top">
          <el-button icon="el-icon-printer" circle class="crudHeaderBtn"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="top">
          <el-button icon="el-icon-s-operation" circle class="crudHeaderBtn"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="top">
          <el-button icon="el-icon-refresh-left" circle class="crudHeaderBtn"></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="body">

      <el-table :data="tableData" border>
        <el-table-column align="center" type="index" width="70" label="序号"></el-table-column>
        <el-table-column align="center" :resizable="true" prop="deptName" label="部门名称"></el-table-column>
        <el-table-column align="center" :resizable="true" prop="deptCode" label="部门信息ID"></el-table-column>
        <el-table-column align="center" :resizable="true" prop="useStatus" label="状态"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
      </div>

    </div>

    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
  import {
    initDeptList,
  } from "../../api/personnelManagement/departmentInformation";
  import {
    getColumn
  } from "../../api/systemManagement/systemColumnConfig";
  import {
    ApiResponse
  } from '../../@types'
  import {
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    defineComponent
  } from "vue";
  // import {
  //   Store
  // } from "vuex";
  import {
    useStore
  } from "vuex";
  // import loading from "../../store/modules/loading/state";
  // import {
  //   UserActionTypes
  // } from "../../store/modules/user/action-types";


  export default defineComponent({
    name: "",
    props: [],
    setup() {
      const store = useStore();
      console.log(store)
      // let ctx = getCurrentInstance();
      // console.log(ctx)
      // console.log('1-开始创建组件-setup')
      let page = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 0,
      });
      const state = reactive({
        tableData: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        formConfig: {},
        deptTypeIdOptions: [],
        deptPrincipalOptions: [],
        tableOptions: [],
        checkAll: {},
        isIndeterminate: {},
      })





      onBeforeMount(() => {
        // console.log('2.组件挂载页面之前执行----onBeforeMount')
      });
      onMounted(() => {
        initConfig();
        initLists();
        // console.log('3.-组件挂载到页面之后执行-------onMounted')
      });

      let initConfig = async () => {
        let res: ApiResponse = await getColumn("2_1");
        if (res.code == 20000) {
          state.deptPrincipalOptions.forEach((item: any): void => {
            item.label = item.userNameCn
            item.value = item.userId
            item.address = JSON.parse(JSON.stringify(item))
            item.code = item.userCode
            item.name = item.userNameCn
          });
          // 主页配置
          state.tableOptions = JSON.parse(JSON.stringify(res.data.checkeds))
          state.checkAll = res.data.checkAll
          state.isIndeterminate = res.data.isIndeterminate
          // 配置下拉框
          res.data.forms.forEach((item: Array < any > ): void => {
            item.forEach((item2: any) => {
              if (item2.prop == 'deptPrincipalId') {
                item2.options = state.deptPrincipalOptions
              } else if (item2.prop == 'deptTypeId') {
                // item2.options = deptTypeArr
              }
            })
          })
          state.formConfig = JSON.parse(JSON.stringify(res.data.forms))
        } else {
          // $message.error(res.message)
        }
      }

      // 初始化
      let initLists = async () => {
        // isAdd = false;
        // isEdit = false;
        // isView = false;
        // fuzzy = false;
        let data: ApiResponse = await initDeptList(page.currentPage, page.pageSize, {});
        if (data.code == 20000) {
          page.total = data.data.total;
          state.tableData = data.data.rows;
        }
      }

      const toAdd = (): void => {
        console.log(state)
      }

      const handleSizeChange = (): void => {
        console.log(state)
      }

      const handleCurrentChange = (): void => {
        console.log(state)
      }




      return {
        toAdd,
        handleSizeChange,
        handleCurrentChange,
        ...toRefs(state),
      };
    },
  });
</script>
<style scoped>
  .contents {
    background: white;
    padding: 10px;
    border-radius: 15px;
  }
</style>