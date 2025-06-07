<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import Button from "./Button.vue";
import CustomInput from "./CustomInput.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import PasswordInput from "./PasswordInput.vue";

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const loginFrom = reactive({
  email: "",
  password: "",
});

const schema = toTypedSchema(
  z.object({
    email: z.string().nonempty().email(),
  })
);

const { meta, values, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().min(1).email(),
      password: z.string().min(6),
    })
  ),
});

const handleLogin = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log("Response:", data.user);
    authStore.setUser(data.user);
    authStore.setAccessToken(data.accessToken);
    isLoading.value = false;

    await router.push({ name: "Tasks" });
  } catch (err) {
    isLoading.value = false;
    if (err instanceof Error) {
      console.error("Login error:", err.message);
      // Object.assign(
      //   $externalResults,
      //   convertDotNotatedValidationErrorsAToObject(error.data.errors)
      // );
    }
  }
});
</script>

<template>
  <div
    class="flex w-full h-screen flex-col p-4 bg-gray-100 items-center justify-center"
  >
    <form @submit.prevent="handleLogin" class="w-full max-w-md space-y-6">
      <!-- Input Group -->
      <div
        class="flex flex-col bg-white w-full p-6 rounded shadow-md space-y-4"
      >
        <CustomInput
          name="email"
          type="email"
          label="Email"
        />
        <PasswordInput
          name="password"
          label="Password"
        />
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <Button
          :title="isSubmitting ? 'Logging in...' : 'Login'"
          @handle-click="handleLogin"
          :disabled="!meta.touched || isSubmitting"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
