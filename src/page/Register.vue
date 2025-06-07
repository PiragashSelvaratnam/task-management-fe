<script setup lang="ts">
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import CustomInput from "@/components/CustomInput.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import PasswordInput from "@/components/PasswordInput.vue";
import apiClient from "../axios";

const authStore = useAuthStore();
const router = useRouter();

const loginValidationSchema = toTypedSchema(
  yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
  })
);

const { meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: loginValidationSchema,
});

const handleRegister = handleSubmit(async (values, actions) => {
  try {
    const response = (await apiClient.post("/login", values)).data;
    console.log("Login response:", response);
    authStore.setUser(response.user);
    authStore.setAccessToken(response.accessToken);
    actions.resetForm();
    await router.push({ name: "Dashboard" });
  } catch (err) {
    console.log("Login error:", err);

    actions.setErrors({
      email: "Invalid email or password",
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
        <CustomInput name="first_name" type="text" label="First Name" />
        <CustomInput name="last_name" type="text" label="Last Name" />
        <CustomInput name="email" type="email" label="Email" />
        <PasswordInput name="password" label="Password" />
      </div>

      <!-- Submit Button -->
      <div class="w-full">
        <Button
          :title="isSubmitting ? 'Registering...' : 'Register'"
          @handle-click="handleRegister"
          :disabled="!meta.touched || isSubmitting"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
