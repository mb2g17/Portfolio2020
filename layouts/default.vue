<template>
  <v-app dark>
    <!-- Header -->
    <Header />

    <!-- Drawer -->
    <Drawer />

    <!-- Content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!-- Footer -->
    <Footer />

  </v-app>
</template>

<script lang="ts">
  import Header from "../components/Header.vue";
  import Drawer from "../components/Drawer.vue";
  import Footer from "../components/Footer.vue";
  import {Component, Vue} from "nuxt-property-decorator";

  @Component({
    components: {
      Header, Drawer, Footer
    }
  })
  export default class DefaultLayout extends Vue {
    layout() {
      return "default";
    }
  }
</script>
