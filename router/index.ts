import { createRouter, createWebHistory } from "vue-router";
import Login from "../src/components/Login.vue";


const routes = [
  {
    path: "/login",
    name: "Login",

    component: Login,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard for authentication

router.beforeEach((to, from, next) => {
  // Implement authentication logic here
});

export default router;
