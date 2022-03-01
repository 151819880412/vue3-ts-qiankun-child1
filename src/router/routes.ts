
import { RouteRecordRaw } from 'vue-router';

import Login from '@/views/login/Login.vue';

const Layout = () => import("@/views/layout/index.vue");
const DepartmentInformation = () => import("@/views/personnelManagement/departmentInformation.vue");


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'login',
    },
  },
  {
    path: '/personnelManagement',
    name: 'PersonnelManagement',
    component: Layout,
    children: [
      {
        path: '/personnelManagement/departmentInformation',
        name: '部门信息',
        components: {
          default: DepartmentInformation,
        }
      },
    ]
  }
];
export default routes;