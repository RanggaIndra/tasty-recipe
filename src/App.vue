<script setup>
import { RouterView } from "vue-router";
import WebHeader from "./components/header/WebHeader.vue";
import WebFooter from "./components/footer/WebFooter.vue";
</script>

<template>
  <div>
    <WebHeader />
    <RouterView />
    <WebFooter />
  </div>
</template>

<style scoped></style>
