// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['leaflet/dist/leaflet.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'prompt', // Kullanıcıdan manuel yükleme istemi almak için
    manifest: {
      name: 'My PWA App',
      short_name: 'PWA App',
      description: 'Nuxt 3 ile PWA uygulaması',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/indir.jpeg',
          sizes: '192x192',
          type: 'image/jpeg',
        },
        {
          src: '/indir.jpeg',
          sizes: '512x512',
          type: 'image/jpeg',
        },
      ],
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
});
