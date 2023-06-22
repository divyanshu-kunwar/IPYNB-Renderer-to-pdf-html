import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import ShowcaseView from '../views/ShowcaseView.vue'
import DocsView from '../views/DocsView.vue'
import ProjectView from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/Features',
      name: 'Features',
      component: FeaturesView
    },
    {
      path: '/Showcase',
      name: 'Showcase',
      component: ShowcaseView
    },
    {
      path: '/Tutorials',
      name: 'Tutorials',
      component: DocsView
    },
    {
      path: '/Create',
      name: 'Create',
      component: ProjectView
    }
  ]
})

export default router
