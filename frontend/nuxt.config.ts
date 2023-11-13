// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    componentName: 'ColorScheme',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
})
