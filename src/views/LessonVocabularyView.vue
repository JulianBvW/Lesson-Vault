<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'
import { RouterLink } from 'vue-router'
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
                    <h2>Ebene {{ level + 1 }} <span v-if="level === 5">👑</span> ({{ cards.length }})</h2>
                    <div class="island">
                        <p v-for="card in cards">
                            <div v-if="side === 'W2T'">
                                <RouterLink class="link" :to="'/card/' + card.id">
                                    {{ card.word }} | <span style="color: var(--color-text-soft)">{{ card.translation }}</span>
                                </RouterLink>
                            </div>
                            <div v-if="side === 'T2W'">
                                <RouterLink class="link" :to="'/card/' + card.id">
                                    {{ card.translation }} | <span style="color: var(--color-text-soft)">{{ card.word }}</span>
                                </RouterLink>
                            </div>
                        </p>
                    </div>
                </div>
            </div>

            <button class="button-big" @click="$router.push({ name: 'train', query: { side: 'random', levels: '012345' }, params: { id: lesson.id } })">Trainieren</button>
            <button class="button-big" @click="$router.push({ name: 'train', query: { side: side, levels: '01234' }, params: { id: lesson.id } })">Trainiere untere Ebenen</button>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
}

.link {
    text-decoration: none;
    color: var(--color-text);
}
</style>