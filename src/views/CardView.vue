<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCardsStore } from '@/stores/cards.js'

const router = useRouter()

const cardId = parseInt(useRoute().params.id)
const piniaCardsStore = useCardsStore()
const card = piniaCardsStore.getCardById(cardId)

const vocabularyWord = ref('')
const vocabularyTranslation = ref('')
const vocabularyInfo = ref('')

const newVocabularyWordBox = ref(null)

function updateVocabulary() {
    if (vocabularyWord.value !== '' && vocabularyTranslation.value !== '') {
        piniaCardsStore.updateCard(cardId, newVocabularyWord.value, newVocabularyTranslation.value, newVocabularyInfo.value)
        router.push('/lessons')
    }
}

onMounted(() => {
    vocabularyWord.value = card.word
    vocabularyTranslation.value = card.translation
    vocabularyInfo.value = card.info
})
</script>

<template>
    <main>
        <h1>Vokabel bearbeiten</h1>
        <input class="island" v-model="vocabularyWord" type="text" placeholder="Wort" ref="newVocabularyWordBox" v-on:keyup.enter="updateVocabulary()" autofocus />
        <hr />
        <input class="island" v-model="vocabularyTranslation" type="text" placeholder="Übersetzung" v-on:keyup.enter="updateVocabulary()">
        <hr />
        <input class="island" v-model="vocabularyInfo" type="text" placeholder="Info" v-on:keyup.enter="updateVocabulary()">

        <button class="button-big" @click="updateVocabulary()">Vokabel speichern</button>
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