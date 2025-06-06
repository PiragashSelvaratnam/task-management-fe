<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import Button from "./Button.vue";
import CustomInput from "./CustomInput.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

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
  }),
);

const { meta,errors, values, handleSubmit, defineField,isSubmitting } = useForm({
  initialValues: {
    email: 'test@example.com',
    password: 'p@$$w0rd',
  },
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().min(1).email(),
      password: z.string().min(6),
    }),
  ),
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField('password');

const handleLogin = handleSubmit(async (value) => {
  // alert(JSON.stringify(values, null, 2));
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Submitted', JSON.stringify(values, null, 2));
      resolve();
    }, 2000);
  });
  // try {
  //   isLoading.value = true;
  //   const response = await fetch("http://127.0.0.1:8000/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: loginFrom.email,
  //       password: loginFrom.password,
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log("Response:", data.user);
  //   authStore.setUser(data.user);
  //   authStore.setAccessToken(data.accessToken);
  //   isLoading.value = false;

  //   await router.push({ name: "Tasks" });
  // } catch (err) {
  //   isLoading.value = false;
  //   if (err instanceof Error) {
  //     console.error("Login error:", err.message);
  //     // Object.assign(
  //     //   $externalResults,
  //     //   convertDotNotatedValidationErrorsAToObject(error.data.errors)
  //     // );
  //   }
  // }
});
</script>

<template>
  <div
    class="flex w-full h-screen flex-col p-4 bg-gray-100 items-center justify-center"
  >
    {{ loginFrom.email }}
    <div
      class="flex flex-col justify-center items-center bg-gray-100 w-[90%] max-w-md mx-auto p-6 rounded shadow"
    >
      <CustomInput v-model="email" label="Email" v-bind="emailAttrs" :errors="errors.email"/>
      <CustomInput v-model="password" label="Password" v-bind="passwordAttrs" :errors="errors.password"/>
    </div>
    <div class="flex pt-4 justify-center items-center w-[70%] max-w-md mx-auto">
      <Button :title="isSubmitting ? 'Loging..' : 'Login'" @handle-click="handleLogin" :disabled="!meta.touched || isSubmitting"/>
    </div>
  </div>
</template>

<style scoped></style>
