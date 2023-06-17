import { defineStore } from 'pinia'

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
            W2T: {
                level: 0,
                stats: [0, 0], // Got right (stats[0]) vs got wrong (stats[1])
                lastSeen: null,
                reachedTopLevel: false
            },
            T2W: {
                level: 0,
                stats: [0, 0], // Got right (stats[0]) vs got wrong (stats[1])
                lastSeen: null,
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
                W2T: {
                    level: 0,
                    stats: [0, 0],
                    lastSeen: null,
                    reachedTopLevel: false
                },
                T2W: {
                    level: 0,
                    stats: [0, 0],
                    lastSeen: null,
                    reachedTopLevel: false
                }
            })
            this.saveToLocalStorage()
        },
        updateAfterTraining(cardInfos) {
            for (let info of cardInfos) {
                let cardside = this.cards.find(c => c.id === info.id)[info.side]

                cardside.lastSeen = Date.now()
                if (info.correct) {
                    cardside.level = Math.max(Math.min(cardside.level + 1, MAX_LEVEL), 0)
                    cardside.stats[0] += 1
                    if (cardside.level == MAX_LEVEL) { cardside.reachedTopLevel = true }
                } else {
                    cardside.level = Math.max(Math.min(cardside.level - 1, MAX_LEVEL), 0)
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
    },
    getters: {
        getCardsByLessonId: (state) => {
            return (lessonId) => state.cards.filter(card => card.lessonId === lessonId);
        }
    }
})