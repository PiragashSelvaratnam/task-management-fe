import { createRouter, createWebHistory } from "vue-router";
import Login from "../src/components/Login.vue";
import TaskList from "../src/components/TaskList.vue";
import TaskForm from "../src/components/TaskForm.vue";
import TaskDetail from "../src/components/TaskDetail.vue";
import { useAuthStore } from "../src/store/authStore";


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
  // Implement authentication logic here

  if (to.meta.requiresAuth) {
    next();
    return;
  }

  const authUserStore = useAuthStore();
  let isLoggedIn = Object.values(authUserStore.getUser).length;

  if (to.meta.guest && !isLoggedIn) {
    next();
    return;
  }
  
  if (isLoggedIn && to.meta.guest) {
    next("/");
    return;
  }

});

export default router;
