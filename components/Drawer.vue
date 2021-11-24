<template>

  <!-- Drawer -->
  <v-navigation-drawer
    v-model="value"
    @input="onInput"
    absolute
    temporary
    style="position:fixed"
  >

    <!-- List title -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Matthew Barnes
        </v-list-item-title>
        <v-list-item-subtitle>
          Portfolio
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Links -->
    <v-tabs vertical>
      <v-tab
        v-for="item in items"
        :key="item.title"
        class="d-flex flex-row justify-start"
        :nuxt="!!item.to" :to="!!item.to ? item.to : ''"
        :href="!item.to ? item.link : ''">

        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}

      </v-tab>
    </v-tabs>

  </v-navigation-drawer>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";

  /** Drawer item prototype */
  type Item = {
    icon: string;
    title: string;
    to?: string;
    link?: string;
  };

  @Component({})
  export default class Drawer extends Vue {
    /** Models the drawer being open */
    @Prop(Boolean) value!: boolean;

    /** Items in the drawer */
    private items: Item[] = [
      {
        title: "Home", icon: "mdi-home", to: "/"
      },
      {
        title: "Projects", icon: "mdi-pencil", to: "/projects"
      },
      {
        title: "About Me", icon: "mdi-account", to: "/aboutme"
      },
      {
        title: "Gitea", icon: "mdi-git", link: "https://git.matt-barnes.co.uk/"
      },
      {
        title: "GitHub", icon: "mdi-github", link: "https://github.com/mb2g17"
      },
      {
        title: "Changelog", icon: "mdi-text-box", to: "/changelog"
      },
      {
        title: "Donate", icon: "mdi-cash", to: "/donate"
      },
    ];

    /** When the user opens / closes the drawer */
    private onInput(newValue: boolean) {
      this.$emit("input", newValue); // Updates modelled value
    }
  }
</script>

<style scoped>

</style>
