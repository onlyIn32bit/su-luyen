// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-vuefire', 'shadcn-nuxt'],
  future: {
    typescriptBundlerResolution: false,
  },
  vue: {
    compilerOptions:
    {
      isCustomElement: (tag: string) => tag.startsWith('v-' && 'nuxt')
    },
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyBJhUpV2FUaIap-D8-Zd3AysEV4dDra9jA",
      authDomain: "su-luyen.firebaseapp.com",
      projectId: "su-luyen",
      storageBucket: "su-luyen.firebasestorage.app",
      messagingSenderId: "48327872525",
      appId: "1:48327872525:web:7f0cffd9be8f7860cdc544",
      measurementId: "G-VR39BXQFZ3",
    },
    auth: {
      enabled: true,
    }
  },
});