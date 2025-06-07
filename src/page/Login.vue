<script setup lang="ts">
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import CustomInput from "@/components/CustomInput.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import PasswordInput from "@/components/PasswordInput.vue";
import apiClient from "../axios";

const authStore = useAuthStore();
const router = useRouter();

const loginValidationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6),
  })
);

const { meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: loginValidationSchema,
});

const handleLogin = handleSubmit(async (values, actions) => {
  try {
    const response = (await apiClient.post("/login", values)).data;
    authStore.setUser(response.user);
    authStore.setAccessToken(response.accessToken);
    actions.resetForm();
    await router.push({ name: "Dashboard" });
  } catch (err) {
    console.log("Login error:", (err as Error).message);

    actions.setErrors({
      email: "Incorrect email or password",
      password: "Invalid email or password",
    });
  }
});
</script>

<template>
  <div
    class="flex w-full h-screen flex-col p-4 bg-gray-100 items-center justify-center"
  >
    <form class="w-full max-w-md space-y-6">
      <!-- Input Group -->
      <div
        class="flex flex-col bg-white w-full p-6 rounded shadow-md space-y-4"
      >
        <CustomInput name="email" type="email" label="Email" />
        <PasswordInput name="password" label="Password" />
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
