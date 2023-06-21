<script setup>
import { ref, onMounted } from 'vue';
import { useLessonsStore } from '@/stores/lessons.js'
import { useCardsStore } from '@/stores/cards.js'
import { useRouter } from 'vue-router';

const router = useRouter()

const piniaLessonsStore = useLessonsStore()
const piniaCardsStore = useCardsStore()

const resetStorageText = ref('Daten zurücksetzen')

function resetStorage() {
    if (resetStorageText.value === 'Daten zurücksetzen') {
        resetStorageText.value = 'Nochmal klicken'
    } else {
        localStorage.clear()
        piniaLessonsStore.$reset()
        piniaCardsStore.$reset()
        router.push('/')
    }
}

function saveStateLocally() {
    const saveStringLessons = piniaLessonsStore.getSaveString
    const saveStringCards = piniaCardsStore.getSaveString
    const saveString = JSON.stringify({
        'lessons': saveStringLessons,
        'cards': saveStringCards
    })

    const blob = new Blob([saveString], { type: 'text/plain' })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'lesson-vault-save.txt'

    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
}

function readStateLocally(event) {
    const file = event.target.files[0]

    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            const save = JSON.parse(reader.result)
            
            const saveStringLessons = save.lessons
            const saveStringCards = save.cards
            
            piniaLessonsStore.loadSaveString(saveStringLessons)
            piniaLessonsStore.saveToLocalStorage()
            piniaCardsStore.loadSaveString(saveStringCards)
            piniaCardsStore.saveToLocalStorage()
        }
        reader.readAsText(file)
    }
    
    router.push('/')
}

onMounted(() => {
    resetStorageText.value = 'Daten zurücksetzen'
})

</script>

<template>
    <main>
        <h1>Einstellungen</h1>
        <div class="island button-group">
            <button class="island-button action" @click="saveStateLocally">Daten lokal speichern</button>
            <hr />
            <!-- <button class="island-button action" @click="">Daten wiederherstellen</button> -->
            <label class="custom-file-upload">
                <input type="file" @change="readStateLocally" />
                <p class="island-button action" style="padding-top: 0.5rem; text-align: center;">Daten wiederherstellen</p>
            </label>
        </div>
        <div class="island button-group">
            <button class="island-button warning" @click="resetStorage">{{ resetStorageText }}</button>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    max-width: 50rem;
}

input[type="file"] {
    display: none;
}
</style>