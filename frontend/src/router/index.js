import Vue from "vue";
import VueRouter from "vue-router";
import RequesterPage from "../pages/RequesterPage.vue";
import ValidatorPage from "../pages/ValidatorPage.vue";
import { useUserStore } from "../store/user";
import { getActivePinia } from "pinia";
import App from "../App.vue";

Vue.use(VueRouter);


const routes = [
  {
    path: "/",
    redirect: "/",
    component: App,
  },
  {
    path: "/requester",
    name: "Requester",
    component: RequesterPage,
  },
  {
    path: "/validator",
    name: "Validator",
    component: ValidatorPage,
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!getActivePinia()) {
    return next();
  }
  const userStore = useUserStore();
  
  if (from.path === "/requester" && to.path === "/requester" && userStore.currentUser.role !== "Requester") {
    next("/validator");
  } else if (from.path === "/validator" && to.path === "/validator" && userStore.currentUser.role !== "Validator") {
    next("/requester");
  } else {
    next();
  }
});

export default router;