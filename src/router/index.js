import { createWebHistory, createRouter } from "vue-router";
import Main from "@/views/Main.vue";
const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect:'/home',
    children:[
      {
        path:"/home",
        name:'home',
        component:()=>import("../views/home"),
      },
      {
        path:"/search",
        name:'search',
        component:()=>import("../views/search"),
      },
      {
        path:"/newsDetail",
        name:'newsDetail',
        component:()=>import("../views/newsDetail"),
      },
      {
        path:"/keyword",
        name:'keyword',
        component:()=>import("../views/keyword"),
      }

    ]
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;