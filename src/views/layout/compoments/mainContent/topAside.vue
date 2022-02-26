<template>
  <!--修改密码 -->
  <div class="layoutTop">
    <i class="el-icon-s-operation showHidden" style="font-size: 20px" @click="showSiddernav"></i>
    
    <div class="userInfo">
      <div class="userInfoBox">
        <el-tooltip class="item" effect="dark" content="ping" placement="bottom"
          style="padding: 0 5px; cursor: pointer">
          <span>{{ping}}kb/s</span>
        </el-tooltip>
        <!-- 时间显示 -->
        <el-tooltip class="item" effect="dark" content="当前时间" placement="bottom"
          style="padding: 0 5px; cursor: pointer">
          <i class="el-icon-time" style="font-size: 25px; padding: 0 5px; cursor: pointer"></i>
        </el-tooltip>
        <!-- 时间 -->
        {{ showTime }}
        <el-tooltip class="item" effect="dark" content="自定义颜色" placement="bottom"
          style="padding: 0 10px; cursor: pointer">
          <!-- <i class="el-icon-s-help" style="line-height:50px"></i> -->
          <ThtmePicker />
        </el-tooltip>
        <!-- <el-tooltip class="item" effect="dark" content="系统主题" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">
            <i class="el-icon-s-help"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="错误日志" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">
            <i class="el-icon-s-help"></i>
          </el-tooltip>
          
          -->
        <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">
            <i class="el-icon-lock" @click="toLockScreen"></i>
          </el-tooltip>
        <el-tooltip class="item" effect="dark" content="错误日志" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">
          <i class="el-icon-document-delete" @click="openErrorLog"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="短消息" placement="bottom" style="font-size:30px;padding:0 10px;cursor:pointer">
          <el-badge :value="shortMessage" :max="99" class="item shortMessage" style="transform:0">
            <i class="el-icon-chat-dot-round" @click="toShortMessage"></i>
          </el-badge>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="帮助文档" placement="bottom"
          style="font-size:30px;padding:0 10px;cursor:pointer">
          <i class="el-icon-document" @click="toDocument"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"
          style="font-size: 25px; padding: 0 10px; cursor: pointer">
          <i class="el-icon-full-screen" @click="screenClick"></i>
        </el-tooltip>
        <el-dropdown trigger="click" style="
            margin-left: 2px;
            padding: 0 10px;
            cursor: pointer;
          ">
          <!-- <el-avatar :size="28" :src="avatarUrl.avatarUrl"></el-avatar> -->
          <span>{{userName}}</span>
          <el-dropdown-menu slot="dropdown" style="font-size: 22px; padding: 0 1px; cursor: pointer">
            <el-dropdown-item class="el-icon-user-solid" @click.native="toPersonalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item class="el-icon-setting" @click.native="toChangePassword">设置密码</el-dropdown-item>
            <el-dropdown-item class="el-icon-switch-button" @click.native="logOut">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 个人中心 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="personalCenter" width="30%" :close-on-click-modal="false"
      :fullscreen="isFullscreen" :before-close="beforeClose">
      <div slot="title">
        <span style="font-size: 20px">个人中心</span>
        <span style="float: right; padding-right: 40px; margin-top: 2px">
          <i class="el-dialog__close el-icon-full-screen" style="cursor: pointer" @click="handleScreen(5)"></i>
        </span>
      </div>
      <div class="personalCenter">
        <span style="margin-right: 30px">默认显示页面</span>
        <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="personalCenterSure">{{$t('public_btn_name.submit')}}</el-button>
        <el-button @click="personalCenterCancel">{{$t('public_btn_name.close')}}</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="changePassword" width="40%" :close-on-click-modal="false"
      :fullscreen="isFullscreen" :before-close="beforeClose">
      <div slot="title">
        <span style="font-size: 20px">修改密码</span>
        <span style="float: right; padding-right: 40px; margin-top: 2px">
          <i class="el-dialog__close el-icon-full-screen" style="cursor: pointer" @click="handleScreen(6)"></i>
        </span>
      </div>
      <el-form autocomplete="new-password" label-position="right" ref="changeForm" :model="changeFormData"
        :rules="changeRules" size="medium" label-width="180px" class="changePwd">
        <el-form-item class="paddingLeft" label="原密码" prop="userPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.userPwd" placeholder="请输入原密码" maxlength="18" show-password clearable
              :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newUserPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.newUserPwd" placeholder="请输入新密码" maxlength="18" clearable show-password
              :style="{ width: '100%' }" @input="changePwds"></el-input>
          </el-col>
          <el-col :span="3" style="text-align: center">{{ intensity }}</el-col>
        </el-form-item>
        <el-form-item class="paddingLeft" label="确认密码" prop="surePassword">
          <el-col :span="16">
            <el-input v-model="changeFormData.surePassword" placeholder="请输入确认新密码" maxlength="18" clearable
              show-password :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="paddingLeft" label="原签字密码" prop="userSignPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.userSignPwd" placeholder="请输入原签字密码" maxlength="18" show-password clearable
              :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新签字密码" prop="newUserSignPwd">
          <el-col :span="16">
            <el-input v-model="changeFormData.newUserSignPwd" placeholder="请输入新签字密码" maxlength="18" clearable show-password
              :style="{ width: '100%' }" @input="changePwds"></el-input>
          </el-col>
          <!-- <el-col :span="3" style="text-align: center">{{ intensity }}</el-col> -->
        </el-form-item>
        <el-form-item class="paddingLeft" label="确认签字密码" prop="userSignPwdSure">
          <el-col :span="16">
            <el-input v-model="changeFormData.userSignPwdSure" placeholder="请输入确认签字密码" maxlength="18" clearable
              show-password :style="{ width: '100%' }"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePwd">{{$t('public_btn_name.submit')}}</el-button>
        <el-button type="primary" @click="clean">清空</el-button>
        <el-button @click="changePwdCancel">{{$t('public_btn_name.close')}}</el-button>
      </span>
    </el-dialog>

    <!-- 帮助文档 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="documentBox" width="40%" custom-class="documentBox"
      :close-on-click-modal="false" :fullscreen="isFullscreen" :before-close="beforeClose" ref="documentBox">
      <div slot="title">
        <span style="font-size: 20px">帮助文档</span>
        <span style="float: right; padding-right: 40px; margin-top: 2px">
          <i class="el-dialog__close el-icon-full-screen" style="cursor: pointer" @click="handleScreen(6)"></i>
        </span>
      </div>
      <el-row>
        <el-col :span="6">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            accordion
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            @node-contextmenu="openMenu"
            @node-click="handleNodeClick">
            <span slot-scope="{ node, data }">
              <span>
                <i :class="data.icon"></i>
                <span>{{data.helpName}}</span>
              </span>
            </span>
          </el-tree>
          <ul
            v-show="visible"
            class="contextmenu"
          :style="{ left: left + 'px', top: top + 'px' }"
          >
            <li v-if="defaultTreeData.paperFile==1" @click="addFolder">新增文件夹</li>
            <li v-if="defaultTreeData.paperFile==1">
              <el-upload
                :before-upload="beforeUpload"
                ref="upload"
                accept=".xls,.xlsx,.pdf,.doc,.docx"
                class="upload-demo"
                action="/api/genuine-system/personnelInfo/upload"
                multiple
                :limit="1"
                :headers="importHeaders"
                :on-success="uploadSuccess"
                :file-list="fileList">
                <li>点击上传</li>
              </el-upload>
            </li>
            <li @click="delDoc" v-if="defaultTreeData.parentId">删除</li>
            <li @click="rename">重命名</li>
          </ul>
        </el-col>
        <el-col :span="18">
          <pdf :src="src" :page="currentPage" @progress="loadedRatio = $event" @loaded="loadPdfHandler"
            @num-pages="page.total=$event" @page-loaded="currentPage=$event" ref="wrapper" style="width:100%;height:100%">
          </pdf>
        </el-col>
      </el-row>


      <!-- <ul class="footers">
        <li :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
          <p class="more-p">放大</p>
        </li>
        <li :class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
          <p class="small-p">缩小</p>
        </li>
        <li :class="{select:idx==2}" @touchstart="idx=2" @touchend="idx=-1" @click="changePdfPage(0)">
          <p class="up-p">上一页</p>
        </li>
        <li :class="{select:idx==3}" @touchstart="idx=3" @touchend="idx=-1" @click="changePdfPage(1)">
          <p class="down-p">下一页</p>
        </li>
        <li>
          <p>当前第{{ currentPage }}页/共{{ pageCount }}页</p>
        </li>
      </ul> -->
      <span slot="footer" class="dialog-footer">
        <div class="block">
          <el-pagination :current-page="page.currentPage" :page-size="page.pageSize"  @size-change="handleSizeChange"
            @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total">
          </el-pagination>
        </div>
      </span>
    </el-dialog>

    <!-- 锁屏 -->
    <el-dialog destroy-on-close  :append-to-body="true" :visible.sync="lockScreenBox" width="40%"
      :close-on-click-modal="false" :fullscreen="isFullscreen" :before-close="lockScreenCancel">
      <div slot="title">
        <span style="font-size: 20px">锁屏</span>
        <span style="float: right; padding-right: 40px; margin-top: 2px">
          <i class="el-dialog__close el-icon-full-screen" style="cursor: pointer" @click="handleScreen(6)"></i>
        </span>
      </div>
        <el-row :span="24" style="padding:0 40px">
          <el-form autocomplete="new-password" label-position="left" ref="lockScreenForm" :model="lockScreenFormData" size="medium"  label-width="110px" :rules="lockScreenRules">
            <el-col :span="24">
              <el-form-item class="paddingLeft" label="锁屏密码" prop="lockScreenPassword">
                <el-input autocomplete="new-password" v-model="lockScreenFormData.lockScreenPassword" placeholder="请输入锁屏密码" :maxlength="20" clearable :style="{width: '100%'}"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      <span slot="footer" class="dialog-footer">
        <div class="block">
          <el-button type="primary" @click="lockScreenSure" >{{$t('public_btn_name.submit')}}</el-button>
          <el-button @click="lockScreenCancel">{{$t('public_btn_name.close')}}</el-button>
        </div>
      </span>
    </el-dialog>

    <!-- debug -->
    <el-dialog destroy-on-close  
      ref="errorLogDialog" 
      :append-to-body="true"
      :visible.sync="errorLogBox" 
      :width="dialogWidth" class="errorDialog fullScreenBox" 
      :fullscreen="isFullscreen" 
      :close-on-click-modal="false" 
      :before-close="dialogBeforeClose">
      <div slot="title">
        <span style="font-size:22px;line-height: normal;">错误日志</span>
        <span style="float:right;padding-right: 40px;margin-top:2px;line-height: normal;">
          <i class="el-dialog__close el-icon-full-screen" 
            style="cursor:pointer;font-size:26px;font-weight:700"
            @click="handleScreen"></i>
        </span>
      </div>
      <el-row :span="24">
        <el-form autocomplete="new-password" 
          label-position="left" v-model="errorlLogForm"
           ref="errorlLogForm" size="medium" label-width="120px">
          <el-col :span="11">
            <el-form-item class="paddingLeft" label="时间范围" prop="rangTime">
              <el-date-picker format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"
                v-model="errorlLogForm.rangTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col>
          <div style="float:right;margin:0 5px 5px 0">
            <el-tooltip class="item" effect="dark" :content="$t('public_btn_name.query')" placement="top">
              <el-button icon="el-icon-search" circle @click.native="searchErrorLog" class="crudHeaderBtn"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('public_btn_name.filter')" placement="top">
              <el-button icon="el-icon-refresh-left" circle @click.native="refreshErrorLog" class="crudHeaderBtn">
              </el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>

      <el-table :data="errorLogList" border >
        <el-table-column type="index" width="50" :label="$t('public_label.index')"></el-table-column>
        <el-table-column :resizable="true" prop="expInfo"  :show-overflow-tooltip='true'
          label="描述">
          <template slot-scope="scope">
            <span class="text-cotains">{{scope.row.expInfo}}</span>
          </template>  
        </el-table-column>
        <el-table-column :resizable="true" prop="createTime" label="时间"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="errorLogSizeChange" @current-change="errorLogCurrentChange"
          :current-page="errorLogPage.currentPage" :page-sizes="[10, 20, 30, 40,50,100]" :page-size="errorLogPage.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="errorLogPage.total"></el-pagination>
      </div>

      <div slot="footer">
        <el-button @click="() => { $refs['errorLogDialog'].handleClose() }">{{$t('public_btn_name.close')}}</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import pdf from "vue-pdf";
  import {
    changePwds,
    defaultDisplayPage,
    defaultDisplayPage1,
  } from "@/api/personalHomePage/individualTasks";
  import ThtmePicker from "@/components/theme-picker";
  import screenfull from "screenfull";
  import {
    updateDefaultPage
  } from "@/api/systemManagement/user";
  import {
    sidderLists,
  } from "@/api/sidderlist";
  import {
    queryDocument,
    queryAllDoc,
    editDoc,
    delDoc,
  } from "@/api/topAside/topAside";
  import {
  StrongStates, ModerateStates
} from "@/utils/regularCheck";
import {
  userBaseInfo,
} from "@/api/systemManagement/user";
  import {
    uploadObj //上传
  } from "@/api/personnelManagement/personnelInformation";
  import {
    mapState,
    mapGetters
  } from "vuex";
