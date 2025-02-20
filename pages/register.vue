<script setup lang="ts">
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

useHead({
  titleTemplate: "Tạo tài khoản - Sử Luyện",
});
definePageMeta({
  layout: "auth",
});

const auth = useFirebaseAuth()!;
const db = useFirestore();

const loading = ref(false);

const formSchema = z
  .object({
    username: z
      .string({ required_error: "Hãy nhập tên đăng nhập" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Tên người dùng chỉ chứa kí tự chữ, số và dấu gạch dưới",
      })
      .min(3, { message: "Tên người dùng phải có ít nhất 3 kí tự" })
      .max(50, { message: "Tên người dùng không được quá 50 kí tự" }),
    email: z
      .string({ required_error: "Hãy nhập email" })
      .email({ message: "Email không hợp lệ" }),
    password: z
      .string({ required_error: "Hãy nhập mật khẩu" })
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 kí tự",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message:
          "Mật khẩu phải chứa ít nhất 1 kí tự viết hoa, 1 kí tự viết thường và 1 số",
      }),
    confirmPassword: z.string({ required_error: "Hãy nhận xác mật khẩu" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const onSubmit = async (values: Record<string, any>) => {
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async () => {
      await setDoc(doc(db, "users"), {
        username: values.username,
        grade: 0,
        role: "Student",
        studied: [],
      });
      console.log("Registered");
      alert("Đã đăng kí");
      await navigateTo("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, ":", errorMessage);
    });
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl"> Đăng ký </CardTitle>
      <CardDescription> Nhập thông tin để tạo tài khoản </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4">
      <AutoForm
        :schema="formSchema"
        :form="form"
        :field-config="{
          username: {
            label: 'Tên người dùng',
            description: 'Sử dụng để đăng nhập vào ứng dụng',
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
          confirmPassword: {
            label: 'Xác nhận mật khẩu',
            inputProps: {
              placeholder: '••••••••••',
              type: 'password',
              autocomplete: 'comfirm-password'
            },
          },
        }"
        @submit="onSubmit"
      >
        <Button
          class="w-full mt-4"
          type="submit"
          :disabled="loading"
          >Tiếp tục</Button
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
          Tiếp tục với Google
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
          Tiếp tục với Facebook
        </Button>
        <div class="mt-4 text-center text-sm">
          Đã có tài khoản?
          <NuxtLink
            to="/login"
            class="underline"
          >
            Đăng nhập
          </NuxtLink>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
