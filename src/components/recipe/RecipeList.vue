<script setup>
import RecipeCard from "./RecipeCard.vue";

defineProps({
  recipes: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="recipe__list-recipe row">
    <RecipeCard v-for="item in recipes" :key="item.id" :recipe="item" />
  </div>
</template>
