<script setup lang="ts">
const { title, disabled } = defineProps({
  title: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["handleClick"]);
</script>

<template>
  <div class="w-full flex h-10">
    {{ disabled }}
    <button
      :disabled="disabled"
      @click="emits('handleClick')"
      class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {{ title }}
    </button>
  </div>
</template>

<style scoped></style>
