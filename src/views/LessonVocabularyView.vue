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
            <p v-for="card in cards">{{ card.word }} | {{ card.translation }}</p>
            <input v-model="newVocabularyWord" type="text">
            <input v-model="newVocabularyTranslation" type="text" v-on:keyup.enter="addVocabulary()">
            <input v-model="newVocabularyInfo" type="text" v-on:keyup.enter="addVocabulary()">
            <button @click="addVocabulary()">Vokabel hinzufügen</button>
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