import { createRouter, createWebHistory } from 'vue-router'
import DefaultTemplate from '@/templates/DefaultTemplate.vue'
import BlankTemplate from '@/templates/BlankTemplate.vue'
import AuthTemplate from '@/templates/AuthTemplate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      template: DefaultTemplate,
      protected: false,
    }
  },
  {
    path: '/info',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      template: DefaultTemplate,
      protected: false,
    }
  },
  {
    path: '/como-doar',
    name: 'how-donate',
    component: () => import('@/views/TutorialView.vue'),
    meta: {
      template: DefaultTemplate,
      protected: false,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      template: AuthTemplate,
      protected: false,
    }
  },
  {
    path: "/404",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      template: BlankTemplate,
      protected: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
