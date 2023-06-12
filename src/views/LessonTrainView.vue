<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'
import { onMounted } from 'vue'

const lessonId = parseInt(useRoute().params.id)

const piniaLessonsStore = useLessonsStore()
const lesson = piniaLessonsStore.getLessonById(lessonId)

const piniaCardsStore = useCardsStore()
const cards = computed(() => { return piniaCardsStore.getCardsByLessonId(lessonId) })

const cardsToTrain = ref([])

onMounted(() => {
    for (let card of cards.value) {
        let side = (Math.random() > 0.5) ? 'W2T' : 'T2W'

        cardsToTrain.value.push({
            id: card.id,
            side: side,
            front: (side === 'W2T') ? card.word : card.translation,
            back: (side === 'W2T') ? card.translation : card.word,
            info: card.info,
            correct: null
        })
    }
    return cardsToTrain.value.sort(() => Math.random() - 0.5);
})

const currentCard = ref(0)
const showSolution = ref(false)

function nextCard(correct) {
    cardsToTrain.value[currentCard.value].correct = correct
    currentCard.value++
    showSolution.value = false
}

function commitToStore() {
    piniaCardsStore.updateAfterTraining(cardsToTrain.value)
}

</script>

<template>
    <main>
        <div class="container">
            <div v-if="currentCard < cardsToTrain.length">
                {{ cardsToTrain[currentCard].front }}
                <button v-if="!showSolution" @click="showSolution = !showSolution">?</button>
                <button v-if="showSolution" @click="nextCard(false)">Falsch</button>
                <button v-if="showSolution" @click="nextCard(true)">Korrekt</button>
            </div>
            {{ cardsToTrain }}
            <div v-if="currentCard >= cardsToTrain.length">
                Korrekt: {{ cardsToTrain.filter(c => c.correct).length }} / {{ cardsToTrain.length }}
                <button @click="commitToStore() ; $router.push('/lesson/' + lesson.id)">Fertig</button>
            </div>
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