import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from "vue-router";
import AppLayout from "@/views/AppLayout.vue";
import useTokenStore from "@/stores/mytoken.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("@/views/login/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/views/IndexVue.vue"),
        },
        {
          path: "/:xxx(.*)*",
          name: "ErrorPage",
          component: () => import("@/views/ErrorPage.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  from = from as RouteLocationNormalized;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const store = useTokenStore();
    if (!store.token.access_token) {
      next({ path: "/login", query: { redirect: to.fullPath } });
      return;
    }
  }
  next();
});
export default router;
