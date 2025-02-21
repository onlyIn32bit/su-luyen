<script setup lang="ts">
useHead({
  titleTemplate: "Sử Luyện - Tài Liệu Học Tập",
});
definePageMeta({
  layout: "default",
});

const { data: docs } = await useAsyncData(() => queryCollection('content').all())

console.log(docs)
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4">Tài Liệu Học Tập</h1>
    <p class="text-lg mb-8">Dưới đây là danh sách các tài liệu học tập mà bạn có thể xem và tải về.</p>
    
    <ul class="list-disc list-inside">
      <li>
        <a href="/documents/document1.pdf" class="text-blue-500 hover:underline" download>Tài liệu 1</a>
      </li>
      <li>
        <a href="/documents/document2.pdf" class="text-blue-500 hover:underline" download>Tài liệu 2</a>
      </li>
      <li>
        <a href="/documents/document3.pdf" class="text-blue-500 hover:underline" download>Tài liệu 3</a>
      </li>
      <li>
        <a href="/documents/document4.pdf" class="text-blue-500 hover:underline" download>Tài liệu 4</a>
      </li>
      <li>
        <a href="/documents/document5.pdf" class="text-blue-500 hover:underline" download>Tài liệu 5</a>
      </li>
    </ul>
  </div>
</template>
