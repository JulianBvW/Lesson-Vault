<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useLessonsStore } from '@/stores/lessons.js'
const piniaLessonsStore = useLessonsStore()
piniaLessonsStore.loadFromLocalStorage()

import { useCardsStore } from '@/stores/cards.js'
const piniaCardsStore = useCardsStore()
piniaCardsStore.loadFromLocalStorage()
</script>

<template>
    <RouterView />
    <footer style="position: fixed; top: auto; bottom: 0; background-color: blueviolet; height: 5rem; width: 100vw;">Test</footer>
</template>

<style>
</style>
