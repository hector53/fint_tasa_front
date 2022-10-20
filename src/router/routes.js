import store from "@/state/store";
import Cookies from 'js-cookie'
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/account/login"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        var currentUser = Cookies.get('fintCurrenUser')
        if (currentUser) {
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/pages/account/register"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/pages/account/forgot-password"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["back/loggedIn"]) {
            
          // Redirect to the home page instead
          next({ name: "home" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch("back/logout");
        // Navigate back to previous page, or home as a fallback
        next({
            path: '/login',
            query: {
               nextUrl: routeTo.fullPath,
            }
        })
      },
    },
  },
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/dashboard/index"),
  },
  {
    path: "/fs",
    name: "fs",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/fs/index"),
  },
  {
    path: "/fs2",
    name: "fs2",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/fs/fs"),
  },
  {
    path: "/derivatives/binance",
    name: "derivatives-binance",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/derivatives/binance.vue"),
  },
  {
    path: "/derivatives/ftx",
    name: "derivatives-ftx",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/derivatives/ftx.vue"),
  },
  {
    path: "/websockets",
    name: "websockets",
    meta: {
      authRequired: true,
    },
    component: () => import("../views/pages/websockets.vue"),
  },
];
