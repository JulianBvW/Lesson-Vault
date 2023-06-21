<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

import { useLessonsStore } from '@/stores/lessons.js'
const piniaLessonsStore = useLessonsStore()
piniaLessonsStore.loadFromLocalStorage()

import { useCardsStore } from '@/stores/cards.js'
const piniaCardsStore = useCardsStore()
piniaCardsStore.loadFromLocalStorage()
</script>

<template>
    <RouterView v-slot="{ Component }">
        <transition name="switch" mode="out-in">
            <component :is="Component" />
        </transition>
    </RouterView>
    <div class="phantom"></div>
    <NavBar />
</template>

<style scoped>
.phantom {
    height: calc(var(--footer-height) + 1rem);
}
</style>
