import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Settings from '../views/Settings.vue'
import Menu from '../views/Menu.vue'
import Date from '../views/Date.vue'
import Dishes from '../views/Dishes.vue'
import Dish from '../views/Dish.vue'
import EditDish from '../views/EditDish.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Signup from '../views/Signup.vue'
import store from '../store/index.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    name: "Index"
  },
  {
    path: '/signup',
    component: Signup,
    name: "Signup"
  },
  {
    path: '/settings',
    component: Settings,
    name: "Settings"
  },
  {
    path: '/menu',
    component: Menu,
    name: "Menu"
  },
  {
    path: "/date/:date/",
    component: Date,
    name: "Date",
    children: [
      {
        path: "add",
        component: Dishes,
        name: "DateDishes"
      },
      {
        path: "add/:dishId",
        component: Dish,
        name: "DateDish"
      },
      {
        path: "add/:dishId/edit",
        component: EditDish,
        name: "DateAddEditDish"
      },
      {
        path: "edit/:dishId",
        component: EditDish,
        name: "DateEditDish"
      }
    ]
  },
  {
    path: "/dishes",
    component: Dishes,
    name: "Dishes"
  },
  {
    path: "/dishes/:dishId",
    component: Dish,
    name: "Dish"
  },
  {
    path: "/dishes/:dishId/edit",
    component: EditDish,
    name: "EditDish"
  },
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/404",
    component: NotFound,
    name: "404"
  },
  {
    path: "*",
    redirect: "/404"
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (!store.state.user && !["Login", "Index", "Signup"].includes(to.name)) next({ name: 'Login' })
  else if (store.state.user && ["Login", "Index", "Signup"].includes(to.name)) next({ name: "Menu" })
  else next()
})

export default router