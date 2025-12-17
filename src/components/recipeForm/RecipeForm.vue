<script setup>
import RecipeFormHeader from "./RecipeFormHeader.vue";
import RecipeFormBody from "./RecipeFormBody.vue";
import { useRecipeStore } from "@/stores/recipe";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  detailData: { type: Object, default: () => ({}) },
});

const recipeStore = useRecipeStore();
const router = useRouter();
const route = useRoute();

const handleSubmit = async (recipeData) => {
  if (props.isEdit) {
    await recipeStore.updateRecipe(route.params.id, recipeData);
  } else {
    await recipeStore.addRecipe(recipeData);
  }

  router.push("/user/recipes");
};
</script>

<template>
  <div class="container-md my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <RecipeFormHeader />
        <RecipeFormBody @submit-recipe="handleSubmit" :isEdit="isEdit" :detailData="detailData" />
      </div>
    </div>
  </div>
</template>
