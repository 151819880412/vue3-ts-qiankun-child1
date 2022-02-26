// 系统设置
import { AxiosPromise } from 'axios';
import axios from '../axios'
const BASE = '/api'

// 初始化
export const getColumn = (moduleCode:string):AxiosPromise => axios({
  method: 'GET',
  url: BASE + `/genuine-system/syscfg/cfg/${moduleCode}`,
  headers: {
    'Content-Type': 'application/json'
  },
  
})
 
export const querySelect = (url:string,data:object):AxiosPromise => axios({
  method: 'POST',
  url: BASE + url,
  headers: {
    'Content-Type': 'application/json'
  },
  data:JSON.stringify(data)
})