<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipeStore } from "@/stores/recipe";
import RecipeForm from "@/components/recipeForm/RecipeForm.vue";

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();
const isLoading = ref(true);

onMounted(async () => {
  await recipeStore.getRecipeDetail(route.params.id);
  isLoading.value = false;
});
</script>

<template>
  <main>
    <div class="container-md my-5 py-5">
      <RecipeForm v-if="!isLoading" :isEdit="true" :detailData="recipeStore.recipeDetail" />
    </div>
  </main>
</template>
