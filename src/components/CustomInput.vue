<script setup lang="ts">
import { useField } from 'vee-validate';
const { modelValue, placeholder, label,errors,name, type } = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: null,
  },
  label: String,
  errors:{
    type: String,
    defautl:null
  },
  name: String,
  type: String,
});


// const { value, errorMessage } = useField(() => name);


const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
}>();

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
<template>
  <div class="w-full flex h-20 flex-col">
    <label class="mb-1 text-sm text-gray-700">{{ label }}</label>
    <input
      class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @blur="emit('blur')"
    />
    <span>{{ errors }}</span>
  </div>
</template>

<style scoped></style>
