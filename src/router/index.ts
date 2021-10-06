import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import List from "../views/List.vue";
import CatPage from "../views/CatPage.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "List",
    component: List,
  },
  {
    path: "/cat-:id",
    name: "CatPage",
    component: CatPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
