<script setup>
import { computed } from "vue";

const props = defineProps({
  selectedMenu: String,
});

const emit = defineEmits(["changeComponent"]);

const menuItems = [
  { name: "Personal Info", componentName: "Personal Info" },
  { name: "My Recipes", componentName: "My Recipes" },
  { name: "Favorited Recipes", componentName: "Favorited Recipes" },
];

const changeMenu = (name) => {
  emit("changeComponent", name);
};
</script>

<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group">
      <li v-for="item in menuItems" :key="item.name" class="list-group-item cursor-pointer" :class="{ active: selectedMenu === item.componentName }" @click="changeMenu(item.componentName)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.active {
  background-color: #efefef;
  color: #000;
  font-weight: bold;
  border-color: #ddd;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
