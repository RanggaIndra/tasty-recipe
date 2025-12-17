<script setup>
import { onMounted } from "vue";
import { useRecipeStore } from "@/stores/recipe";
import RecipeList from "../recipe/RecipeList.vue";

import RECIPE_DATA from "@/assets/js/recipes.js";

const recipeStore = useRecipeStore();

onMounted(async () => {
  await recipeStore.getRecipesData();
});

const seedData = async () => {
  if (confirm("Apakah kamu yakin ingin mengupload data dummy ke Firebase?")) {
    try {
      for (const recipe of RECIPE_DATA) {
        await recipeStore.addRecipe(recipe);
      }
      alert("Data berhasil diupload! Halaman akan refresh.");
      window.location.reload();
    } catch (error) {
      console.error("Gagal upload:", error);
    }
  }
};
</script>

<template>
  <div class="container-fluid py-4">
    <div class="header__title-content mb-5">
      <h1 class="header__title-content--title">All recipes</h1>
      <p class="header__title-content--subtitle">Discover our best recipes for every meal, from breakfast to dinner, and everything in between.</p>
    </div>

    <!-- <button v-if="recipeStore.recipes.length === 0" class="btn btn-primary mt-3" @click="seedData">Isi Data Dummy ke Firebase</button> -->

    <RecipeList :recipes="recipeStore.recipes" />
  </div>
</template>
