<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const db = useFirestore();
const user = useCurrentUser();

const { post } = defineProps(["post"]);

const commentField = ref<string>("");

const postLiked = ref<boolean>(false);
watchEffect(() => {
  postLiked.value = post.liked_users.includes(user.value?.uid);
});
const created_at = new Date(post.created_at.seconds * 1000).toLocaleString();

function parseMD(content: string) {
  content = content.replace(/#NEWLINE/g, "\n");
  const parsed = marked.parse(content) as string;
  return DOMPurify.sanitize(parsed);
}

async function reactPost() {
  if (postLiked.value) {
    await updateDoc(doc(db, "posts", post.id), {
      likes: increment(-1),
      liked_users: arrayRemove(user.value?.uid),
    });
  } else {
    await updateDoc(doc(db, "posts", post.id), {
      likes: increment(1),
      liked_users: arrayUnion(user.value?.uid),
    });
  }
}

const commentContent = ref<string>("");

async function createComment() {
  await updateDoc(doc(db, "posts", post.id), {
    comments: arrayUnion({
      content: commentContent.value,
      created_at: new Date(),
      
    }),
  });
}
</script>

<template>
  <div class="grid border p-6 rounded-lg w-full shadow-md hover:bg-slate-100">
    <div class="flex items-center gap-4">
      <Avatar size="base">
        <AvatarImage
          src="/img/logo.svg"
          alt="@radix-vue"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="flex flex-col">
        <h2 class="font-bold text-xl">
          {{ post.header ?? "Không có tiêu đề" }}
        </h2>
        <span
          >Được đăng bởi
          {{ post.user_id }}
          vào
          {{ created_at }}
        </span>
      </div>
      <div></div>
    </div>
    <div>
      <div
        class="prose prose-lg p-2"
        v-html="parseMD(post.content)"
        v-if="post.content"
      ></div>
    </div>

    <div class="mt-2">
      <Button
        variant="ghost"
        @click="reactPost"
      >
        <svg
          v-if="postLiked"
          viewBox="0 0 512 512"
        >
          <path
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 512 512"
        >
          <path
            d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
          />
        </svg>

        {{ post.likes }}
      </Button>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="ghost"
            ><svg viewBox="0 0 640 512">
              <path
                d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"
              />
            </svg>
            Bình luận
          </Button>
        </DialogTrigger>
        <DialogContent class="h-[75vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Bình Luận</DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          <div v-if="post.comments.length > 0">
            <PostComment
              v-for="(comment, index) in post.comments"
              :comment="comment"
              :key="index"
            />
          </div>
          <p
            v-else
            class="text-center text-gray-500"
          >
            Hãy là người đầu tiên bình luận!
          </p>
          <div class="flex w-full mt-auto items-center gap-1.5">
            <Input placeholder="Nhập bình luận" />
            <Button>Đăng bình luận</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button variant="ghost">
        <svg viewBox="0 0 576 512">
          <path
            d="M400 255.4l0-15.4 0-32c0-8.8-7.2-16-16-16l-32 0-16 0-46.5 0c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112l48 0 16 0 32 0c8.8 0 16-7.2 16-16l0-32 0-15.4L506 160 400 255.4zM336 240l16 0 0 48c0 17.7 14.3 32 32 32l3.7 0c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7L352 80l-16 0-32 0-16 0c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4l2.5 0c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5c0 0 0 0 0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5l14.5 0 32 0zM72 32C32.2 32 0 64.2 0 104L0 440c0 39.8 32.2 72 72 72l336 0c39.8 0 72-32.2 72-72l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 64c0 13.3-10.7 24-24 24L72 464c-13.3 0-24-10.7-24-24l0-336c0-13.3 10.7-24 24-24l64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L72 32z"
          />
        </svg>
        Chia sẻ
      </Button>
    </div>
  </div>
</template>
