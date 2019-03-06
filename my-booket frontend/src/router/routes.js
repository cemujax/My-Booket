import Home from "@/views/Home";
import Login from "@/views/Login";
import Signup from "@/views/Signup";
import BookInfo from "@/views/BookInfo";
import Booket from "@/views/Booket";
import Contacts from "@/views/Contacts";
import NotFound from "@/views/NotFound";
import store from "../store";

const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  store.getters.isAuth ? next() : next(loginPath);
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/book/:id",
    name: "book",
    component: BookInfo
  },
  {
    path: "/booket",
    name: "booket",
    component: Booket,
    beforeEnter: requireAuth
  },
  {
    path: "/contacts",
    name: "contacts",
    component: Contacts
  },
  {
    path: "*",
    component: NotFound
  }
];

export default routes;
