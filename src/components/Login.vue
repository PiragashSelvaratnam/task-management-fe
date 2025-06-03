<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { reactive, ref, toRefs } from "vue";

// defineProps<{ msg?: string }>()
const isLoading = ref(false);
let $externalResults = reactive({});
const loginFrom = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required,},
};

const formValidate = useVuelidate(rules, toRefs(loginFrom), {
  $externalResults: $externalResults,
});

const onLogin = async () => {
  formValidate.value.$touch();
  if (!formValidate.value.$invalid) {
    try {
      isLoading.value = true;
      const response = (await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginFrom.email,
          password: loginFrom.password,
        }),
      }));
      isLoading.value = false;

      // await router.push({ name: "register.submitted" });
    } catch (err) {
      isLoading.value = false;
      if (err instanceof Error) {
        console.error("Login error:", err.message);
        // Object.assign(
        //   $externalResults,
        //   convertDotNotatedValidationErrorsAToObject(error.data.errors)
        // );
      }
      formValidate.value.$touch();
    }
  }
};
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onLogin">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              v-model="formValidate.email.$model"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
            />
          </div>
          <div
            v-for="error of formValidate.email.$errors"
            :key="error.$uid"
          >
            <div style="color: red;">{{ error.$message }}</div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              v-model="formValidate.password.$model"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div
            
            v-for="error of formValidate.password.$errors"
            :key="error.$uid"
          >
            <div style="color: red;">{{ error.$message }}</div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
