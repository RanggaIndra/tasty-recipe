<script setup>
import { reactive, onMounted, watch } from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
  detailData: { type: Object, default: () => ({}) },
});

const recipeData = reactive({
  imageLink: "",
  name: "",
  description: "",
  category: "",
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
});

onMounted(() => {
  if (props.isEdit) {
    checkData();
  } else {
    recipeData.ingredients.push({ count: 1, value: "" });
    recipeData.directions.push({ count: 1, value: "" });
  }
});

watch(() => {
  if (props.isEdit) {
    checkData();
  }
});

const checkData = () => {
  Object.assign(recipeData, props.detailData);
};

const addIngredient = () => {
  recipeData.ingredients.push({
    count: recipeData.ingredients.length + 1,
    value: "",
  });
};

const deleteIngredient = (index) => {
  recipeData.ingredients.splice(index, 1);
};

const addDirection = () => {
  recipeData.directions.push({
    count: recipeData.directions.length + 1,
    value: "",
  });
};

const deleteDirection = (index) => {
  recipeData.directions.splice(index, 1);
};

const updateTotalTime = () => {
  recipeData.totalTime = parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime);
};

const checkImage = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    recipeData.imageLink = reader.result;
  });
};

const emit = defineEmits(["submit-recipe"]);

const submit = () => {
  if (recipeData.ingredients.length === 0 || recipeData.directions.length === 0) {
    alert("Please add at least one ingredient and direction");
    return;
  }
  emit("submit-recipe", recipeData);
};
</script>

<template>
  <div class="card p-4 border-0 shadow-sm">
    <form @submit.prevent="submit">
      <div class="mb-4">
        <BaseInput type="file" identity="recipeImage" label="Photo Recipe" isImage="true" @file-selected="checkImage">
          <div v-if="recipeData.imageLink" class="mt-2">
            <img :src="recipeData.imageLink" alt="Recipe Preview" class="img-thumbnail" style="height: 150px; object-fit: cover" />
          </div>
        </BaseInput>
      </div>

      <div class="mb-4">
        <BaseInput type="text" identity="recipeTitle" placeholder="Give your recipe a title" label="Recipe Title" v-model="recipeData.name" />
      </div>

      <div class="mb-4">
        <BaseTextArea identity="recipeDescription" label="Description" placeholder="Share story behind recipe and what makes it special" v-model="recipeData.description" />
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold">Category <span class="text-danger">*</span></label>
        <BaseSelect :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']" id="category" v-model="recipeData.category" />
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <BaseInput type="number" identity="prepTime" label="Prep Time (mins)" placeholder="0" v-model="recipeData.prepTime" @keyInput="updateTotalTime" />
        </div>
        <div class="col-md-4">
          <BaseInput type="number" identity="cookTime" label="Cook Time (mins)" placeholder="0" v-model="recipeData.cookTime" @keyInput="updateTotalTime" />
        </div>
        <div class="col-md-4">
          <BaseInput type="number" identity="totalTime" label="Total Time (mins)" placeholder="0" v-model="recipeData.totalTime" readonly="1" />
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label fw-semibold">Ingredients <span class="text-danger">*</span></label>
        <div class="d-flex align-items-center mb-2" v-for="(item, index) in recipeData.ingredients" :key="index">
          <div class="flex-grow-1 me-2">
            <BaseInput type="text" :identity="`ingredient-${index}`" placeholder="Ex: 1 cup sugar" label="" v-model="item.value" />
          </div>
          <div v-if="recipeData.ingredients.length > 1">
            <i class="fa-solid fa-trash text-danger" style="cursor: pointer" @click="deleteIngredient(index)"></i>
          </div>
        </div>
        <BaseButton type="button" class="btn-light border mt-2" @click="addIngredient"> + Add More </BaseButton>
      </div>

      <div class="mb-5">
        <label class="form-label fw-semibold">Directions <span class="text-danger">*</span></label>
        <div class="d-flex align-items-center mb-2" v-for="(item, index) in recipeData.directions" :key="index">
          <div class="flex-grow-1 me-2">
            <BaseInput type="text" :identity="`direction-${index}`" placeholder="Ex: Mix all ingredients" label="" v-model="item.value" />
          </div>
          <div v-if="recipeData.directions.length > 1">
            <i class="fa-solid fa-trash text-danger" style="cursor: pointer" @click="deleteDirection(index)"></i>
          </div>
        </div>
        <BaseButton type="button" class="btn-light border mt-2" @click="addDirection"> + Add More </BaseButton>
      </div>

      <div class="d-flex justify-content-end">
        <BaseButton type="button" class="btn-secondary me-2 px-4" @click="$router.push('/user/recipes')">Cancel</BaseButton>
        <BaseButton type="submit" class="btn-primary px-4">Submit</BaseButton>
      </div>
    </form>
  </div>
</template>
