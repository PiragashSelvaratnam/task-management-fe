<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";
const { placeholder, label, name, type } = defineProps({
  placeholder: {
    type: String,
    default: null,
  },
  label: String,
  name: {
    type: String,
    required: true,
  },
  type: String,
});

const {
  handleChange,
  value: inputValue,
  handleBlur,
  errorMessage,
  meta,
} = useField(computed(() => name));

// const emit = defineEmits<{
//   (e: "update:modelValue", value: string): void;
//   (e: "blur"): void;
// }>();

// const onInput = (event: Event) => {
//   emit("update:modelValue", (event.target as HTMLInputElement).value);
// };
</script>
<template>
  <div
    class="w-full flex h-20 flex-col"
    :class="{ 'mb-4': errorMessage, }"
  >
    <label class="mb-1 text-sm text-gray-700">{{ label }}</label>
    <input
      class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      :value="inputValue"
      :type="type || 'text'"
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
