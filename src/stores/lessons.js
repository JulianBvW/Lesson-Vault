import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', {
    state: () => ({
        lessons: [],
        nextId: 0,

        lessonTemplate: { // TODO calculate these values
            id: 0,
            name: '',
            icon: {
                type: 'string', // string or link to <Icon>
                value: ''
            },
            stars: 0,
            stats: [0, 0, 0], // [new, intermediate, finished]
            lastPractice: null
        }
    }),
    actions: {
        addLesson(name, icon) {
            this.lessons.push({
                id: this.nextId,
                name: name,
                icon: {
                    type: 'string',
                    value: icon
                },
                stars: 0,
                stats: [0, 0, 0],
                lastPractice: Date.now()
            })
            this.saveToLocalStorage()
            return this.nextId++
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
        },
        getLatestLessonId: (state) => {
            if (state.lessons.length === 0) { return -1 }
            return state.lessons[state.lessons.length-1].id
        }
    }
})