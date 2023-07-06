<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'
import { onMounted } from 'vue'

const lessonId = parseInt(useRoute().params.id)
const settings = useRoute().query

const piniaLessonsStore = useLessonsStore()
const lesson = piniaLessonsStore.getLessonById(lessonId)

const piniaCardsStore = useCardsStore()
const cards = computed(() => { return piniaCardsStore.getCardsByLessonId(lessonId) })

const cardsToTrain = ref([])

onMounted(() => {
    for (let card of cards.value) {
        let side = (settings.side === 'random') ? ((Math.random() > 0.5) ? 'W2T' : 'T2W') : settings.side

        if (settings.levels.includes(card[side].level.toString())) {
            cardsToTrain.value.push({
                id: card.id,
                side: side,
                front: (side === 'W2T') ? card.word : card.translation,
                back: (side === 'W2T') ? card.translation : card.word,
                info: card.info,
                correct: null
            })
        }
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
    piniaLessonsStore.updateAfterTraining(lessonId)
}

function finishTraining() {
    cardsToTrain.value.splice(currentCard.value)
}

</script>

<template>
    <main>
        <div class="container">
            <h1>Trainieren</h1>
            <div v-if="currentCard < cardsToTrain.length" class="island training-card">
                <p>{{ cardsToTrain[currentCard].front }}</p>
                <div class="show-solution" v-if="!showSolution" @click="showSolution = !showSolution">
                    <p>?</p>
                </div>
                <p v-if="showSolution">{{ cardsToTrain[currentCard].back }}</p>
                <div class="correct-buttons">
                    <button style="background-color: rgb(201, 74, 74);" v-if="showSolution"
                        @click="nextCard(false)">Falsch</button>
                    <button style="background-color: rgb(82, 184, 82);" v-if="showSolution"
                        @click="nextCard(true)">Richtig</button>
                </div>
            </div>
            <button v-if="currentCard < cardsToTrain.length" @click="finishTraining()" class="finish-training">Beenden</button>
            <div v-if="currentCard >= cardsToTrain.length" class="island summary">
                <p>Korrekt:</p>
                <p style="font-size: 3rem;">{{ cardsToTrain.filter(c => c.correct).length }} / {{ cardsToTrain.length }}</p>
                <button v-if="currentCard >= cardsToTrain.length" class="button-big" style="width: 100%; margin-top: auto;"
                    @click="commitToStore(); $router.push('/lesson/' + lesson.id)">Fertig</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
    position: fixed;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
    height: 100%;
}

.training-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.4rem;
    height: 65vh;
}

.training-card p {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.show-solution {
    width: 100%;
    height: calc( 100% - 1rem );
    border: none;
    border-radius: 1rem;
    background-color: var(--color-background-soft);
    text-align: center;
}

.show-solution p {
    color: var(--color-text-soft);
    font-weight: bolder;
    font-size: 10rem;
}

.correct-buttons {
    display: flex;
    width: 100%;
    margin-top: auto;
}

.correct-buttons button {
    width: 100%;
    height: 8rem;
    margin: 1rem;
    border: none;
    border-radius: 1rem;
    color: white;
    font-weight: bolder;
    font-size: 1.4rem;
}

.summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.4rem;
    height: 65vh;
    padding-top: 3rem;
}

.finish-training {
    border: none;
    background-color: transparent;
    color: var(--color-text-soft);
    margin-top: auto;
    margin-bottom: 1rem;
}
</style>