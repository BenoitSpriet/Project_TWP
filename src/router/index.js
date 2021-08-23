import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";
import CreateCategory from "../views/CreateCategory.vue";
import EditPost from "../views/EditPost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create_post/:id",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/create_category",
    name: "CreateCategory",
    component: CreateCategory,
  },
  {
    path: "/edit_post/:id",
    name: "EditPost",
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
