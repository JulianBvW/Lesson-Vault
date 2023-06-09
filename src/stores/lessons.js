import { defineStore } from 'pinia'

import { useCardsStore } from '@/stores/cards.js'

let MAX_LEVEL = 5 // [0, 1, 2, 3, 4, 5]

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
                id: this.nextId++,
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
            return this.nextId - 1
        },
        updateAfterTraining(id) {
            let lesson = this.lessons.find(l => l.id === id)
            lesson.lastPractice = Date.now()
            this.updateStats(id)
        },
        updateStats(id) {
            let lesson = this.lessons.find(l => l.id === id)

            const piniaCardsStore = useCardsStore()
            const cards = piniaCardsStore.getCardsByLessonId(id)
            
            let stats = [0, 0, 0]
            for (let card of cards) {
                if (card.W2T.level === 0) { stats[0] += 1 }
                else if (card.W2T.level === MAX_LEVEL) { stats[2] += 1 }
                else { stats[1] += 1 }
                
                if (card.T2W.level === 0) { stats[0] += 1 }
                else if (card.T2W.level === MAX_LEVEL) { stats[2] += 1 }
                else { stats[1] += 1 }
            }
            lesson.stats = stats

            let stars = 0
            if (stats[0] === 0 && (stats[1] >= 0 || stats[2] >= 0)) { stars = 1 }
            if (stats[0] === 0 && stats[1] === 0 && stats[2] >= 0)  { stars = 3 }
            else {
                let allReachedTop = true
                for (let card of cards) {
                    if (!card.W2T.reachedTopLevel && !card.T2W.reachedTopLevel) {
                        allReachedTop = false
                        break
                    }
                }
                if (allReachedTop) { stars = 2 }
            }
            lesson.stars = stars
            
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
        loadSaveString(saveString) {
            let save = JSON.parse(saveString)
            this.lessons = save['lessons']
            this.nextId = save['nextId']
            this.saveToLocalStorage()
        }
    },
    getters: {
        getLessonById: (state) => {
            return (id) => state.lessons.find(lesson => lesson.id === id);
        },
        getLatestLessonId: (state) => {
            if (state.lessons.length === 0) { return -1 }
            return state.lessons[state.lessons.length-1].id
        },
        getSaveString: (state) => {
            return JSON.stringify({
                'lessons': state.lessons,
                'nextId': state.nextId
            })
        }
    }
})