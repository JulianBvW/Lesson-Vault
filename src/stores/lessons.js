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
                id: 0,
                name: name,
                icon: icon,
                stars: 0
            })
        }
    },
    getters: {

    }
})