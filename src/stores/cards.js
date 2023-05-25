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
        addCard(lessonId, word, translation, additionalParams = null) { // TODO add additional params
            this.cards.push({
                id: this.nextId++,
                lessonId: lessonId,
                word: word,
                translation: translation,
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
        }
    },
    getters: {
        getCardsByLessonId: (state) => {
            return (lessonId) => state.cards.filter(card => card.lessonId === lessonId);
        }
    }
})