<template>
  <v-app dark>

    <!-- Header -->
    <Header
      @drawerIconClick="onDrawerIconClick"
    />

    <!-- Drawer -->
    <Drawer v-model="drawerOpen"/>

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
    /** If true, drawer is open. If false, it's invisible */
    private drawerOpen: boolean = false;

    layout() {
      return "default";
    }

    /**
     * When user clicks drawer icon on header
     */
    private onDrawerIconClick() {
      this.drawerOpen = true; // Opens drawer
    }
  }
</script>
