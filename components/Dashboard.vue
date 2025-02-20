<script setup lang="ts">
import { useFirestore, useCollection } from "vuefire";
import { addDoc, collection } from "firebase/firestore";
const db = useFirestore();

const posts = useCollection(collection(db, "posts"));
const postContent = ref("");
const isLoading = ref(false);

async function createPost() {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      content: postContent.value,
      time: new Date(),
    });
    postContent.value = "";
    console.log("sent", docRef.id);
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.");
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="grid grid-cols-1 grid-rows-[4rem_1fr] gap-4 p-8">
    <div>
      <Dialog>
        <DialogTrigger as-child>
          <Button>Tạo bài đăng mới</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đăng bài</DialogTitle>
            <DialogDescription>
              Bạn muốn chia sẻ điều gì đó với mọi người?
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid w-full gap-1.5">
              <Label for="header">Tiêu đề bài viết</Label>
              <Input
                id="header"
                class="col-span-3"
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>
            <div class="grid w-full gap-1.5">
              <Label for="message">Nội dung bài viết</Label>
              <Textarea
                class="min-h-44"
                id="message"
                placeholder="Bạn đang có suy nghĩ gì?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"> Đăng </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="flex flex-col w-full gap-4">
      <PostWrapper
        v-for="(post, index) in posts"
        :post="post"
        :key="index"
      />
    </div>
  </div>
</template>
