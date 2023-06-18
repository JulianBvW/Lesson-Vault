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
    <RouterView style="margin-bottom: calc( var(--footer-height) + 1rem );" />
    <NavBar />
</template>

<style>
</style>
