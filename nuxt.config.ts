// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['leaflet/dist/leaflet.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
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
