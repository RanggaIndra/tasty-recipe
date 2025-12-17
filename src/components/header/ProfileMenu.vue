<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logoutUser();
  router.push("/");
};
</script>

<template>
  <div class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none" style="text-align: right">
    <i class="fa-solid fa-user" style="color: #4c4ddc"></i>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"> My Profile </a>
        <ul class="dropdown-menu">
          <router-link :to="'/user/' + authStore.user?.uid" class="dropdown-item"> My Profile </router-link>

          <router-link :to="'/user/' + authStore.user?.uid" class="dropdown-item"> Favorited Recipes </router-link>

          <router-link :to="'/user/' + authStore.user?.uid" class="dropdown-item"> My Recipes </router-link>

          <li><hr class="dropdown-divider" /></li>

          <li class="dropdown-item cursor-pointer" @click="handleLogout">Logout</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
