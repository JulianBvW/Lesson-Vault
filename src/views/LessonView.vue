<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLessonsStore } from '@/stores/lessons.js'

const piniaLessonsStore = useLessonsStore()
const { lessons } = storeToRefs(piniaLessonsStore)

const newLessonName = ref('')
const newLessonIcon = ref('')
function addLesson() {
    if (newLessonName.value !== '') {
        piniaLessonsStore.addLesson(newLessonName.value, newLessonIcon.value)
        newLessonName.value = ''
    }
}

</script>

<template>
    <main>
        <div class="container">
            <h1>Lektionen</h1>
            {{ lessons }}
            
            <input v-model="newLessonName" type="text">
            <button @click="addLesson()">Lektion hinzufügen</button>
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