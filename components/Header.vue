<template>

  <!-- Header -->
  <v-app-bar app id="header">

    <!-- Drawer link -->
    <v-app-bar-nav-icon
      class="d-block d-md-none"
      @click="$emit('drawerIconClick')"
    ></v-app-bar-nav-icon>

    <!-- Title -->
    <v-toolbar-title id="title">Matthew Barnes</v-toolbar-title>

    <!-- Links -->
    <v-tabs right class="d-none d-md-block">
      <v-tab nuxt to="/">Home</v-tab>
      <v-tab nuxt to="/projects">Projects</v-tab>
      <v-tab nuxt to="/aboutme">About Me</v-tab>
      <v-tab href="https://github.com/mb2g17">My GitHub</v-tab>
      <v-tab nuxt to="/changelog">Changelog</v-tab>
    </v-tabs>

  </v-app-bar>

</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";

  @Component({})
  export default class Header extends Vue {
  }
</script>

<style scoped>
  #title {
    min-width: 200px;
  }
</style>
