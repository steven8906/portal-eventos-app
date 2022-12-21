import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import store from "@/store";
import AssistanceConfirmView from "@/views/AssistanceConfirmView";
import InvitationView from "@/views/InvitationView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/invitaciones/:id',
    name: 'invitations',
    component: InvitationView,
    props: true
  },
  {
    path: '/confirmar-asistencia/:id',
    name: 'assistance-confirm',
    component: AssistanceConfirmView,
    props:true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass:"active-link"
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'assistance-confirm' && Object.keys(store.state.userLogin).length === 0) next({ name: 'login' })
  else next()
  next()
})
export default router
