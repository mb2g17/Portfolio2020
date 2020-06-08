<template>

  <!-- Drawer -->
  <v-navigation-drawer v-model="drawer" absolute temporary>

    <!-- Items -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Hello World</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-navigation-drawer>

</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";

  @Component({})
  export default class Drawer extends Vue {

  }
</script>

<style scoped>

</style>
