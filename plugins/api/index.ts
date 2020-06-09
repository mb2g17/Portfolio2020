import { Plugin } from "@nuxt/types";
import {ApiFunction, ApiFunctionType} from "./function";

// Declares plugin in client
declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiFunctionType
  }
}

// Declares plugin in server
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ApiFunctionType
  }
}

// Declares plugin in vuex store
declare module 'vuex/types/index' {
  interface Store<S> {
    $api: ApiFunctionType
  }
}

// Injects plugin into nuxt
const apiPlugin: Plugin = (context, inject) => {
  inject('api', ApiFunction);
};

export default apiPlugin;
