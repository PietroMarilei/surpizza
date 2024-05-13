import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Load from "@/components/Load.vue";
import Random from "@/components/Random.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Load,
  },
  {
    path: "/home",
    component: Random,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
