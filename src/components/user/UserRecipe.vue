<script setup>
import { computed } from "vue";
import { useRecipeStore } from "@/stores/recipe";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import UserRecipeCard from "./UserRecipeCard.vue";

const recipeStore = useRecipeStore();
const authStore = useAuthStore();
const router = useRouter();

// Filter resep: hanya tampilkan resep milik user yang sedang login
const recipes = computed(() => {
  const allRecipes = recipeStore.recipes;
  const currentUser = authStore.user;

  if (!allRecipes || !currentUser) return [];
  return allRecipes.filter((recipe) => recipe.username === currentUser.username);
});

const goToAddRecipe = () => {
  router.push("/recipe/new");
};

const deleteRecipe = async (id) => {
  await recipeStore.deleteRecipe(id);
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold mb-0">My Recipe</h5>
      <button class="btn btn-primary rounded-pill px-4" @click="goToAddRecipe"><i class="fa-solid fa-plus me-2"></i> Add Recipe</button>
    </div>

    <div class="row" v-if="recipes.length > 0">
      <UserRecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @delete-recipe="deleteRecipe" />
    </div>

    <div v-else class="text-center py-5">
      <p class="text-muted">You don't have any recipes yet.</p>
    </div>
  </div>
</template>
