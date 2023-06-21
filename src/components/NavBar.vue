<script setup>
import { computed } from 'vue'
import { useRoute } from "vue-router";

import { Icon } from '@iconify/vue';
import iconHome from '@iconify-icons/mdi/home';
import iconHomeInactive from '@iconify-icons/mdi/home-outline';
import iconLesson from '@iconify-icons/mdi/card-text';
import iconLessonInactive from '@iconify-icons/mdi/card-text-outline';
import iconGroup from '@iconify-icons/mdi/format-list-group';

const svgHeight = 32

const page = computed(() => {
    const route = useRoute().path
    if (route == '/') return 'home'
    if (route.startsWith('/lesson')) return 'lessons'
    if (route.startsWith('/groups')) return 'groups'
    return '' // Should never happen...
})
</script>

<template>
    <footer class="unselectable"> <!-- TODO make more beautiful -->
        <div v-if="page === 'groups'" @click="$router.push('/groups/')" class="navbar-icon active">
            <Icon :icon="iconGroup" color="#007AFF" :height="svgHeight" />
            <p>Gruppen</p>
        </div>
        <div v-else @click="$router.push('/groups/')" class="navbar-icon">
            <Icon :icon="iconGroup" color="#959595" :height="svgHeight" />
            <p>Gruppen</p>
        </div>
        
        <div v-if="page === 'home'" @click="$router.push('/')" class="navbar-icon active">
            <Icon :icon="iconHome" color="#007AFF" :height="svgHeight" />
            <p>Home</p>
        </div>
        <div v-else @click="$router.push('/')" class="navbar-icon">
            <Icon :icon="iconHomeInactive" color="#959595" :height="svgHeight" />
            <p>Home</p>
        </div>
        
        <div v-if="page === 'lessons'" @click="$router.push('/lessons/')" class="navbar-icon active">
            <Icon :icon="iconLesson" color="#007AFF" :height="svgHeight" />
            <p>Lektionen</p>
        </div>
        <div v-else @click="$router.push('/lessons/')" class="navbar-icon">
            <Icon :icon="iconLessonInactive" color="#959595" :height="svgHeight" />
            <p>Lektionen</p>
        </div>
    </footer>
</template>

<style scoped>
footer {
    position: fixed;
    top: auto;
    bottom: 0;
    background-color: var(--color-background-soft);
    border-top: 1px solid var(--color-border);
    height: var(--footer-height);
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}

.navbar-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 1rem;
}

.navbar-icon p {
    font-size: 0.7rem;
    margin-top: -0.1rem;
    color: var(--color-action-inactive);
    font-weight: 500;
}

.active p {
    color: var(--color-action);
}
</style>