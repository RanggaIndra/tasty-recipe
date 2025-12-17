<script setup>
import { ref, reactive, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "@/components/ui/BaseInput.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const isEditing = ref(false);

const userData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  imageLink: null,
});

const startEditing = () => {
  userData.firstname = user.value.firstname;
  userData.lastname = user.value.lastname;
  userData.username = user.value.username;
  userData.email = user.value.email;
  userData.imageLink = user.value.photoURL || user.value.imageLink;

  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const handleFileChange = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    userData.imageLink = reader.result;
  });
};

const handleUpdate = async () => {
  try {
    await authStore.updateUser(userData);
    alert("Profile updated successfully!");
    isEditing.value = false;
  } catch (error) {
    alert("Failed to update profile.");
  }
};
</script>

<template>
  <div class="card border-0 shadow-sm p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="card-title fw-bold mb-0">My Basic Info</h5>

      <button v-if="!isEditing" class="btn btn-outline-primary btn-sm rounded-pill px-3" @click="startEditing">Edit Profile</button>
    </div>

    <div v-if="!isEditing">
      <div class="d-flex align-items-center mb-4">
        <img :src="user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.firstname" class="rounded-circle me-3 border" width="100" height="100" style="object-fit: cover" alt="Profile" />
        <div>
          <h5 class="mb-0 fw-bold">{{ user?.firstname }} {{ user?.lastname }}</h5>
          <p class="text-muted mb-0">@{{ user?.username }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-3 border-bottom pb-2">
          <span class="text-muted small d-block mb-1">Full Name</span>
          <span class="fw-semibold">{{ user?.firstname }} {{ user?.lastname }}</span>
        </div>
        <div class="col-12 mb-3 border-bottom pb-2">
          <span class="text-muted small d-block mb-1">Username</span>
          <span class="fw-semibold">{{ user?.username }}</span>
        </div>
        <div class="col-12 mb-3 border-bottom pb-2">
          <span class="text-muted small d-block mb-1">Email Address</span>
          <span class="fw-semibold">{{ user?.email }}</span>
        </div>
      </div>
    </div>

    <form v-else @submit.prevent="handleUpdate">
      <div class="text-center mb-4">
        <img :src="user?.imageLink || user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.firstname" class="rounded-circle me-3 border" width="100" height="100" style="object-fit: cover" alt="Profile" />
        <BaseInput type="file" identity="profileImage" label="Change Photo" isImage="true" @file-selected="handleFileChange" />
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <BaseInput type="text" identity="firstname" label="First Name" v-model="userData.firstname" />
        </div>
        <div class="col-md-6 mb-3">
          <BaseInput type="text" identity="lastname" label="Last Name" v-model="userData.lastname" />
        </div>
      </div>

      <div class="mb-3">
        <BaseInput type="text" identity="username" label="Username" v-model="userData.username" readonly="1" />
        <small class="text-muted fst-italic">Username cannot be changed.</small>
      </div>

      <div class="mb-4">
        <BaseInput type="email" identity="email" label="Email" v-model="userData.email" readonly="1" />
        <small class="text-muted fst-italic">Email cannot be changed.</small>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-light rounded-pill px-4 border" @click="cancelEditing">Cancel</button>
        <button type="submit" class="btn btn-primary rounded-pill px-4">Save Changes</button>
      </div>
    </form>
  </div>
</template>
