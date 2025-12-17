<script setup>
defineProps({
  identity: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: false },
  modelValue: { type: String },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="mb-3">
    <label :for="identity" class="form-label fw-semibold"> {{ label }} <span style="color: #cb3a31">*</span> </label>
    <textarea class="form-control" :id="identity" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" rows="4"></textarea>
  </div>
</template>
