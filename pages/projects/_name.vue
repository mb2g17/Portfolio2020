<template>
  <v-dialog
    v-model="open"
    @click:outside="onClickOutside"
    max-width="600"
  >

    <v-card>
      <!-- Title -->
      <v-card-title
        class="headline green darken-4"
        primary-title
      >{{ "project.name" }}</v-card-title>

      <v-card-text>{{ "project.description" }}</v-card-text>

      <v-card-actions>
        <v-btn color="red">Demo</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue">Release</v-btn>
        <v-btn color="green">Source</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import Project from "~/plugins/api/components/Project";
  import { Context } from "@nuxt/types";

  @Component({
    async asyncData(ctx: Context) {
      ctx.app.$testplugin.hello();
      ctx.app.$testplugin.goodbye();
      ctx.app.$testplugin.both();

      // Gets project
      /*return {
        project: await ctx.app.$api(ctx.$axios, {}, false,
          "/projects/yoshi-vs-windows-unity-edition"
        )
      };*/
    }
  })
  export default class ProjectsName extends Vue {
    /** If true, modal is open */
    private open: boolean = true;

    private project!: Project;

    /**
     * When user tries to exit the dialog
     */
    private onClickOutside() {
      this.$router.push({
        path: "/projects"
      });
    }
  }
</script>

<style scoped>

</style>
