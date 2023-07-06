import { defineStore } from 'pinia'

import { useLessonsStore } from '@/stores/lessons.js'

let MAX_LEVEL = 5 // [0, 1, 2, 3, 4, 5]

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: [],
        nextId: 0,

        cardTemplate: {
            id: 0,
            lessonId: 0,
            word: '',
            translation: '',
            info: '',
            tags: [],
            W2T: {
                level: 0,
                stats: [0, 0], // Got right (stats[0]) vs got wrong (stats[1])
                lastPractice: null,
                reachedTopLevel: false
            },
            T2W: {
                level: 0,
                stats: [0, 0], // Got right (stats[0]) vs got wrong (stats[1])
                lastPractice: null,
                reachedTopLevel: false
            }
        }
    }),
    actions: {
        addCard(lessonId, word, translation, info, additionalParams = null) { // TODO add additional params
            this.cards.push({
                id: this.nextId++,
                lessonId: lessonId,
                word: word,
                translation: translation,
                info: info,
                tags: [],
                W2T: {
                    level: 0,
                    stats: [0, 0],
                    lastPractice: null,
                    reachedTopLevel: false
                },
                T2W: {
                    level: 0,
                    stats: [0, 0],
                    lastPractice: null,
                    reachedTopLevel: false
                }
            })
            const piniaLessonsStore = useLessonsStore()
            piniaLessonsStore.updateStats(lessonId)
            this.saveToLocalStorage()
        },
        updateCard(cardId, word, translation, info) {
            let card = this.cards.find(c => c.id === cardId)
            card.word = word
            card.translation = translation
            card.info = info
            this.saveToLocalStorage()
        },
        updateAfterTraining(cardInfos) {
            for (let info of cardInfos) {
                let cardside = this.cards.find(c => c.id === info.id)[info.side]

                cardside.lastPractice = Date.now()
                if (info.correct) {
                    cardside.level = Math.max(Math.min(cardside.level + 1, MAX_LEVEL), 0)
                    cardside.stats[0] += 1
                    if (cardside.level == MAX_LEVEL) { cardside.reachedTopLevel = true }
                } else {
                    cardside.level = Math.max(Math.min(cardside.level - 2, MAX_LEVEL), 0)
                    cardside.stats[1] += 1
                }
            }
            this.saveToLocalStorage()
        },

        saveToLocalStorage() {
            localStorage.setItem('cards', JSON.stringify(this.cards))
            localStorage.setItem('cards-nextId', JSON.stringify(this.nextId))
        },
        loadFromLocalStorage() {
            const cards = JSON.parse(localStorage.getItem('cards'))
            const nextId = JSON.parse(localStorage.getItem('cards-nextId'))
            if (cards) { this.cards = cards }
            if (nextId) { this.nextId = nextId }
        },
        loadSaveString(saveString) {
            let save = JSON.parse(saveString)
            this.cards = save['cards']
            this.nextId = save['nextId']
            this.saveToLocalStorage()
        }
    },
    getters: {
        getCardById: (state) => {
            return (cardId) => state.cards.find(card => card.id === cardId)
        },
        getCardsByLessonId: (state) => {
            return (lessonId) => state.cards.filter(card => card.lessonId === lessonId)
        },
        getSaveString: (state) => {
            return JSON.stringify({
                'cards': state.cards,
                'nextId': state.nextId
            })
        },
        searchCards: (state) => {
            return (search) => {
                if (search === '') { return [] }
                return state.cards.filter(card => card.word.toLowerCase().includes(search.toLowerCase()) || card.translation.toLowerCase().includes(search.toLowerCase()))
            }
        } 
    }
})