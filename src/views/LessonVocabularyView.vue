<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'
import { Icon } from '@iconify/vue';
import iconCog from '@iconify-icons/mdi/cog';

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
        let level = card[side.value].level
        levels[level].push(card)
    }

    return levels
})

</script>

<template>
    <main>
        <div class="container">
            <div class="header">
                <h1>{{ lesson.name }}</h1>
                <Icon class="header-icon" @click="$router.push('/lesson/' + lessonId + '/settings')" :icon="iconCog"
                    color="var(--color-action)" :height="25" />
            </div>

            <button style="margin-bottom: 1rem;" @click="switchSide()">{{ side }}</button>

            <div v-for="(cards, level) in cardsPerLevel">
                <div v-if="cards.length > 0">
                    <h2>Ebene {{ level + 1 }} ({{ cards.length }})</h2>
                    <div class="island">
                        <p v-for="card in cards">
                        <div v-if="side === 'W2T'">{{ card.word }} | {{ card.translation }}</div>
                        <div v-if="side === 'T2W'">{{ card.translation }} | {{ card.word }}</div>
                        </p>
                    </div>
                </div>
            </div>

            <button class="button-big" @click="$router.push('/lesson/' + lesson.id + '/train')">Trainieren</button>
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