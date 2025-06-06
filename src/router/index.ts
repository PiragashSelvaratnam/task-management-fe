import { createRouter, createWebHistory } from "vue-router";
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskDetail from "../components/TaskDetail.vue";
const Login = () => import('@/components/Login.vue');


const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true }
  },

{
    path: '/tasks',

    name: 'Tasks',

    component: TaskList,

    meta: { requiresAuth: true }

  },

  {

    path: '/tasks/create',

    name: 'CreateTask',

    component: TaskForm,

    meta: { requiresAuth: true }

  },

  {

    path: '/tasks/:id',

    name: 'TaskDetail',

    component: TaskDetail,

    meta: { requiresAuth: true }

  },

  {

    path: '/tasks/:id/edit',

    name: 'EditTask',

    component: TaskForm,

    meta: { requiresAuth: true }

  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for authentication

router.beforeEach((to, from, next) => {
const isAuthenticated = false;
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()

});

export default router;
