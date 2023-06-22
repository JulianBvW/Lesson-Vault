<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLessonsStore } from '@/stores/lessons.js'

import Lesson from '@/components/Lesson.vue'

const piniaLessonsStore = useLessonsStore()
const { lessons } = storeToRefs(piniaLessonsStore)

</script>

<template>
    <main>
        <div class="container">
            <h1>Lektionen</h1>
            <div class="island" style="position: relative;">
                <div class="connection-bar"></div>
                <Lesson v-for="lesson in lessons" :id="lesson.id" />
                <Lesson id="-1"/>
            </div>
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

.connection-bar {
    position: absolute;
    width: 4px;
    background-color: var(--color-action);
    height: calc( 100% - 5rem );
    margin-top: 1rem;
    margin-left: 1.97em;
}
</style>