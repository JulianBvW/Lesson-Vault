<script setup>
import { useLessonsStore } from '@/stores/lessons.js'
import { Icon } from '@iconify/vue';
import iconPlus from '@iconify-icons/mdi/plus';

const props = defineProps(['id'])
const id = props.id

const piniaLessonsStore = useLessonsStore()
const lesson = (id >= 0) ? piniaLessonsStore.getLessonById(id) : null
</script>

<template>
    <div v-if="id >= 0" class="container" @click="$router.push('/lesson/' + id)">
        <div class="circle">
            <p>{{ lesson.icon.value }}</p>
        </div>
        <p class="name">{{ lesson.name }}</p>
        <p class="stats">{{ lesson.stats.join(' / ') }}</p>
        <p class="stars"><span style="color: var(--color-text-soft);">{{ '☆'.repeat(3 - lesson.stars) }}</span>{{ '★'.repeat(lesson.stars) }}</p>
        <p class="last">zuletzt {{ new Date(lesson.lastPractice).toLocaleDateString('de-DE') }}</p>
    </div>
    <div v-else class="container-new-lesson" @click="$router.push('/lessons/new')">
        <div class="circle new-lesson-circle">
            <Icon :icon="iconPlus" color="#007AFF" :height="45" />
        </div>
        <p>Neue Lektion...</p>
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

.container-new-lesson {
    margin-top: 1rem;
    display: flex;
    justify-content: left;
    margin-bottom: 1rem;
}

.container-new-lesson p {
    font-size: 1.4rem;
    margin-top: 1rem;
    margin-left: 1.85rem;
    color: var(--color-text-soft);
}

.new-lesson-circle {
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle {
    grid-column: 1/2;
    grid-row: 1/3;
    height: 4.2rem;
    width: 4.2rem;
    background-color: var(--color-background-island);
    border-radius: 100%;
    border: 4px solid var(--color-action);
    z-index: 2;
}

.circle p {
    color: var(--color-action);
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
}

.name {
    grid-column: 2/3;
    grid-row: 1/2;
    font-size: 1.4rem;
    margin-left: 1rem;
}

.stars {
    grid-column: 3/4;
    grid-row: 1/2;
    justify-self: flex-end;
    font-size: 1.4rem;
    color: gold;
    /* color: #FF4800; */
    margin-top: 0.2rem;
}

.stats {
    grid-column: 2/3;
    grid-row: 2/3;
    margin-left: 1rem;
    color: var(--color-text-soft);
    font-weight: bold;
    font-size: small;
    margin-top: 0.1rem;
}

.last {
    grid-column: 3/4;
    grid-row: 2/3;
    justify-self: flex-end;
    color: var(--color-text-soft);
    font-size: small;
    margin-top: 0.1rem;
}
</style>