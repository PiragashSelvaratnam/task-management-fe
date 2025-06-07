<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";
const { placeholder, label, name } = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  label: String,
  name: {
    type: String,
    required: true,
  },
});

const {
  handleChange,
  value: inputValue,
  handleBlur,
  errorMessage,
} = useField(computed(() => name));
</script>
<template>
  <div class="w-full flex h-20 flex-col" :class="{ 'mb-4': errorMessage }">
    <label class="mb-1 text-sm text-gray-700">{{ label }}</label>
    <input
      :name="name"
      autocomplete="current-password"
      class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      :value="inputValue"
      type="password"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <span v-if="errorMessage" class="mb-1 text-sm text-red-500">{{
      errorMessage
    }}</span>
  </div>
</template>

<style scoped></style>
