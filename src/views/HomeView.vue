<script setup>
import { computed } from 'vue'
import { useLessonsStore } from '@/stores/lessons.js'
import { Icon } from '@iconify/vue';
import iconCog from '@iconify-icons/mdi/cog';

import Lesson from '@/components/Lesson.vue'

const piniaLessonsStore = useLessonsStore()
const latestLessonId = computed(() => {
    return piniaLessonsStore.getLatestLessonId
})
</script>

<template>
    <main>
        <div class="header">
            <h1>Home</h1>
            <Icon class="header-icon" @click="$router.push('/settings')" :icon="iconCog" color="var(--color-action)" :height="25" />
        </div>
        <div class="island"> <!-- TODO make it a component -->
            <p style="color: var(--color-text-soft); margin: -0.3rem 0 0.1rem 0; font-size: 0.9rem; font-weight: bold;">NEUSTE LEKTION</p>
            <hr style="margin: 0 -1rem 0 -1rem; border: 1px solid var(--color-background);">
            <Lesson :id="latestLessonId" />
        </div>
    </main>
</template>

<style scoped>
</style>