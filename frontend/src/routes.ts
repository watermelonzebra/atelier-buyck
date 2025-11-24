import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { usePosts } from "./composables/usePosts";
import { usePageSeo } from "./composables/usePageSeo";

const Index = () => import("./pages/Index.vue");
const PrivacyPolicy = () => import("./pages/PrivacyPolicy.vue");
const CookiePolicy = () => import("./pages/CookiePolicy.vue");
const Legal = () => import("./pages/Legal.vue");
const Details = () => import("./pages/Details.vue");
const Projects = () => import("./pages/Projects.vue");
const Contact = () => import("./pages/Contact.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/cookie-policy",
    name: "CookiePolicy",
    component: CookiePolicy,
  },
  {
    path: "/legal-notice-terms-of-use",
    name: "LegalNoticeTermsOfUse",
    component: Legal,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },

  {
    path: "/projects/:slug",
    name: "Details",
    component: Details,
    props: true,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: async (_to, _from, _savedPosition) => {
    return { left: 0, top: 0, behavior: "instant" };
  },
});

const pagesToFetchPosts = ["Index", "Projects", "Details"];
const pagesToFetchPageSeo = ["Index", "Projects", "Contact"];
router.beforeEach(async (to) => {
  if (pagesToFetchPosts.includes(to.name as string)) {
    const { getAllPosts } = usePosts();
    await getAllPosts();
  }

  if (pagesToFetchPageSeo.includes(to.name as string)) {
    const { getAllPageSeo } = usePageSeo();
    await getAllPageSeo();
  }
  ScrollTrigger.getAll().forEach((st) => st.kill());
});

export default router;
