export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'heute.is',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  target: 'server',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/localStorageVuex', mode: 'client' },
    { src: '~/plugins/themeChange', mode: 'client' },
    { src: '~/plugins/mixpanel', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/apollo',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      css: {
        modules: false, // This fixes the tailwind hot reload bug
      },
    },
    extend(config, { isDev }) {
      // ..
      config.module.rules.push({
        test: /\.mp3$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    },
  },

  daisyui: {
    themes: ['dark', 'light'],
  },

  serverMiddleware: {
    '/api': '~/api',
  },

  auth: {
    strategies: {
      auth0: {
        domain: 'dev-eyz7fvbc.us.auth0.com',
        clientId: 'yEWOmk4GiSWYgi9afAEPmV1fhXrMp6Ox',
        audience: '',
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://graphql.fauna.com/graphql',
      },
    },
    authenticationType: 'Bearer',
  },
}
