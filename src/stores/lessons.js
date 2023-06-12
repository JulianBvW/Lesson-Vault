import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', {
    state: () => ({
        lessons: [],
        nextId: 0,

        lessonTemplate: {
            id: 0,
            name: '',
            icon: '',
            stars: 0
        }
    }),
    actions: {
        addLesson(name, icon) {
            this.lessons.push({
                id: this.nextId++,
                name: name,
                icon: icon,
                stars: 0
            })
            this.saveToLocalStorage()
        },

        saveToLocalStorage() {
            localStorage.setItem('lessons', JSON.stringify(this.lessons))
            localStorage.setItem('lessons-nextId', JSON.stringify(this.nextId))
        },
        loadFromLocalStorage() {
            const lessons = JSON.parse(localStorage.getItem('lessons'))
            const nextId = JSON.parse(localStorage.getItem('lessons-nextId'))
            if (lessons) { this.lessons = lessons }
            if (nextId) { this.nextId = nextId }
        },
    },
    getters: {
        getLessonById: (state) => {
            return (id) => state.lessons.find(lesson => lesson.id === id);
        }
    }
})