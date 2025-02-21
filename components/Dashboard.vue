<script setup lang="ts">
import { useFirestore, useCollection } from "vuefire";
import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const db = useFirestore();
const user = useCurrentUser();

const posts = useCollection(query(collection(db, "posts"), orderBy("created_at", "desc")));
const isLoading = ref(false);

const createPostSchema = z.object({
  header: z
    .string({ required_error: "Hãy nhập tiêu đề" })
    .min(3, { message: "Tiêu đề cần tối thiểu 3 kí tự" })
    .max(64, { message: "Tiêu đề tối đa 64 kí tự!" }),
  content: z
    .string({ required_error: "Hãy nhập nội dung bài viết" })
    .max(1024, { message: "Nội dung tối đa 1024 kí tự!" }),
});

const createPostForm = useForm({
  validationSchema: toTypedSchema(createPostSchema),
});

const onSubmitPost = async (values: Record<string, any>) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      from: user.value?.uid,
      header: values.header,
      content: values.content.replace(/\n/g, "#NEWLINE"),
      comments: [],
      created_at: new Date(),
      updated_at: new Date(),
      deleted: false,
      likes: 0,
      liked_users: []
    });
    console.log("sent", docRef.id);
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.");
  } finally {
    isLoading.value = false;
  }
};
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
          <AutoForm
            :schema="createPostSchema"
            :form="createPostForm"
            :field-config="{
              header: {
                label: 'Tiêu đề bài viết',
                inputProps: {
                  placeholder: 'Nhập tiêu đề',
                },
              },
              content: {
                component: 'textarea',
                description: 'Tuân thủ quy tắc cộng đồng!',
              },
            }"
            @submit="onSubmitPost"
          >
            <Button type="submit"> Đăng </Button>
          </AutoForm>
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
