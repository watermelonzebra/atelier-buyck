import { nextTick } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/projects/:slug",
    name: "Details",
    component: () => import("./pages/Details.vue"),
    props: true,
  },
  {
    path: "/projects",
    name: 'Projects',
    component: () => import("./pages/Projects.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("./pages/Contact.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: async (to, _from, _savedPosition) => {
    if (to.name === "Details")
      return { left: 0, top: 0, behavior: 'instant' };

    if (to.hash) {
      await nextTick(() => {
        console.log('scroll')
        return {
          el: to.hash,
          behavior: to.hash === '#contact' ? 'instant' : 'smooth',
          top: 50,
        };
      });

    }

    // Return saved position for main page if available
    if (_savedPosition && to.name === "Index") {
      return {
        ..._savedPosition,
        behavior: 'instant'
      };
    }

    // Default to top of page
    return { top: 0 };
  },
});

export default router;
