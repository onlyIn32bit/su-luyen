<script setup lang="ts">
const user = useCurrentUser();

const logout = async () => {
};
</script>

<template>
  <header
    class="sticky flex top-0 h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
  >
    <nav class="flex items-center gap-8">
      <NuxtLink to="/home">
        <img
          src="/img/main_logo.png"
          alt="Sử Luyện"
          class="h-12 w-auto cursor-pointer"
        />
      </NuxtLink>
      <ul
        class="hidden flex-col gap-6 text-md font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-md lg:gap-6"
      >
        <li>
          <NuxtLink to="/home">Trang chủ</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">Other</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex h-6 items-center gap-4 ml-auto">
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          aia
          type="text"
          placeholder="Search..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <svg class="size-5" viewBox="0 0 512 512">
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </span>
      </div>
      <Separator orientation="vertical" />
      <div v-if="user" class="flex gap-4 items-center">
        <NuxtLink to="/">
          <Button variant="outline">Đến trang chính</Button></NuxtLink
        >
        <Button @click="logout">Log Out</Button>
      </div>
      <div v-else class="flex gap-4 items-center">
        <NuxtLink to="/login"><Button>Đăng nhập</Button></NuxtLink>
        <NuxtLink to="/register"
          ><Button variant="secondary">Đăng kí</Button></NuxtLink
        >
      </div>
    </div>
  </header>
</template>
