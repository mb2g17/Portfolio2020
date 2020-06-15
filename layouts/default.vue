<template>
  <v-app dark>

    <!-- Header -->
    <Header
      @drawerIconClick="onDrawerIconClick"
    />

    <!-- Drawer -->
    <Drawer v-model="drawerOpen"/>

    <!-- Content -->
    <v-content class="content">
      <nuxt />
    </v-content>

    <!-- Footer
    <Footer /> -->

  </v-app>
</template>

<script lang="ts">
  import Header from "../components/Header.vue";
  import Drawer from "../components/Drawer.vue";
  import Footer from "../components/Footer.vue";
  import {Component, Vue} from "nuxt-property-decorator";

  @Component({
    scrollToTop: true,
    layout: "default",
    components: {
      Header, Drawer, Footer
    }
  })
  export default class DefaultLayout extends Vue {
    /** If true, drawer is open. If false, it's invisible */
    private drawerOpen: boolean = false;

    head() {
      return {
        title: "My title"
      };
    }

    /**
     * When user clicks drawer icon on header
     */
    private onDrawerIconClick() {
      this.drawerOpen = true; // Opens drawer
    }
  }
</script>

<style lang="scss">
  @import "~vuetify/src/styles/styles";

  html, body {
    overflow: hidden;
  }

  // Sets up v-content scrollbar
  @mixin content($header-height) {
    .content {
      padding-top: 0 !important;
      margin-top: $header-height;
      height: calc(100vh - #{$header-height});
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  // Desktop
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    @include content($header-height: 64px);
  }
  // Phone
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    @include content($header-height: 56px);
  }

  /* Entire scrollbar */
  ::-webkit-scrollbar {
    background: #222;
    width: 10px;
    border-radius: 6px;
  }

  /* Trackbar (background) */
  ::-webkit-scrollbar-track {
    background: #222;
    border-radius: 6px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
    transition: background 0.2s;
  }

  /* Handle (hover) */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    transition: background 0.2s;
  }
</style>
