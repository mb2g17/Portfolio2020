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

      <!-- Project pagination -->
      <v-pagination
        v-model="page"
        :length="Math.ceil(total / 12)"
      >
      </v-pagination>

      <!-- Loading projects -->
      <v-container class="d-flex justify-center" v-if="loading">
        <v-progress-circular
          :size="100"
          indeterminate
        >
        </v-progress-circular>
      </v-container>

      <!-- Projects -->
      <v-row v-if="!loading">
        <v-col :cols="3" v-for="project in projects" :key="project.uuid">
          <ProjectCard :project="project" />
        </v-col>
      </v-row>

    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import { languageStore, frameworkStore, technologyStore, tagStore } from "~/utils/store/store-accessor";
  import ProjectCard from "~/components/ProjectCard.vue";
  import Story from "~/plugins/api/components/Story";

  @Component({
    components: {
      ProjectCard
    },
    async asyncData(ctx: Context) {
      const [projects, headers]: [Project[], any] = await ctx.app.$api(ctx.$axios, {
        "starts_with": "project",
        "sort_by": "content.date_of_completion:desc",
        "page": 1,
        "per_page": 12
      }, true) as [Project[], any];

      return {
        projects,
        total: parseInt(headers.total)
      };
    }
  })
  export default class ProjectsPage extends Vue {
    private languageStore = languageStore;
    private frameworkStore = frameworkStore;
    private technologyStore = technologyStore;
    private tagStore = tagStore;

    /** The projects being displayed on the page */
    private projects: Project[] = [];

    /** The total number of projects, retrieved from 'total' property in header */
    private total: number = 0;

    /** Models what page we're on in the project pagination */
    private page: number = 1;

    /** If true, we are loading projects */
    private loading: boolean = false;

    @Watch('page')
    private async onPageChange(newPage: number, oldPage: number) {
      // Loading projects
      this.loading = true;

      // Request projects page
      const projects: Project[] = await this.$api(this.$axios, {
        "starts_with": "project",
        "sort_by": "content.date_of_completion:desc",
        "page": newPage,
        "per_page": 12
      }) as Project[];

      // No longer loading projects
      this.loading = false;

      // Update projects property
      this.projects = projects;
    }
  }
</script>
