<template>

  <!-- Footer -->
  <v-footer
    :fixed="true"
    app
  >
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>

</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";

  @Component({})
  export default class Footer extends Vue {

  }
</script>

<style scoped>

</style>
