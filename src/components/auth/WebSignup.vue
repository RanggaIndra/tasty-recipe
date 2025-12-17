<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

import defaultUserImage from "@/assets/images/default-profile.png";

const authStore = useAuthStore();

const signupData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  imageLink: null,
});

const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMatch = ref("none");
const confirmPasswordMatch = ref("none");

const checkImage = (file) => {
  if (!file) return;

  signupData.imageLink = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};

const passwordCheck = () => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block";
  } else {
    passwordStatusDisplay.value = "none";
  }
};

const confirmationPasswordCheck = () => {
  if (signupData.confirmPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }

  if (signupData.password !== signupData.confirmPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }

  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
};

const register = async () => {
  if (signupData.password.length < 8 || signupData.password !== signupData.confirmPassword) {
    alert("Please fix the errors before submitting the form.");
    return;
  }

  try {
    await authStore.registerUser(signupData);
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.code === "auth/email-already-in-use") {
      alert("The email address is already in use by another account.");
    } else {
      alert("An error occurred during registration. Please try again.");
    }
  }
};
</script>

<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <img src="@/assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>

      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <BaseInput type="text" identity="firstname" placeholder="Ex: Jack" label="Firstname" v-model="signupData.firstname" />
          </div>

          <div class="col-md-6">
            <BaseInput type="text" identity="lastname" placeholder="Ex: Doe" label="Lastname" v-model="signupData.lastname" />
          </div>
        </div>

        <div class="my-4">
          <BaseInput type="text" identity="username" placeholder="Your username" label="Username" v-model="signupData.username" />
        </div>

        <div class="my-4">
          <BaseInput type="email" identity="email" placeholder="Your email address" label="Email" v-model="signupData.email" />
        </div>

        <div class="my-4">
          <BaseInput type="password" identity="password" placeholder="Your password" label="Password" v-model="signupData.password" @keyInput="passwordCheck" />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: passwordStatusDisplay }">The password field must be at least 8 characters</p>
        </div>

        <div class="my-4">
          <BaseInput type="password" identity="confirmPassword" placeholder="Same with password" label="Confirmation Password" v-model="signupData.confirmPassword" @keyInput="confirmationPasswordCheck" />
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesNotMatch }">The password confirmation does not match</p>
          <p class="text-success mt-1 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordMatch }">The password confirmation does match</p>
        </div>

        <div class="my-4">
          <BaseInput type="file" identity="recipeImage" label="Profile Photo" :isImage="true" @file-selected="checkImage">
            <label for="recipeImage" style="cursor: pointer">
              <div class="border p-1 mt-2 rounded-circle d-flex align-items-center justify-content-center" style="width: 150px; height: 150px; margin: 0 auto; position: relative">
                <img :src="signupData.imageLink || defaultUserImage" class="rounded-circle" style="width: 100%; height: 100%; object-fit: cover" alt="Profile Preview" />

                <div class="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 border">
                  <i class="fa-solid fa-camera"></i>
                </div>
              </div>
            </label>
          </BaseInput>
        </div>

        <BaseButton class="login w-100 my-3" type="submit">Register</BaseButton>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?
          <span style="color: #4c4ddc">
            <router-link to="/login" class="text-decoration-none">Login</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
