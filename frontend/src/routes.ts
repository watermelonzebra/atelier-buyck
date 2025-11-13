import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () => import("./pages/PrivacyPolicy.vue"),
  },
  {
    path: "/cookie-policy",
    name: "CookiePolicy",
    component: () => import("./pages/CookiePolicy.vue"),
  },
  {
    path: "/legal-notice-terms-of-use",
    name: "LegalNoticeTermsOfUse",
    component: () => import("./pages/Legal.vue"),
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () => import("./pages/PrivacyPolicy.vue"),
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
  scrollBehavior: async (_to, _from, _savedPosition) => {
    return { left: 0, top: 0, behavior: 'instant' };
  },
});

router.beforeEach(() => {
  ScrollTrigger.getAll().forEach((st) => st.kill())
})

export default router;
