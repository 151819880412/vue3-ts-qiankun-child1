<template>
  <el-row :span="24" :style="outBoxStyle">

    <el-form label-position="left" ref="forms" :model="formConfig" size="medium" :rules="formConfig.rules"
      @submit.native.prevent :validate-on-rule-change="false">

      <div v-for="(item) in formConfig.formDataConfig" :label="item" :key="item.configId">

        <el-col :span="item.span" :offset="item.offset" v-if="item.display||!item.prop">
          <el-col :span="24">
            <el-form-item :label="item.prop=='formTitle'?'':item.label" :prop="item.prop"
              :class="{ 'paddingLeft': !item.required&&item.prop!='firstRule', 'icon': item.prop=='firstRule' }"
              :label-width="item.labelWidth+'px'">

              <!-- 输入框，密码，多行 -->
              <el-input v-model="formConfig[item.prop]" :type="item.type" :placeholder="item.placeholder"
                autocomplete="new-password" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                :maxlength="item.maxlength" :show-password="item.type==='password'"
                :if-password="item.type==='password'?true:false" :clearable="item.clearable" :disabled="item.disabled"
                :show-word-limit="item.showWordLimit" :style="{width: '100%'}" :autosize="{minRows: 4, maxRows: 4}"
                v-if="item.type=='text'||item.type=='textarea'||item.type=='password'">
                <template slot="append" v-if="item.appendText">{{item.appendText}}</template>
              </el-input>

              <!-- 下拉框 -->
              <!-- <el-select v-model="formConfig[item.prop]" :type="item.type" :placeholder="item.placeholder" :clearable="item.clearable"
                @[item.fnType]="eventFn(item,formConfig[item.prop])" :disabled="item.disabled"
                :style="{width: '100%'}" v-if="item.type==='select'&&item.type!=='daterange'&&item.type!=='title'&&item.type!=='text'">
                <el-option v-for="(item, index) in item.options" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select> -->

              <!-- 下拉搜索  eventFn(item,formConfig[item.prop]) -->
              <el-select v-model="formConfig[item.prop]" type="select" :placeholder="item.placeholder"
                :clearable="item.clearable" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                @visible-change="eventFn(item,$event,'visible')" :style="{width: '100%'}"
                v-if="item.type==='selectQuery'" filterable remote reserve-keyword
                :filter-method="(val) => { dataFilter(val, item) }" :disabled="item.disabled">
                <el-option v-for="(item2) in item.options" :key="item2.value" :label="item2.label" :value="item2.value"
                  :disabled="item2.disabled">
                  <template :slot-scope=" item2 ">
                    <!-- <span style="float: left">{{ item2.code?item2.code:item2.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{  item2.name }}</span> -->
                    <span style="float: left">{{ item2.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{  item2.code }}</span>
                  </template>
                </el-option>
              </el-select>

              <!-- 下拉搜索-多选 -->
              <el-select v-model="formConfig[item.prop]" type="select" :placeholder="item.placeholder" multiple
                :clearable="item.clearable" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                :style="{width: '100%'}" v-if="item.type==='selectQuerys'" filterable remote
                :filter-method="(val) => { dataFilter(val, item) }" @visible-change="eventFn(item,$event,'visible')"
                :disabled="item.disabled">
                <el-option v-for="(item2) in item.options" :key="item2.value" :label="item2.label" :value="item2.value"
                  :disabled="item2.disabled">
                  <template :slot-scope=" item2 ">
                    <!-- <span style="float: left">{{ item2.code?item2.code:item2.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{  item2.name }}</span> -->
                    <span style="float: left">{{ item2.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{  item2.code }}</span>
                  </template>
                </el-option>
              </el-select>

              <!-- 级联选择器 -->
              <el-cascader v-model="formConfig[item.prop]" :options="item.options" :placeholder="item.placeholder"
                :clearable="item.clearable" :disabled="item.disabled"
                v-if="item.type==='cascader'&&item.type!=='daterange'&&item.type!=='title'" :style="{width: '100%'}"
                @[item.fnType]="eventFn(item,formConfig[item.prop])" @visible-change="eventFn(item,$event,'visible')"
                v-on:change="clears(formConfig[item.prop],item)" :props="{expandTrigger: 'click', value: 'label' }"
                ref="cascader">
              </el-cascader>

              <!-- 单选框 -->
              <el-radio-group v-model.number="formConfig[item.prop]" :type="item.type" size="medium"
                :clearable="item.clearable" :disabled="item.disabled"
                v-if="item.type==='radio'&&item.type!=='daterange'&&item.type!=='title'"
                @[item.fnType]="eventFn(item,formConfig[item.prop])">
                <el-radio v-for="(item, index) in item.options" :key="index" :label="item.value"
                  :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>

              <!-- 多选框组 -->
              <el-checkbox-group v-model="formConfig[item.prop]" :type="item.type" size="medium"
                :clearable="item.clearable" :disabled="item.disabled" v-if="item.type==='checkbox'"
                @[item.fnType]="eventFn(item,formConfig[item.prop])">
                <el-checkbox v-for="(item, index) in item.options" :key="index" :label="item.value"
                  :disabled="item.disabled">{{item.label}}</el-checkbox>
              </el-checkbox-group>

              <!-- 日期选择 -->
              <el-date-picker v-model="formConfig[item.prop]" :type="item.type" :placeholder="item.placeholder"
                :format="item.format" :value-format="item.format" :disabled="item.disabled"
                :picker-options="validatorObj[item.validator]"
                v-if="(item.type==='date'||item.type==='month')&&item.type!=='daterange'&&item.type!=='title'"
                :style="{width: '100%'}" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                :clearable="item.clearable"></el-date-picker>

              <!-- 日期时间 -->
              <el-date-picker v-model="formConfig[item.prop]" :type="item.type" :placeholder="item.placeholder"
                :format="item.format" :value-format="item.format" :disabled="item.disabled"
                :picker-options="validatorObj[item.validator]" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                v-if="item.type==='datetime'&&item.type!=='daterange'&&item.type!=='title'" :style="{width: '100%'}"
                :clearable="item.clearable"></el-date-picker>

              <!-- 日期范围 -->
              <el-date-picker v-model="formConfig[item.prop]" :type="item.type" :format="item.format"
                :picker-options="validatorObj[item.validator]" :value-format="item.format" :style="{width: '100%'}"
                start-placeholder="开始日期" :disabled="item.disabled" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                end-placeholder="结束日期" range-separator="至" :clearable="item.clearable"
                v-if="item.type==='datetimerange'"></el-date-picker>

              <!-- 计数器 -->
              <el-input-number v-model.number="formConfig[item.prop]" v-if="item.type==='number'"
                :clearable="item.clearable" :disabled="item.disabled" :min="0" :max="9" :placeholder="item.placeholder"
                :step='1'></el-input-number>

              <!-- 开关 -->
              <el-switch v-model="formConfig[item.prop]" v-if="item.type==='switch'" :disabled="item.disabled"
                :clearable="item.clearable" @[item.fnType]="eventFn(item,formConfig[item.prop])"></el-switch>

              <!-- 滑块 -->
              <el-slider :max='24' :step='1' v-model="formConfig[item.prop]" :clearable="item.clearable"
                v-if="item.type==='slider'&&item.type!=='rate'" :disabled="item.disabled" :marks="{12:''}"
                @[item.fnType]="eventFn(item,formConfig[item.prop])"></el-slider>

              <!-- 时间选择 -->
              <el-time-picker v-model="formConfig[item.prop]" :format="item.format" :value-format="item.format"
                :disabled="item.disabled" :picker-options='{"selectableRange":"00:00:00-23:59:59"}'
                :style="{width: '100%'}" v-if="item.type==='time'" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                :placeholder="item.placeholder" :clearable="item.clearable"></el-time-picker>

              <!-- 时间范围 -->
              <el-time-picker v-model="formConfig[item.prop]" is-range :format="item.format" :value-format="item.format"
                :disabled="item.disabled" :style="{width: '100%'}" start-placeholder="开始时间" end-placeholder="结束时间"
                range-separator="至" v-if="item.type==='times'" @[item.fnType]="eventFn(item,formConfig[item.prop])"
                :clearable="item.clearable"></el-time-picker>

              <!-- 评分 -->
              <el-rate v-model="formConfig[item.prop]" :max='5' v-if="item.type==='rate'" :disabled="item.disabled"
                :clearable="item.clearable" @[item.fnType]="eventFn(item,formConfig[item.prop])"></el-rate>

              <!-- 颜色选择 -->
              <el-color-picker v-model="formConfig[item.prop]" size="medium" v-if="item.type==='colorPicker'"
                :clearable="item.clearable" :disabled="item.disabled"
                @[item.fnType]="eventFn(item,formConfig[item.prop])"></el-color-picker>

              <el-table :data="formConfig[item.prop]" border style="width: 100%" ref="tables"
                v-if="item.type==='table'">
                <el-table-column align="center" fixed="left" type="index" :label="$t('public_label.index')" width="70">
                </el-table-column>
                <el-table-column align="center" v-for="(item, index) in item.tableColumn" :key="`col_${index}`"
                  :prop="item.value" :label="item.label">
                  <template slot-scope="scope">
                    <span>{{scope.row[item.value]}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <el-col :span="24" v-if="item.type=='span'"
                style="width:calc(100% + 120px);margin-left:-60px;height:40px;background:#E8F2F2;padding-left:40px;margin-bottom:22px">
                <span style="font-size:22px;line-height:40px">{{item.label}}</span>
              </el-col>

            </el-form-item>

          </el-col>
        </el-col>
      </div>

    </el-form>

  </el-row>

</template>
<script>
import { defineComponent} from 'vue'

  import {
    mapState,
    mapGetters
  } from "vuex";
  // import {
  //   querySelect,
  // } from "@/api/systemManagement/systemColumnConfig";

  export default defineComponent({
    inheritAttrs: false,
    components: {},
    props: {
      formConfig: {

      },
      validatorObj: {
        default: function () {
          return {}
        }
      },
      outBoxStyle: {
        type: Object,
        default: () => ({
          padding: '0 40px'
        })
      }
    },
    data() {
      return {
        isFullscreen: false,
      }
    },
    computed: {
      ...mapState({
        activeIndex: (state) => state.pageConfig.activeIndex,
        formConfigs: (state) => state.formConfig.formConfig,
        formType: (state) => state.formConfig.formType,
      }),
    },
    watch: {
      formType: {
        handler(newData, oldData) {
          this.formConfig.rules = {}
          if (this.formConfigs) {
            this.formConfigs.forEach((item, index) => {
              if (this.formConfig[item.prop] == null) {
                if (item.type == 'selectQuerys' || item.type == "checkbox") {
                  this.$set(this.formConfig, [item.prop], [])
                  this.$set(item, 'optionsCopy', JSON.parse(JSON.stringify(item.options)))
                } else if (item.type == 'selectQuery') {
                  this.$set(this.formConfig, [item.prop], null)
                  this.$set(item, 'optionsCopy', JSON.parse(JSON.stringify(item.options)))
                } else {
                  this.$set(this.formConfig, [item.prop], null)
                }
              }
              if (item.defaultValue) {
                if (item.defaultValue * 1 >= 0) {
                  this.$set(this.formConfig, item.prop, item.defaultValue * 1)
                } else {
                  this.$set(this.formConfig, item.prop, item.defaultValue)
                }
              }
              if (item.pattern) {
                item.pattern = eval(item.pattern)
              }
              if (item.required) {
                if (item.validator) {
                  Object.keys(this.validatorObj).forEach((item2, index2) => {
                    if (item.validator == item2) {
                      this.formConfig.rules[item.prop] = [{
                        required: true,
                        validator: this.validatorObj[item2],
                        trigger: item.trigger
                      }]
                    }
                  })
                } else if (item.pattern) {
                  this.formConfig.rules[item.prop] = [{
                      required: true,
                      message: item.label ? "请输入" + item.label : item.placeholder,
                      trigger: item.trigger
                    },
                    {
                      pattern: item.pattern,
                      message: "请输入合法" + item.label,
                      trigger: "blur",
                    },
                  ]
                } else {
                  this.formConfig.rules[item.prop] = [{
                    required: true,
                    message: item.label ? ((item.type == 'text' || item.type == 'textarea' || item.type ==
                          'password') ?
                        '请输入' : ((item.type == 'select' || item.type == "cascader" || item.type ==
                          "datetimerange" ||
                          item.type == "selectQuery" || item.type == "selectQuerys" || item.type == "date" ||
                          item.type == "checkbox") ? '请选择' : '')) +
                      item.label : item.placeholder,
                    trigger: item.trigger
                  }]
                }
              } else if (item.pattern) {
                this.formConfig.rules[item.prop] = [{
                    required: false,
                    message: item.label ? "请输入" + item.label : item.placeholder,
                    trigger: item.trigger
                  },
                  {
                    pattern: item.pattern,
                    message: "请输入合法" + item.label,
                    trigger: "blur",
                  },
                ]
              } else if (item.validator) {
                Object.keys(this.validatorObj).forEach((item2, index2) => {
                  if (item.validator == item2) {
                    this.formConfig.rules[item.prop] = [{
                      required: false,
                      validator: this.validatorObj[item2],
                      trigger: item.trigger
                    }]
                  }
                })
              }
            })
            setTimeout(() => {
              this.$set(this.formConfig, 'formDataConfig', JSON.parse(JSON.stringify(this.formConfigs)))
            })
          }
        },
        immediate: true,
        deep: true
      },
      formConfig(newData, oldData) {
        if (JSON.stringify(newData) == "{}") {
          this.$store.dispatch('setFormConfig', null)
        }
      }
    },
    created() {
      this.init()
    },
    beforeDestroy() {
      this.$store.dispatch('setFormConfig', null)
    },
    mounted() {},
    methods: {
      resetOptions(item) {
        this.$nextTick(() => {
          setTimeout(() => {
            item.options = JSON.parse(JSON.stringify(item.optionsCopy))
          }, 200)
        })
      },
      async dataFilter(val, item) {
        if (item.requestUrl) {
          let obj = {}
          if (item.queryCondition) {
            item.queryCondition.split(',').forEach((item, index) => {
              obj[item.split(':')[0]] = item.split(':')[1]
            })
          }
          obj[item.requestCode] = val
          // let data = await querySelect(item.requestUrl, obj);
          // if (data.code == 20000) {
          //   try {
          //     if (Array.isArray(data.data.rows)) {
          //       data.data.rows.forEach((item2, index2) => {
          //         item2.label = item2[item.selectLable]
          //         item2.value = item2[item.selectValue]
          //         item2.code = item2[item.selectCode]
          //         item2.address = JSON.parse(JSON.stringify(item2))
          //       })
          //       item.options = JSON.parse(JSON.stringify(data.data.rows))
          //     }
          //   } catch (error) {
          //     console.log(error)
          //   }
          // }
        } else {
          if (Array.isArray(item.options)) {
            item.optionsCopy.forEach(item3 => {
              if (item3.code && item3.label && item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.code.indexOf(val) !== -1 || item2.label
                  .indexOf(val) !== -1 || item2.name.indexOf(val) !== -1)
              } else if (item3.code && item3.label && !item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.code.indexOf(val) !== -1 || item2.label
                  .indexOf(val) !== -1)
              } else if (item3.code && !item3.label && item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.code.indexOf(val) !== -1 || item2.name
                  .indexOf(val) !== -1)
              } else if (!item3.code && item3.label && item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.label.indexOf(val) !== -1 || item2.name
                  .indexOf(val) !== -1)
              } else if (item3.code && !item3.label && !item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.code.indexOf(val) !== -1)
              } else if (!item3.code && item3.label && !item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.label.indexOf(val) !== -1)
              } else if (!item3.code && item3.label && item3.name) {
                item.options = item.optionsCopy.filter(item2 => item2.name.indexOf(val) !== -1)
              }
            })
          }
        }
      },
      init() {
        this.formConfig.rules = {}
        if (this.formConfigs) {
          this.formConfigs.forEach((item, index) => {
            if (this.formConfig[item.prop] == null) {
              if (item.type == 'selectQuerys' || item.type == "checkbox") {
                this.$set(this.formConfig, [item.prop], [])
                this.$set(item, 'optionsCopy', JSON.parse(JSON.stringify(item.options)))
              } else if (item.type == 'selectQuery') {
                this.$set(this.formConfig, [item.prop], null)
                this.$set(item, 'optionsCopy', JSON.parse(JSON.stringify(item.options)))
              } else {
                this.$set(this.formConfig, [item.prop], null)
              }
            }
            if (item.defaultValue) {
              if (item.defaultValue * 1 >= 0) {
                this.$set(this.formConfig, item.prop, item.defaultValue * 1)
              } else {
                this.$set(this.formConfig, item.prop, item.defaultValue)
              }
            }
            if (item.pattern) {
              item.pattern = eval(item.pattern)
            }
            if (item.required) {
              if (item.validator) {
                Object.keys(this.validatorObj).forEach((item2, index2) => {
                  if (item.validator == item2) {
                    this.formConfig.rules[item.prop] = [{
                      required: true,
                      validator: this.validatorObj[item2],
                      trigger: item.trigger
                    }]
                  }
                })
              } else if (item.pattern) {
                this.formConfig.rules[item.prop] = [{
                    required: true,
                    message: item.label ? "请输入" + item.label : item.placeholder,
                    trigger: item.trigger
                  },
                  {
                    pattern: item.pattern,
                    message: "请输入合法" + item.label,
                    trigger: "blur",
                  },
                ]
              } else {
                this.formConfig.rules[item.prop] = [{
                  required: true,
                  message: item.label ? ((item.type == 'text' || item.type == 'textarea' || item.type ==
                        'password') ?
                      '请输入' : ((item.type == 'select' || item.type == "cascader" || item.type ==
                        "datetimerange" ||
                        item.type == "selectQuery" || item.type == "selectQuerys" || item.type == "date" ||
                        item.type == "checkbox") ? '请选择' : '')) +
                    item.label : item.placeholder,
                  trigger: item.trigger
                }]
              }
            } else if (item.pattern) {
              this.formConfig.rules[item.prop] = [{
                  required: false,
                  message: item.label ? "请输入" + item.label : item.placeholder,
                  trigger: item.trigger
                },
                {
                  pattern: item.pattern,
                  message: "请输入合法" + item.label,
                  trigger: "blur",
                },
              ]
            } else if (item.validator) {
              Object.keys(this.validatorObj).forEach((item2, index2) => {
                if (item.validator == item2) {
                  this.formConfig.rules[item.prop] = [{
                    required: false,
                    validator: this.validatorObj[item2],
                    trigger: item.trigger
                  }]
                }
              })
            }
          })
          this.$set(this.formConfig, 'formDataConfig', this.formConfigs)
        }
      },

      // 提交
      submit() {
        return this.$refs['forms'].validate
      },

      validateField(field) {
        this.$refs['forms'].validateField(field)
      },

      clearValidate() {
        this.$refs['forms'].clearValidate()
      },

      // 清空
      cleanForm() {
        try {
          if (this.$refs['forms']) {
            this.$refs['forms'].resetFields()
          }
          setTimeout(() => {
            if (this.$refs['forms']) {
              this.$refs['forms'].resetFields()
            }
          })
        } catch (error) {}
      },

      clears(val, row) {
        if (val && val.length == 0) {
          // 清空级联选择器选中状态
          this.$refs.cascader[0].$refs.panel.clearCheckedNodes()
          // 清除高亮
          this.$refs.cascader[0].$refs.panel.activePath = []
        }
      },
      // 下拉框事件
      eventFn(row, prop, type) {
        this.$emit("sonEventFn", {
          type: type,
          prop: prop,
          activeIndex: this.activeIndex,
          fnType: row.fnType,
          fnName: row.fnName,
          row: row,
        })
        if (prop == true && !row.requestUrl) {
          if (Array.isArray(row.options)) {
            row.optionsCopy = JSON.parse(JSON.stringify(row.options))
          }
        }
        if (type == 'visible' && !row.requestUrl) {
          this.resetOptions(row)
        }
        if (prop == true && row.requestUrl) {
          this.dataFilter("", row)
        }
      },

      formatter(option) {
        // if (typeof option == "object") {
        //   for (var o in option) {
        //     var opt = option[o];
        //     if (typeof opt == "string"&&opt =='validator') {
        //       if (opt.indexOf("function") != -1) {
        //         var fmt = eval("(" + `` + ")");
        //         option[o] = fmt;
        //       }
        //     }
        //     this.formatter(opt);
        //   }
        // }
        var fmt = eval("(" + `async (rule, value, callback) => {
          if (!value) {
              return callback(new Error("部门编号不能为空"));
            } else {
              if (this.isAdd) {
                let data = await haveObj(value);
                if (data.data != 0) {
                  callback(new Error("部门编号重复"));
                }
              }
              callback()
            }
            callback()
          }` + ")");
        return fmt
      }

    }
  })

</script>
<style lang="stylus" scoped>
  .icon>>>.el-form-item__label::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }

</style>
