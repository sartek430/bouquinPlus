import * as VueRouter from "vue-router";
import HelloWorldVue from "./components/HelloWorld.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
	{ path: "/test", name: "Test", component: HelloWorldVue },
	{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
});

export default router;
