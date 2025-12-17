<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import UserMenu from "../user/UserMenu.vue";
import PersonalInfo from "../user/PersonalInfo.vue";
import UserRecipe from "../user/UserRecipe.vue";
import FavouriteRecipe from "../user/FavouriteRecipe.vue";

const components = {
  "Personal Info": PersonalInfo,
  "My Recipes": UserRecipe,
  "Favorited Recipes": FavouriteRecipe,
};

const activeComponent = ref("Personal Info");
</script>

<template>
  <div class="container-md my-5 py-5">
    <div class="row">
      <UserMenu :selectedMenu="activeComponent" @changeComponent="activeComponent = $event" />

      <div class="col-lg-9">
        <component :is="components[activeComponent]" />
      </div>
    </div>
  </div>
</template>
