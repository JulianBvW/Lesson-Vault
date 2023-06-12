<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'

const lessonId = parseInt(useRoute().params.id)

const piniaLessonsStore = useLessonsStore()
const lesson = piniaLessonsStore.getLessonById(lessonId)

const piniaCardsStore = useCardsStore()
const cards = computed(() => { return piniaCardsStore.getCardsByLessonId(lessonId) })

// Sides

const side = ref('W2T')

function switchSide() {
    if (side.value === 'W2T') {
        side.value = 'T2W'
    } else {
        side.value = 'W2T'
    }
}

// Card Levels

const MAX_LEVEL = 6

const cardsPerLevel = computed(() => {
    let levels = [...new Array(MAX_LEVEL)].map(_ => [])

    for (let card of cards.value) {
        let level = ((side === 'W2T') ? card.W2T.level : card.T2W.level)
        levels[level].push(card)
    }

    return levels
})

// Add new Vocabulary

const newVocabularyWord = ref('')
const newVocabularyTranslation = ref('')
const newVocabularyInfo = ref('')

function addVocabulary() {
    if (newVocabularyWord.value !== '' && newVocabularyTranslation.value !== '') {
        piniaCardsStore.addCard(lessonId, newVocabularyWord.value, newVocabularyTranslation.value, newVocabularyInfo.value)
        newVocabularyWord.value = ''
        newVocabularyTranslation.value = ''
        newVocabularyInfo.value = ''
    }
}
</script>

<template>
    <main>
        <div class="container">
            <h1 @click="$router.push('/lessons')">Vokabeln</h1>
            <p>aus {{ lesson.name }}</p>

            <button @click="switchSide()">{{ side }}</button>

            <div v-for="(cards, level) in cardsPerLevel">
                <div style="width: 100%; background-color: aqua;">Ebene {{ level + 1 }} ({{ cards.length }})</div>
                <p v-for="card in cards">{{ card.word }} | {{ card.translation }}</p>
            </div>

            <input v-model="newVocabularyWord" type="text">
            <input v-model="newVocabularyTranslation" type="text" v-on:keyup.enter="addVocabulary()">
            <input v-model="newVocabularyInfo" type="text" v-on:keyup.enter="addVocabulary()">
            <button @click="addVocabulary()">Vokabel hinzufügen</button>

            <button @click="$router.push('/lesson/' + lesson.id + '/train')">Trainieren</button>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
}
</style>