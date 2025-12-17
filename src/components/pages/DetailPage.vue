<script setup>
import RecipeDetail from "../detail/RecipeDetail.vue";
import WebHeader from "../header/WebHeader.vue";
import WebFooter from "../footer/WebFooter.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipe";

const route = useRoute();
const recipeStore = useRecipeStore();

onMounted(async () => {
  await recipeStore.getRecipeDetail(route.params.id);
});
</script>

<template>
  <WebHeader />

  <main>
    <div class="container-md my-5 py-5">
      <div class="row my-4">
        <div class="col-12 col-sm-2"></div>

        <RecipeDetail />

        <div class="col-12 col-sm-2"></div>
      </div>
    </div>
  </main>

  <WebFooter />
</template>
