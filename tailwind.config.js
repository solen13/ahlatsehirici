module.exports = {
  content: [
    './components/**/*.{js,vue,ts,html}',
    './layouts/**/*.vue',
    './pages/**/*.{vue,html}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      // you can configure the container to be centered

      // or have default horizontal padding

      // default breakpoints but with 40px removed
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1080px',
      },
    },
  },
  plugins: [],
};
