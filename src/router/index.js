import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LessonView from '../views/LessonView.vue'
import NewLessonView from '../views/NewLessonView.vue'
import LessonVocabularyView from '../views/LessonVocabularyView.vue'
import LessonTrainView from '../views/LessonTrainView.vue'
import LessonSettingsView from '../views/LessonSettingsView.vue'
import CardView from '../views/CardView.vue'
import GroupView from '../views/GroupView.vue'
import SettingsView from '../views/SettingsView.vue'

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
            component: LessonView
        },
        {
            path: '/lessons/new',
            name: 'new-lesson',
            component: NewLessonView,
            meta: { transition: 'switch' }
        },
        {
            path: '/lesson/:id',
            name: 'vocabulary',
            component: LessonVocabularyView,
            meta: { transition: 'switch' }
        },
        {
            path: '/lesson/:id/train',
            name: 'train',
            component: LessonTrainView,
            meta: { transition: 'switch' }
        },
        {
            path: '/lesson/:id/settings',
            name: 'lesson-settings',
            component: LessonSettingsView,
            meta: { transition: 'switch' }
        },
        {
            path: '/card/:id',
            name: 'card',
            component: CardView,
            meta: { transition: 'switch' }
        },
        {
            path: '/groups',
            name: 'groups',
            component: GroupView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: { transition: 'switch' }
        },
    ]
})

export default router
