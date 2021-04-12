export default {
  router: {
    linkActiveClass: 'active',
    middleware:['notAuthenticated'],
    extendRoutes(routes, resolve) {
      routes.splice(0)
      const _routes = [{
        path: '/',
        component: resolve(__dirname, 'pages/layout/'),
        children: [{
            path: '',
            name: 'home',
            component: resolve(__dirname, 'pages/home/')
          },
          {
            path: 'login',
            name: 'login',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: 'register',
            name: 'register',
            component: resolve(__dirname, 'pages/login/')
          },
          {
            path: '/profile/:username',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile/')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings/')
          },
          {
            path: '/editor',
            name: 'editor',
            component: resolve(__dirname, 'pages/editor/')
          },
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article/')
          }
        ]
      }, ]
      routes.push(..._routes)
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'yex-realWorld',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/request.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
