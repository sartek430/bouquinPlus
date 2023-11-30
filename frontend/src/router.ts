import * as VueRouter from "vue-router";
import Home from "./pages/Home.vue";

import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
