<script setup>

import { computed } from 'vue'
import { useLessonsStore } from '@/stores/lessons.js'

import Lesson from '@/components/Lesson.vue'

const piniaLessonsStore = useLessonsStore()
const latestLessonId = computed(() => {
    return piniaLessonsStore.getLatestLessonId
})

function resetStorage() {
    localStorage.clear()
}
</script>

<template>
    <main>
        <h1>Home</h1>
        <div class="island"> <!-- TODO make it a component -->
            <p style="color: var(--color-text-soft); margin: -0.3rem 0 0.1rem 0; font-size: 0.9rem; font-weight: bold;">NEUSTE LEKTION</p>
            <hr style="margin: 0 -1rem 0 -1rem; border: 1px solid var(--color-background);">
            <Lesson :id="latestLessonId" />
        </div>
        <button @click="resetStorage">Reset localStorage</button>
    </main>
</template>

<style scoped></style>