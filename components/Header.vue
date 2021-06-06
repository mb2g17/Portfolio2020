<template>

  <!-- Header -->
  <v-app-bar
    app
    id="header"
  >

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

      <v-menu auto eager offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-tab v-bind="attrs" v-on="on">Git</v-tab>
        </template>
        <v-list>
          <v-list-item href="https://git.matt-barnes.co.uk" target="_blank">
            <v-list-item-title>Gitea (self-hosted)</v-list-item-title>
          </v-list-item>
          <v-list-item href="https://github.com/mb2g17" target="_blank">
            <v-list-item-title>GitHub</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
