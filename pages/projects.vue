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

      <!-- Filter
      <v-row>

        <v-col :cols="6">
          <h2>Languages</h2>
          <v-chip v-for="uuid in languageStore.uuids" :key="uuid" color="red">
            {{ languageStore.find(uuid).name }}
          </v-chip>
        </v-col>

        <v-col :cols="6">
          <h2>Frameworks</h2>
          <v-chip v-for="uuid in frameworkStore.uuids" :key="uuid" color="blue">
            {{ frameworkStore.find(uuid).name }}
          </v-chip>
        </v-col>

        <v-col :cols="6">
          <h2>Technologies</h2>
          <v-chip v-for="uuid in technologyStore.uuids" :key="uuid" color="green">
            {{ technologyStore.find(uuid).name }}
          </v-chip>
        </v-col>

        <v-col :cols="6">
          <h2>Tags</h2>
          <v-chip v-for="uuid in tagStore.uuids" :key="uuid" color="purple">
            {{ tagStore.find(uuid).name }}
          </v-chip>
        </v-col>

      </v-row> -->

      <!-- Projects -->
      <v-row>
        <v-col :cols="4" v-for="project in projects" :key="project.uuid">
          <ProjectCard :project="project" />
        </v-col>
      </v-row>

    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import { languageStore, frameworkStore, technologyStore, tagStore } from "~/utils/store/store-accessor";
  import ProjectCard from "~/components/ProjectCard.vue";

  @Component({
    components: {
      ProjectCard
    },
    async asyncData(ctx: Context) {
      return {
        projects: await ctx.app.$api(ctx.$axios, {
          "starts_with": "project",
          "sort_by": "content.date_of_completion:desc"
      })};
    }
  })
  export default class ProjectsPage extends Vue {
    /** The projects being displayed on the page */
    private projects: Project[] = [];

    private languageStore = languageStore;
    private frameworkStore = frameworkStore;
    private technologyStore = technologyStore;
    private tagStore = tagStore;
  }
</script>
