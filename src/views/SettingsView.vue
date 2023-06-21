<script setup>
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'

const piniaLessonsStore = useLessonsStore()
// const lesson = piniaLessonsStore.getLessonById(lessonId)

const piniaCardsStore = useCardsStore()


</script>

<template>
    <main>
        <h1>Einstellungen</h1>
        <div class="island">
            Test
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