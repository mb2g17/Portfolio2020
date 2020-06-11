<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >

      <h1>Projects</h1>

    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import Project from "~/plugins/api/components/Project";

@Component({
  async asyncData(ctx: Context) {

  }
})
export default class ProjectsPage extends Vue {
  /** The projects being displayed on the page */
  private projects: Project[] = [];
}
</script>
