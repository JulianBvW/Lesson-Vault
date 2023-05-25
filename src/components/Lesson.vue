<script setup>
import { storeToRefs } from 'pinia'
import { useLessonsStore } from '@/stores/lessons.js'

const props = defineProps(['id'])
const id = props.id

const piniaLessonsStore = useLessonsStore()

const lesson = piniaLessonsStore.getLessonById(id)
</script>

<template>
    <div class="lessonContainer">
        <h3>{{ lesson.name }}</h3>
    </div>
</template>

<style scoped>
.lessonContainer {
    margin: 0.2rem;
    padding: 0.5rem;
    background-color: grey;
}
</style>