// 部门信息
import { AxiosPromise } from 'axios';
import axios  from '../axios'
const BASE = '/api'

// 初始化
export const initDeptList = (currentPage:number,pageSize:number,data:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/deptInfo/${currentPage}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(data)
})


export const initList2 = (pageNum:number,pageSize:number,data:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/personnelInfo/${pageNum}/${pageSize}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(data)
})


// 新增
export const addDeptInfo = (addObj:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/deptInfo/add`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(addObj)
})

// 删除
export const delDeptInfo = (obj:object):AxiosPromise => axios({
  method: 'delete',
  url: BASE + `/genuine-system/deptInfo`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(obj)
})

// 查询部门信息
export const queryDeptInfoById = (deptInformationId:string):AxiosPromise => axios({
  method: 'GET',
  url: BASE + `/genuine-system/deptInfo/${deptInformationId}`,
  headers: {
    'Content-Type': 'application/json'
  },
})

// 修改
export const editDeptInfo = (editObj:object):AxiosPromise => axios({
  method: 'PUT',
  url: BASE + `/genuine-system/deptInfo/modify`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(editObj)
})

// 导出
export const exportDeptInfo = (type:number,exportData:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/deptInfo/deriveExcelOrPdf/${type}`,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'blob', // 服务器返回的数据类型
  data:JSON.stringify(exportData)
})


// 判断部门编号是否存在
export const haveObj = (deptCode:string):AxiosPromise => axios({
  method: 'GET',
  url: BASE + `/genuine-system/deptInfo/findByDeptCode`,
  headers: {
    'Content-Type': 'application/json'
  },
  params:{deptCode}
})

// 判断部门名称是否存在
export const haveDeptName = (deptName:string):AxiosPromise => axios({
  method: 'GET',
  url: BASE + `/genuine-system/deptInfo/findByDeptName`,
  headers: {
    'Content-Type': 'application/json'
  },
  params:{deptName}
})



// 启用禁用
export const editDeptState = (editObj:object):AxiosPromise => axios({
  method: 'PUT',
  url: BASE + `/genuine-system/deptInfo/updateStatus`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(editObj)
})

// 审核
export const auditState = (obj:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/deptInfo/operatesign`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(obj)
})

// 查看下拉框
export const querySelect = (types:number):AxiosPromise => axios({
  method: 'POST',
  url: BASE + `/genuine-system/sysDic/getDic?types=11`,
  headers: {
    'Content-Type': 'application/json'
  },
  params:{types}
})