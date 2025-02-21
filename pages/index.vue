<script setup lang="ts">
useHead({
  titleTemplate: "Sử Luyện",
});
definePageMeta({
  layout: false,
});
const user = useCurrentUser();
</script>

<template>
  <div>
    <div v-if="user">
      <NuxtLayout name="dashboard">
        <Dashboard />
      </NuxtLayout>
    </div>
    <div v-else>
      <NuxtLayout name="default">
        <HomePage />
      </NuxtLayout>
    </div>
  </div>
</template>
