<script setup>
import { ref } from 'vue'
const count = reactive({
    title: "",
    discription: "",
    due_date: new Date(),
})
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>