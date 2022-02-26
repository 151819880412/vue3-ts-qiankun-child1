import axios from '../axios'
const BASE = '/api'

import { defHttp } from '@/utils/http/index';


export const iniLogin = (obj:object) => axios({
  method: 'POST',
  url: BASE + '/genuine-system/auth/token/get',
  headers: {
    'Content-Type': 'application/json'
  }, 
  data:JSON.stringify(obj) 
})

export const iniLogin2 = (data: object) => defHttp.post<object>({ url:'/genuine-system/auth/token/get', data });

export const querySystemResource = (type:number) => axios({
  method: 'GET',
  url: BASE + `/genuine-system/sysrescfg/cfg/${type}`,
  headers: {
    'Content-Type': 'application/json'
  }, 
})

// 获取租户
export const queryTenant = (currentPage:number,pageSIze:number,data:object) => axios({
  method: 'POST',
  url: BASE + `/genuine-system/systemTenant/${currentPage}/${pageSIze}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(data)
})

export const roleMenuLists = (userid:string) => axios({
  method: 'GET',
  url: BASE + `/genuine-system/systemResource/queryResourceByUserId/` + userid,
  headers: {
      'Content-Type': 'application/json'
  },
  // params:{userId : userid}
})