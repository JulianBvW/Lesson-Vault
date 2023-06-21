<script setup>
import { useLessonsStore } from '@/stores/lessons.js'

const props = defineProps(['id'])
const id = props.id

const piniaLessonsStore = useLessonsStore()
const lesson = piniaLessonsStore.getLessonById(id)
</script>

<template>
    <div class="container" @click="$router.push('/lesson/' + id)">
        <div class="circle"></div>
        <p class="name">{{ lesson.name }}</p>
        <p class="stats">{{ lesson.stats.join(' / ') }}</p>
        <p class="stars"><span style="color: var(--color-text-soft);">{{ '☆'.repeat(3 - lesson.stars) }}</span>{{ '★'.repeat(lesson.stars) }}</p>
        <p class="last">zuletzt {{ new Date(lesson.lastPractice).toLocaleDateString('de-DE') }}</p>
    </div>
</template>

<style scoped>
.container {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 5rem 1.5fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: left;
    align-content: center;
}

.circle {
    grid-column: 1/2;
    grid-row: 1/3;
    height: 4.5rem;
    width: 4.5rem;
    background-color: var(--color-background-island);
    border-radius: 100%;
    border: 5px solid var(--color-action);
}

.name {
    grid-column: 2/3;
    grid-row: 1/2;
    font-size: 1.4rem;
    margin-left: 1rem;
    margin-top: 0.2rem;
}

.stars {
    grid-column: 3/4;
    grid-row: 1/2;
    justify-self: flex-end;
    font-size: 1.4rem;
    color: gold;
    margin-top: 0.2rem;
}

.stats {
    grid-column: 2/3;
    grid-row: 2/3;
    margin-left: 1rem;
    color: var(--color-text-soft);
    font-weight: bold;
    font-size: small;
    margin-top: 0.5rem;
}

.last {
    grid-column: 3/4;
    grid-row: 2/3;
    justify-self: flex-end;
    color: var(--color-text-soft);
    font-size: small;
    margin-top: 0.5rem;
}
</style>