import bus from '@/utils/bus';

import { getErrorLog } from '@/api/sys.js';


  export default {
    props: {},
    data() {
      return {
        errorLogBox: false,
        errorLogPage: { pageSize: 10, currentPage: 1, total: 0 },
        errorLogList: [],
        errorlLogForm: {
          rangTime: "",
        },
        //===========
        validatePass1 : (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请再次输入密码"));
          } else if (value !== this.changeFormData.newUserPwd) {
            callback(new Error("新密码与确认密码不一致，请重新输入!"));
          } else {
            callback();
          }
        },
        validatePass2 : (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请再次输入签字密码"));
          } else if (value !== this.changeFormData.newUserSignPwd) {
            callback(new Error("新签字密码与确认密码不一致，请重新输入!"));
          } else {
            callback();
          }
        },
        isPageFullscreen: true, //是否全屏
        isShowSidderNav: false, //是否显示左侧导航栏
        avatarUrl: {
          avatarUrl: require("@/assets/avatar.png")
        }, // 头像
        intensity: "",
        value: [],
        options: [],
        changeFormData: {
          userPwd: "",
          newUserPwd: "",
          surePassword: "",
          userSignPwd: "",
          newUserSignPwd: "",
          userSignPwdSure: "",
        },
        personalCenter: false, //个人中心
        changePassword: false, //修改密码
        isFullscreen: false, //是否全屏
        changeType: "", //是否修改密码
        showTime: "", // 时间显示
        documentBox: false, //帮助文档
        currentPage: 1, // 当前页码
        pageCount: 0, // 总页码
        scale: 100,
        idx: -1,
        loadedRatio: 0,
        pdfsrc: "",
        numPages: "",
        src: '',
        page: {
          pageSize: 1,
          total: 1,
          currentPage: 1, //当前页
        },
        lockScreenBox:false,//锁屏
        lockScreenFormData:{
          lockScreenPassword:null
        },
        lockScreenRules: {
          lockScreenPassword: [{
            required: true,
            message: '请输入锁屏密码',
            trigger: 'blur'
          }],
        },
        passwordPolicyArr:[],
        top: 0,
        left: 0,
        treeData: [{
          label: '帮助文档',
          value:1,
          icon:"el-icon-folder-opened",
          id:1,
          children:[],
          // children: [{
          //   label: '二级 1-1',
          //   icon:"el-icon-folder-opened",
          //   value:2,
          //   children: [{
          //     label: '三级 1-1-1'
          //     icon:'el-icon-tickets'
          //   }]
          // }]
        },],
        defaultTreeData:[],
        defaultExpandedKeys:[0],
        defaultProps: {
          children: 'children',
          label: 'helpName'
        },
        visible:false,
        num:0,
        fileList:[],
        importHeaders:{
          Authorization:localStorage.getItem('token'),
          refreshToken:localStorage.getItem('refreshToken'),
        },
        ping:0,
        shortMessage:0,

      };
    },
    computed: {
      ...mapState({
        userName: (state) => state.user.userName,
        dialogWidth: (state) => state.dialogWidths.dialogWidth,
      }),
      changeRules : {
        get(){
          let changeRules = {
            userPwd:[
              {
                required: true,
                message: '请输入原密码',
                trigger: "blur",
              },
            ],
            newUserPwd: [
              {
                required: true,
                // validator: this.validatePass1,
                message:"请输入新密码",
                trigger: "blur",
              },
              {
                message: `密码中密码最小长度为${this.passwordPolicyArr.minLength}
                ${this.passwordPolicyArr.upperCaseLength == 0 ? '' : ',大写英文长度至少为' + this.passwordPolicyArr.upperCaseLength}
                ${this.passwordPolicyArr.lowerCaseLength == 0 ? '' : ',小写英文长度至少为' + this.passwordPolicyArr.lowerCaseLength}
                ${this.passwordPolicyArr.numberLength == 0 ? '' : ',数字长度长度至少为' + this.passwordPolicyArr.numberLength}
                ${this.passwordPolicyArr.specialLength == 0 ? '' : ',特殊字符长度至少为' + this.passwordPolicyArr.specialLength}
                `,
              },
            ],
            surePassword: [
              {
                required: true,
                validator: this.validatePass1,
                trigger: "blur",
              },
            ],
            userSignPwd:[
              {
                required: true,
                message: '请输入原签字密码',
                trigger: "blur",
              },
            ],
            newUserSignPwd: [
              {
                required: true,
                message:"请输入新签字密码",
                trigger: "blur",
              },
              {
                message: `密码中密码最小长度为${this.passwordPolicyArr.minLength}
                ${this.passwordPolicyArr.upperCaseLength == 0 ? '' : ',大写英文长度至少为' + this.passwordPolicyArr.upperCaseLength}
                ${this.passwordPolicyArr.lowerCaseLength == 0 ? '' : ',小写英文长度至少为' + this.passwordPolicyArr.lowerCaseLength}
                ${this.passwordPolicyArr.numberLength == 0 ? '' : ',数字长度长度至少为' + this.passwordPolicyArr.numberLength}
                ${this.passwordPolicyArr.specialLength == 0 ? '' : ',特殊字符长度至少为' + this.passwordPolicyArr.specialLength}
                `,
              },
            ],
            userSignPwdSure: [
              {
                required: true,
                validator: this.validatePass2,
                trigger: "blur",
              },
            ],
          }
          return changeRules
        }

      }
    },
    created() {},
    mounted() {
      bus.$on('ping', (data) => {
        this.ping = data;
      });
      bus.$on('shortMessage', (data) => {
        this.shortMessage = data;
      });
      bus.$on('showTime', (data) => {
        this.showTime = data;
      });
      this.initErrorLog();
    },
    watch: {
      visible(value) {
        if (value) {
          document.body.addEventListener("click", this.closeMenu);
        } else {
          document.body.removeEventListener("click", this.closeMenu);
        }
      }
    },
    methods: {
      async initErrorLog() {
        const { currentPage, pageSize } = this.errorLogPage;
        const { rangTime } = this.errorlLogForm;
        let params = {};
        if(Array.isArray(rangTime)) {
          params.startTime = rangTime[0]
          params.endTime = rangTime[1]
        }
        let res = await getErrorLog(currentPage, pageSize, {
          ...params,
        })
        if(res.code !== 20000) {
          this.$message.error(res.message);
          return;
        }
        const { rows, total } = res.data;
        this.errorLogPage.total = total;
        this.errorLogList = rows;
      },
      errorLogCurrentChange(val) { //仓库分页
        this.errorLogPage.currentPage = val;
        this.initErrorLog();
      },
      errorLogSizeChange(val) {//物料页码
        this.errorLogPage.pageSize = val;
        this.initErrorLog();
      },
      searchErrorLog() {
        this.errorLogPage.currentPage = 1;
        this.initErrorLog();
      },
      refreshErrorLog() {
        this.errorLogPage.currentPage = 1;
        this.errorlLogForm = { ...this.$options.data().errorlLogForm }
        this.initErrorLog();
      },
      dialogBeforeClose() {
        this.errorLogPage = {...this.$options.data().errorLogPage}
        this.errorlLogForm = { ...this.$options.data().errorlLogForm }
        if(this.$refs['errorlLogForm']) {
          this.$refs['errorlLogForm'].resetFields();
        }
        this.errorLogBox = false;
        this.isFullscreen = false;
      },
      async openErrorLog() { // 打开错误日志
        this.errorLogBox = true;
        await this.initErrorLog(); //获取日志列表
        
      },

      closeMenu() {
        this.visible = false;
      },

      // 左键点击
      handleNodeClick(data) {
        this.defaultTreeData = data
        this.visible = false
        console.log(data);
        if(data.paperFile==0){
          this.getPdfCode(data.id)
        }
      },

      // 右键
      openMenu(event,data,node){
        let documentBox = document.getElementsByClassName('documentBox')
        this.defaultTreeData = data
        this.visible = true
        console.log(event,data,node,documentBox)
        this.left = event.clientX - documentBox[0].offsetLeft
        this.top =  event.target.offsetTop
      },

      // 新增文件夹
      addFolder(){
        this.$prompt('请输入文件夹名称', '新增文件夹', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          inputValidator:(value)=>{
            if (value == undefined) {
              return '文件夹不能为空'
            } else if (value.length == 0) {
              return '文件夹不能为空'
            }
          },
        }).then(({ value }) => {
          let obj = JSON.parse(JSON.stringify(this.defaultTreeData))
          obj.parentId = obj.id
          obj.id = null
          this.addChildren(value,obj)
          this.treeData = JSON.parse(JSON.stringify(this.treeData))
          this.defaultExpandedKeys = [this.defaultTreeData.id]
        }).catch((error) => {
          console.log(error)
        });
      },

      // 删除
      async delDoc(){
        let res = await delDoc(this.defaultTreeData)
        if(res.code==20000){
          this.$message.success(res.message)
          let data = await queryAllDoc(localStorage.getItem('tenantId'))
          if(data.code==20000){
            this.treeData = data.data
          }
        }else{
          this.$message.error(res.message)
        }
      },

      // 重命名
      rename(){
        this.$prompt('请输入名称', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          inputValidator:(value)=>{
            if (value == undefined) {
              return '名称不能为空'
            } else if (value.length == 0) {
              return '名称不能为空'
            }
          },
        }).then(({ value }) => {
          this.addChildren(value,this.defaultTreeData)
          this.treeData = JSON.parse(JSON.stringify(this.treeData))
          this.defaultExpandedKeys = [this.defaultTreeData.id]
        }).catch((error) => {
          console.log(error)
        });
      },

      // 上传文件
      uploadSuccess(a,b,c){
        console.log(a,b,c)
      },
      // 上传之前
      beforeUpload(file) {
        const timeStamp = new Date() - 0;
        const copyFile = new File([file], `${file.name}`);
        this.uploadFile(copyFile);
        return false;
      },
      uploadFile(file) {
        const formdata = new FormData();
        formdata.append("files", file);
        this.postForm(formdata);
      },
      async postForm(formdata) {
        let data = await uploadObj(formdata);
        if (data.data[0] == "程序错误，请重新上传") {
          this.$message.error("程序错误，请重新上传");
        } else {

          this.$refs.upload.submit();
          let obj = JSON.parse(JSON.stringify(this.defaultTreeData))
          obj.paperFile = 0
          obj.parentId = obj.id
          obj.id = null
          obj.helpUrl = data.data[1]
          this.addChildren(data.data[2],obj)
        }
      },

      // 提交文件夹
      async addChildren(value,obj){
        obj.helpName = value
        let data = await editDoc(obj)
        if(data.code==20000){
          let data = await queryAllDoc(localStorage.getItem('tenantId'))
          if(data.code==20000){
            this.treeData = data.data
          }
        }
      },

      //获取密码策略的基础数据
      async getPassword() {
        let tenantId = localStorage.getItem("tenantId");
        let a = parseInt(tenantId);
        if (a == null) {
        } else {
          let data = await userBaseInfo(a);
          if (data.data == null) {
          } else {
            this.passwordPolicyArr = data.data
            let RE=`^(?=(.*[a-z]){${this.passwordPolicyArr.lowerCaseLength},})(?=(.*[A-Z]){${this.passwordPolicyArr.upperCaseLength},})(?=(.*\\d){${this.passwordPolicyArr.numberLength},})(?=(.*[\\u002D\\u005C\\u005D\\u0060\\u007D\\u0029\\u0028\\u005B\\u007B!@#$%^&*()+_=|:;<>,.?/~]){${this.passwordPolicyArr.specialLength},})[\\u002D\\u005C\\u005D\\u0060\\u007D\\u0029\\u0028\\u005B\\u007BA-Za-z\\d!@#$%^&*()+_=|:;<>,.?/~]{${this.passwordPolicyArr.minLength},}`
            this.changeRules['newUserPwd'][1]['pattern']= new RegExp(RE)
            this.changeRules['newUserPwd'][1]['message'] = `密码中密码最小长度为${this.passwordPolicyArr.minLength}
            ${this.passwordPolicyArr.upperCaseLength == 0 ? '' : ',大写英文长度至少为' + this.passwordPolicyArr.upperCaseLength}
            ${this.passwordPolicyArr.lowerCaseLength == 0 ? '' : ',小写英文长度至少为' + this.passwordPolicyArr.lowerCaseLength}
            ${this.passwordPolicyArr.numberLength == 0 ? '' : ',数字长度长度至少为' + this.passwordPolicyArr.numberLength}
            ${this.passwordPolicyArr.specialLength == 0 ? '' : ',特殊字符长度至少为' + this.passwordPolicyArr.specialLength}`
            this.changeRules['newUserSignPwd'][1]['pattern']= new RegExp(RE)
            this.changeRules['newUserSignPwd'][1]['message'] = `密码中密码最小长度为${this.passwordPolicyArr.minLength}
            ${this.passwordPolicyArr.upperCaseLength == 0 ? '' : ',大写英文长度至少为' + this.passwordPolicyArr.upperCaseLength}
            ${this.passwordPolicyArr.lowerCaseLength == 0 ? '' : ',小写英文长度至少为' + this.passwordPolicyArr.lowerCaseLength}
            ${this.passwordPolicyArr.numberLength == 0 ? '' : ',数字长度长度至少为' + this.passwordPolicyArr.numberLength}
            ${this.passwordPolicyArr.specialLength == 0 ? '' : ',特殊字符长度至少为' + this.passwordPolicyArr.specialLength}`
          }
          setTimeout(()=>{
            this.clean()
          })
        }
      },
      showSiddernav() {
        this.isShowSidderNav = !this.isShowSidderNav;
        this.$store.dispatch("showHidden", this.isShowSidderNav);
      },

      // 关闭前回调
      beforeClose() {
      this.$confirm("是否确认关闭", "提示", {
          confirmButtonText: "关闭",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.cleanAddForm();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭",
          });
        });
      },

      // 清空
      cleanAddForm() {
        this.lockScreenBox = false
        this.currentPage = 1
        this.page = {
          pageSize:1,
          total:1,
          currentPage:1
        }

        this.documentBox = false
        this.value = "";
        this.src = "";
        this.isFullscreen = false
        this.personalCenter = false;
        if (this.$refs["changeForm"]) {
          this.$refs["changeForm"].resetFields();
        }
        this.changePassword = false;
      },

      // dialog全屏
      handleScreen(index) {
        this.isFullscreen = !this.isFullscreen;
      },

      handleSizeChange(val) {
        
        this.currentPage = val
        this.page.currentPage = val
      },

      handleCurrentChange(val) {
        
        this.currentPage = val
        this.page.currentPage = val
      },

      // 锁屏
      toLockScreen(){
        this.lockScreenBox = true
      },

      // 锁屏提交
      lockScreenSure(){
        this.$refs["lockScreenForm"].validate(async (valid) => {
          if (valid) {
            this.$store.dispatch('setLockScreenPwd',this.lockScreenFormData.lockScreenPassword)
            this.$refs["lockScreenForm"].resetFields();
            this.lockScreenBox = false
          }
        })
      },

      // 锁屏关闭
      lockScreenCancel(){
        this.lockScreenFormData.lockScreenPassword = null
        this.lockScreenBox = false
      },

      // 帮助
      async toDocument() {
        this.documentBox = true
        let data = await queryAllDoc(localStorage.getItem('tenantId'))
        if(data.code==20000){
          this.treeData = data.data
        }
        // this.getPdfCode();
      },
      // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      // changePdfPage(val) {
      //   if (val === 0 && this.currentPage > 1) {
      //     this.currentPage--;
      //   }
      //   if (val === 1 && this.currentPage < this.pageCount) {
      //     this.currentPage++;
      //   }
      // },
      // goBack() {
      //   this.$router.go(-1);
      // },

      // //放大
      // scaleD() {
      //   this.scale += 5;
      //   this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
      // },
      // //缩小
      // scaleX() {
      //   if (this.scale == 100) {
      //     return;
      //   }
      //   this.scale += -5;
      //   this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
      // },

      // // pdf加载时
      loadPdfHandler(e) {
        this.currentPage = 1; // 加载的时候先加载第一页
      },
      // 初始化获取pdf文件
      async getPdfCode(id) {
        let data = await queryDocument(id);
        this.src = this.getObjectURL(data);
        // let src = window.URL.createObjectURL(data)
        // this.pdfsrc = pdf.createLoadingTask(src)
        // this.pdfsrc.promise.then(pdf => {
        //   this.numPages = pdf.numPages
        // }).catch(() => {})
      },

      // 将返回的流数据转换为url
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          try {
            url = window.webkitURL.createObjectURL(file);
          } catch (error) {}
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          try {
            url = window.URL.createObjectURL(file);
          } catch (error) {}
        }
        return url;
      },

      // 全屏
      screenClick() {
        if (!screenfull.enabled) {
          this.$message({
            message: "you browser can not work",
            type: "warning",
          });
          return false;
        }
        screenfull.toggle();
        this.isPageFullscreen = screenfull.isFullscreen;
      },
      // 个人中心显示
      async toPersonalCenter() {
        let res = await sidderLists(localStorage.getItem("userId"));
        if (res.code == 20000) {
          this.options = res.data
        }
        this.personalCenter = true;
      },
      // 默认显示页面选择
      handleChange(value) {},
      // 个人中心确定
      async personalCenterSure() {

        // let data = await defaultDisplayPage()
        if (this.value.length == 0) {
          this.$message.error('请选择一级模块信息')
        } else {
          let obj = {
            userId: localStorage.getItem("userId"),
            defaultPage: this.value[this.value.length - 1]
          }
          let data = await updateDefaultPage(obj)
          if (data.code == 20000) {
            this.$message.success(data.message)
          } else {
            this.$message.error(data.message)
          }
          this.cleanAddForm();
        }
      },
      // 清空
      clean() {
        this.$refs["changeForm"].resetFields();
        this.intensity = "";
      },
      // 修改密码
      async changePwd() {
        this.$refs["changeForm"].validate(async (valid) => {
          if (valid) {
            let userId = localStorage.getItem("userId");
            let obj = {
              userPwd: this.changeFormData.userPwd,
              newUserPwd: this.changeFormData.newUserPwd,
              userSignPwd  : this.changeFormData.userSignPwd,
              newUserSignPwd  : this.changeFormData.newUserSignPwd,
              userId: userId,
              tenantId: localStorage.getItem("tenantId"),
              forbidStatus:1,
              isPwdType :20004,
            };
            let data = await changePwds(obj);

            if (data.code == 20000 && data.message == "成功") {
              this.$message.success("修改成功");
              let refreshToken = localStorage.getItem("refreshToken");
              let data = await defaultDisplayPage1(refreshToken);
              localStorage.removeItem("token");
              this.$router.replace("/login");
              this.cleanAddForm();
            } else {
              this.$message.error(data.message);
            }
          }
        });
      },
      // 修改密码关闭
      changePwdCancel() {
        this.beforeClose();
      },
      // 个人中心关闭
      personalCenterCancel() {
        this.beforeClose();
      },
      // 修改密码
      toChangePassword() {
        this.changePassword = true;
        this.getPassword()
      },

      // 设置密码
      changePwds(data) {
        if (
          StrongStates(data)
        ) {
          this.intensity = "强";
        } else if (
          ModerateStates(data)
        ) {
          this.intensity = "中";
        } else {
          this.intensity = "弱";
        }
      },

      // 退出
      logOut() {
        this.$confirm("确定退出系统?", "退出", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(async () => {
            let refreshToken = localStorage.getItem("refreshToken");
            try {
              let data = await defaultDisplayPage1(refreshToken);
              this.disConnects()
            } catch (error) {
              console.log(error)  
            }
            localStorage.removeItem("token");
            this.$router.replace("/login");
            this.$message({
              type: "success",
              message: "退出成功!",
            });
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              type: "info",
              message: "已取消退出",
            });
          });
      },

      // 短消息
      toShortMessage(){
        // this.$store.dispatch("addTabCard", {
        //   name: "/personalHomePage/shortMessage",
        //   label: "短消息"
        // });
        // this.$store.dispatch('addMenuCard', "/personalHomePage/shortMessage");
        this.$router.replace("/personalHomePage/shortMessage");
      }

    },
    components: {
      ThtmePicker,
      pdf,
    },
  };

