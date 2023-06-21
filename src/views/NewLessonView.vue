<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useLessonsStore } from '@/stores/lessons.js'
const router = useRouter()

const piniaLessonsStore = useLessonsStore()

const newLessonName = ref('')
const newLessonIcon = ref('')

function addLesson() {
    if (newLessonName.value !== '' && newLessonIcon.value !== '') {
        const id = piniaLessonsStore.addLesson(newLessonName.value, newLessonIcon.value)
        newLessonName.value = ''
        newLessonIcon.value = ''
        router.push('/lesson/' + id)
    }
}

const nameinput = ref(null)
const symbolinput = ref(null)
onMounted(() => {
    nameinput.value.focus()
    nameinput.value.click()
})

function focusSymbol() {
    symbolinput.value.focus()
}
</script>

<template>
    <main>
        <div class="container">
            <h1>Neue Lektion</h1>
            <h2>Name</h2>
            <input class="island" v-model="newLessonName" v-on:keyup.enter="focusSymbol()" type="text" ref="nameinput" placeholder="Lektion 1" autofocus  />
            <h2>Symbol</h2>
            <input class="island" v-model="newLessonIcon" v-on:keyup.enter="addLesson()" type="text" ref="symbolinput" placeholder="1" />
            <div class="button-center">
                <button class="button-big" @click="addLesson()">Hinzufügen</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    width: 100%;
}

input {
    border: none;
    /* background-color: aqua; */
    text-align: center;
    height: 4rem;
    width: 100%;
    /* border-radius: 1rem; */
    font-size: 1.4rem;
}

.button-center {
    display: flex;
    justify-content: center;
}

.button-center button {
    width: 80%;
}
</style>