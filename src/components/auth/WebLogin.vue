<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";

const authStore = useAuthStore();

const loginData = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.loginUser(loginData);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff; width: 400px; min-height: 100vh" class="p-5 m-auto login-form">
      <div class="text-center">
        <img src="@/assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>

      <form @submit.prevent="login">
        <div class="my-4">
          <BaseInput type="email" identity="email" placeholder="Your email address" label="Email" v-model="loginData.email" />
        </div>
        <div class="my-4">
          <BaseInput type="password" identity="password" placeholder="Your password" label="Password" v-model="loginData.password" />
        </div>

        <BaseButton class="login w-100 my-3">Login</BaseButton>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?
          <span style="color: #4c4ddc">
            <router-link to="/signup" class="text-decoration-none"> Signup </router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
