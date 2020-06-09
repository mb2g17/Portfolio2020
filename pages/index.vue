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

      <h1>Home</h1>

      <p v-for="project in starredProjects">
        {{ project.name }}
        {{ project.release }}
      </p>

    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";

  @Component({
    async asyncData(context: Context) {
      /*const result = await context.app.$api(context.$axios, {
        "starts_with": "projects",
        "filter_query[starred][is]": "true"
      });
      console.log(result);*/
      return {};
    }
  })
  export default class IndexPage extends Vue {
    /** Starred projects */
    private starredProjects: Project[] = [];

    async mounted() {
      const stories = await this.$api(this.$axios, {
        "starts_with": "projects",
        "filter_query[starred][is]": "true"
      });

      if (stories) {
        this.starredProjects = stories as Project[];
      }
    }
  }
</script>
