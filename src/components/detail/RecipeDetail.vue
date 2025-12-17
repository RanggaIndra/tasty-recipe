<script setup>
import { useRecipeStore } from "@/stores/recipe";
import RecipeDescription from "../detail/RecipeDescription.vue";
import RecipeIngredients from "../detail/RecipeIngredients.vue";
import RecipeDirections from "../detail/RecipeDirections.vue";

const recipeStore = useRecipeStore();
</script>

<template>
  <div class="col-12 col-sm-8">
    <div v-if="recipeStore.recipeDetail.name">
      <RecipeDescription :recipe="recipeStore.recipeDetail" />
      <RecipeIngredients :ingredients="recipeStore.recipeDetail.ingredients" />
      <RecipeDirections :directions="recipeStore.recipeDetail.directions" />
    </div>

    <div v-else class="text-center">
      <p>Sedang memuat data resep...</p>
      <p class="text-muted small">Jika lama, pastikan koneksi internet lancar dan ID resep benar.</p>
    </div>
  </div>
</template>
