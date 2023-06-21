import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/lessons',
            name: 'lessons',
            component: () => import('../views/LessonView.vue')
        },
        {
            path: '/lesson/:id',
            name: 'vocabulary',
            component: () => import('../views/LessonVocabularyView.vue'),
            meta: { transition: 'switch' }
        },
        {
            path: '/lesson/:id/train',
            name: 'train',
            component: () => import('../views/LessonTrainView.vue'),
            meta: { transition: 'switch' }
        },
        {
            path: '/groups',
            name: 'groups',
            component: () => import('../views/GroupView.vue')
        }
    ]
})

export default router