</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .layoutTop {
    border-bottom: 1px solid #e5e5e5;
    padding: 0 20px 0 10px;
    height: 50px;
    line-height: 50px;
    // position: fixed;
    left: 202px;
    top: 0;
    right: 0;
    background: #fff;
    z-index: 1000;
    transition: 0.25s;
    text-align: center;

    .showHidden {
      float: left;
      line-height: 50px;
      cursor: pointer;
    }

    .userInfo {
      float: right;
      height: 50px;

      .userInfoBox {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  >>>.personalCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  >>>.isFullScreen {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    overflow: auto;
    border-radius: 0 !important;
  }

  // >>>.documentBox{
  //   // height:80%;
  //   // margin-top:10vh !important;
  //   // margin-bottom:0 !important;
  //   // top:0
  // }
  // >>>.documentBox .el-dialog__body{  
  //   width:100% !important;
  //   height:100% !important;
  //   // display:flex;
  // }
  >>>.documentBox .el-dialog__body span {
    display:flex !important;
    justify-content center;
    align-items center
  }

  >>>.documentBox .el-dialog__body span canvas {
    width: 80% !important;
    height: 80% !important;
  }

  // >>>.documentBox .el-dialog__body span span {
  //   width: 100% !important;
  //   height: 80% !important;
  // }
  >>>.changePwd .el-form-item{
    margin-bottom:42px  !important;
  }
  // 右键
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    width: 100px;
    text-align:center;
    line-height: 40px;
    li {
      margin: 0;
      /*padding: 7px 16px;*/
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
  >>>.shortMessage .el-badge__content{
    transform:translateY(0) translateX(50%)
  }

</style>
