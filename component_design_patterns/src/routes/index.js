import Vue from "vue";
import VueRouter from "vue-router";
import Common from "../views/Common.vue";
import Slot from "../views/Slot.vue";
import Controlled from "../views/Controlled.vue";
import Renderless from "../views/Renderless.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/common",
    },
    {
      path: "/common",
      name: "common",
      component: Common,
    },
    {
      path: "/slot",
      name: "slot",
      component: Slot,
    },
    {
      path: "/controlled",
      name: "controlled",
      component: Controlled,
    },
    {
      path: "/renderless",
      name: "renderless",
      component: Renderless,
    },
  ],
});
