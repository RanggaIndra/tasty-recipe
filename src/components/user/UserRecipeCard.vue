<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  recipe: { type: Object, required: true },
});

const emit = defineEmits(["delete-recipe"]);
const router = useRouter();

const formatDate = (dateInMs) => {
  if (!dateInMs) return new Date().toDateString();
  return new Date(dateInMs).toDateString();
};

const navigateToDetail = () => {
  router.push(`/recipe/${props.recipe.id}`);
};
</script>

<template>
  <div class="col-md-6 col-12 mb-4">
    <div class="card h-100 border-0 shadow-sm rounded-3 p-3">
      <div class="d-flex">
        <div class="flex-grow-1 d-flex flex-column justify-content-between">
          <div @click="navigateToDetail" style="cursor: pointer">
            <p class="mb-1 text-muted small">{{ recipe.category }}</p>
            <h5 class="fw-bold mb-2 text-truncate" style="max-width: 200px">{{ recipe.name }}</h5>
            <p class="text-muted small mb-0">{{ formatDate(recipe.createdAt) }}</p>
          </div>

          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-outline-danger btn-sm rounded-pill px-4" @click="$emit('delete-recipe', recipe.id)">Delete</button>
            <button class="btn btn-outline-primary btn-sm rounded-pill px-4" @click="$router.push(`/recipe/edit/${recipe.id}`)">Edit</button>
          </div>
        </div>

        <div class="ms-3" style="width: 120px; height: 120px; flex-shrink: 0" @click="navigateToDetail">
          <img :src="recipe.imageLink" :alt="recipe.name" class="w-100 h-100 rounded-3" style="object-fit: cover; cursor: pointer" />
        </div>
      </div>
    </div>
  </div>
</template>
