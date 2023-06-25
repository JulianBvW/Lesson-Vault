<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCardsStore } from '@/stores/cards.js'

const lessonId = parseInt(useRoute().params.id)
const piniaCardsStore = useCardsStore()

const newVocabularyWord = ref('')
const newVocabularyTranslation = ref('')
const newVocabularyInfo = ref('')

const newVocabularyWordBox = ref(null)

function addVocabulary() {
    if (newVocabularyWord.value !== '' && newVocabularyTranslation.value !== '') {
        piniaCardsStore.addCard(lessonId, newVocabularyWord.value, newVocabularyTranslation.value, newVocabularyInfo.value)
        newVocabularyWord.value = ''
        newVocabularyTranslation.value = ''
        newVocabularyInfo.value = ''
    } else if (newVocabularyWord.value === '') {
        newVocabularyTranslation.value.focus()
    } else {
        newVocabularyWord.value.focus()
    }
}

onMounted(() => {
    newVocabularyWordBox.value.focus()
    newVocabularyWordBox.value.click()
})
</script>

<template>
    <main>
        <h1>Neue Vokabel</h1>
        <input class="island" v-model="newVocabularyWord" type="text" placeholder="Wort" ref="newVocabularyWordBox" v-on:keyup.enter="addVocabulary()" autofocus />
        <hr />
        <input class="island" v-model="newVocabularyTranslation" type="text" placeholder="Übersetzung" v-on:keyup.enter="addVocabulary()">
        <hr />
        <input class="island" v-model="newVocabularyInfo" type="text" placeholder="Info" v-on:keyup.enter="addVocabulary()">

        <button class="button-big" @click="addVocabulary()">Vokabel hinzufügen</button>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}

input {
    border: none;
    /* background-color: aqua; */
    text-align: center;
    height: 4rem;
    width: 100%;
    /* border-radius: 1rem; */
    font-size: 1.4rem;
}
</style>