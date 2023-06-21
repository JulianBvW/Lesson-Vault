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
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </RouterView>
    <div class="phantom"></div>
    <NavBar />
</template>

<style>
main {
    padding: 1rem;
    padding-top: 2rem;
}

h1 {
    font-weight: bold;
    font-size: 2.5rem;
}

.phantom {
    height: calc(var(--footer-height) + 1rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from {
    transform: translateX(20%);
    opacity: 0;
}

.fade-leave-to {
    transform: translateX(-20%);
    opacity: 0;
}
</style>
