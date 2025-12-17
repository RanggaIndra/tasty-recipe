<script setup>
import { readonly } from "vue";

defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  identity: { type: String, required: true },
  placeholder: { type: String, required: false },
  readonly: { type: String, required: true, default: "0" },
  isImage: { type: Boolean, required: false, default: false },
  modelValue: { type: [String, Number, File] },
});

const emit = defineEmits(["update:modelValue", "file-selected", "keyInput"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  emit("file-selected", file);
};
</script>

<template>
  <div :class="{ 'input-group': isImage }">
    <label :for="identity" class="fw-semibold"> {{ label }} <span style="color: #cb3a31">*</span> </label>

    <div v-if="isImage" class="w-100">
      <slot></slot>
    </div>

    <input v-if="isImage" class="form-control d-none" type="file" :id="identity" accept="image/*" @change="handleFileChange" :readonly="readonly === '1'" />

    <input v-else class="form-control" :type="type" :id="identity" :placeholder="placeholder" :value="modelValue" @input="updateValue" @keyup="$emit('keyInput', $event.target.value)" :readonly="readonly === '1'" />
  </div>
</template>
