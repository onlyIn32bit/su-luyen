<script setup lang="ts">
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { signInWithEmailAndPassword } from "firebase/auth";

useHead({
  titleTemplate: "Đăng nhập - Sử Luyện",
});
definePageMeta({
  layout: "auth",
});

const db = useFirestore()
const auth = useFirebaseAuth()!;

const formSchema = z.object({
  username: z.string(),
  // email: z.string().email(),
  password: z.string()
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = async (values: Record<string, any>) => {
  signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};
</script>

<template>
  <Card class="mx-auto max-w-sm mt-10 shadow-md">
    <CardHeader>
      <CardTitle class="text-2xl"> Đăng nhập </CardTitle>
      <CardDescription>
        Nhập email để đăng nhập vào tài khoản của bạn
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <AutoForm
        :schema="formSchema"
        :form="form"
        :field-config="{
          username: {
            label: 'Tên người dùng',
            inputProps: {
              placeholder: 'example',
              autocomplete: 'username'
            },
          },
          email: {
            label: 'Email',
            inputProps: {
              placeholder: 'name@example.com',
              type: 'email',
              autocomplete: 'email'
            },
          },
          password: {
            label: 'Mật khẩu',
            inputProps: {
              placeholder: '••••••••••',
              type: 'password',
              autocomplete: 'new-password',
            },
          },
        }"
        @submit="onSubmit"
      >
        <Button
          class="w-full mt-4"
          type="submit"
          :disabled="loading"
          >Đăng nhập</Button
        >
      </AutoForm>
        <div class="grid gap-4">
          <Separator
            direction="horizontal"
            label="Hoặc"
          />
          <Button
            variant="outline"
            class="w-full"
          >
            <svg
              class="size-6"
              viewBox="0 0 488 512"
            >
              <path
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            Đăng nhập bằng Google
          </Button>
          <Button
            variant="outline"
            class="w-full"
          >
            <svg
              class="size-6"
              viewBox="0 0 512 512"
            >
              <path
                d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
              />
            </svg>
            Đăng nhập bằng Facebook
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Chưa có tài khoản?
          <NuxtLink
            to="/register"
            class="underline"
          >
            Tạo tài khoản
          </NuxtLink>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
