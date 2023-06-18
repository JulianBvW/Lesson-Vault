<script setup>
function resetStorage() {
    localStorage.clear()
}
</script>

<template>
  <main>
    <h1>Home</h1>
    <button @click="$router.push('/lessons/')">Lessons</button>
    <button @click="resetStorage">Reset localStorage</button>
  </main>
</template>

<style scoped>
</style>