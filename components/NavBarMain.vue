<script setup lang="ts">
const user = useCurrentUser()
</script>

<template>
  <header
    class="sticky flex top-0 h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="flex items-center gap-8">
      <NuxtLink to="/home">
        <img
          src="/img/main_logo.png"
          alt="Sử Luyện"
          class="h-12 w-auto cursor-pointer" />
      </NuxtLink>
    </nav>
    <div class="flex h-6 items-center gap-4 ml-auto">
      <Button variant="ghost">
        <svg viewBox="0 0 448 512">
          <path
            d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
        </svg>
        Thông báo
      </Button>
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          aia
          type="text"
          placeholder="Tìm kiếm..."
          class="pl-10" />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <svg class="size-5" fill="#222" viewBox="0 0 512 512">
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </span>
      </div>
      <Separator orientation="vertical" />
      <div class="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="/img/logo.svg" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
</template>
