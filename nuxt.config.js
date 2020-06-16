require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Matthew Barnes Portfolio',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/api',
    '~/plugins/vue-markdown'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',

    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Router stuff
   */
  router: {
    middleware: 'store-populator'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

    plugins: [
      /**
       * Allows client to use environment variables too (true equality)
       */
      new webpack.DefinePlugin({
        "process.env.VERSION_API": JSON.stringify(process.env.VERSION_API),
        "process.env.API": JSON.stringify(process.env.API),
        "process.env.TOKEN": JSON.stringify(process.env.TOKEN)
      })
    ],

    // Babel stuff
    babel: {
      presets({ isServer }) {
        return [
          [
            "@nuxt/babel-preset-app", { loose: true }
          ]
        ];
      }
    }
  }
};
