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

      <h2>Starred projects:</h2>
      <div v-for="project in starredProjects">
        <p>{{ project.name }}</p>
        <p>{{ project.release }}</p>
      </div>

    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import Framework from "~/plugins/api/components/Framework";

  import { frameworkStore } from "@/store";

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
      // Gets all starred projects
      const result = await this.$api(this.$axios, {
        "starts_with": "projects",
        "filter_query[starred][is]": "true"
      });

      // If we didn't error somewhere
      if (result) {
        this.starredProjects = result as Project[];
        this.$axios;
      }
    }
  }
</script>
