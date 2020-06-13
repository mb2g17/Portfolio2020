import { Plugin } from "@nuxt/types";
import * as ApiPlugin from "./function";

// Declares plugin in client
declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiPlugin.ApiPluginInterface
  }
}

// Declares plugin in server
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ApiPlugin.ApiPluginInterface
  }
}

// Declares plugin in vuex store
declare module 'vuex/types/index' {
  interface Store<S> {
    $api: ApiPlugin.ApiPluginInterface
  }
}

// Injects plugin into nuxt
const apiPlugin: Plugin = (context, inject) => {
  inject('api', { ...ApiPlugin });
};

export default apiPlugin;
