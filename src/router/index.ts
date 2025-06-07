import { createRouter, createWebHistory } from "vue-router";
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskDetail from "../components/TaskDetail.vue";
import { useAuthStore } from "../store/authStore";
const Login = () => import("@/page/Login.vue");
const Register = () => import("@/page/Register.vue");

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: TaskList,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: TaskList,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/create",
    name: "CreateTask",
    component: TaskForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/:id",
    name: "TaskDetail",
    component: TaskDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/:id/edit",
    name: "EditTask",
    component: TaskForm,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for authentication

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().getAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
