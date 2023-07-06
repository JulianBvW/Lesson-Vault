<script setup>
import { ref, computed } from 'vue'
import { useCardsStore } from '@/stores/cards.js'
import { RouterLink } from 'vue-router'

const side = ref('W2T')
const search = ref('')

const piniaCardsStore = useCardsStore()
const cards = computed(() => { return piniaCardsStore.searchCards(search.value) })

</script>

<template>
    <main>
        <div class="container">
            <h1>Suche</h1>
            <input class="island" v-model="search" type="text" placeholder="Suche" autofocus />

            <div class="island" v-if="cards.length > 0">
                        <p v-for="card in cards">
                            <div v-if="side === 'W2T'">
                                <RouterLink class="link" :to="'/card/' + card.id">
                                    {{ card.word }} | <span style="color: var(--color-text-soft)">{{ card.translation }}</span>
                                </RouterLink>
                            </div>
                            <div v-if="side === 'T2W'">
                                <RouterLink class="link" :to="'/card/' + card.id">
                                    {{ card.translation }} | <span style="color: var(--color-text-soft)">{{ card.word }}</span>
                                </RouterLink>
                            </div>
                        </p>
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

.link {
    text-decoration: none;
    color: var(--color-text);
}
</style>