// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['leaflet/dist/leaflet.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'pwas',
      short_name: 'pwas',
      description: 'dsad',
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false,
      extensions: ['vue'],
      extendComponent(component) {
        component.pascalName = component.pascalName.replace('Component', '');
        component.kebabName = component.kebabName.replace('component', '');
      },
    },
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'tr',
      },

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/logo.ico',
        },
      ],
    },
  },
});
