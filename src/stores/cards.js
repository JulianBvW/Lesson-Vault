import { defineStore } from 'pinia'

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
                let card = this.cards.find(c => c.id === info.id)
                let levelDiff = info.correct ? 1 : -1
                card[info.side].level = Math.max(Math.min(card[info.side].level + levelDiff, 5), 0)
                // TODO stat & lastSeen & reachedTopLevel
            }
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