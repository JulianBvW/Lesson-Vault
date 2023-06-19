<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLessonsStore } from '@/stores/lessons.js'

import Lesson from '@/components/Lesson.vue'

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
            <Lesson v-for="lesson in lessons" :id="lesson.id" />
            <input v-model="newLessonName" type="text" v-on:keyup.enter="addLesson()">
            <button @click="addLesson()">Lektion hinzufügen</button>
        </div>
    </main>
</template>

<style scoped>
.container {
    /* display: flex;
    flex-direction: column;
    max-width: 50rem; */
    width: 100%;
}

main {
    display: flex;
    justify-content: center;
}
</style>