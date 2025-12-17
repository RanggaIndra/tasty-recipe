<script setup>
import SearchMenu from "./SearchMenu.vue";
import SignupMenu from "./SignupMenu.vue";
import { computed, ref, watch } from "vue";
import ProfileMenu from "./ProfileMenu.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const menuComponent = computed(() => {
  return authStore.isAuthenticated ? ProfileMenu : SignupMenu;
});
</script>

<template>
  <div class="header__navbar row justify-content-between align-items-center" style="width: 450px">
    <SearchMenu />
    <component :is="menuComponent" />
  </div>
</template>
