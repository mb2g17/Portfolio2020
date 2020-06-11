<template>
  <v-container>

      <h1>Projects</h1>

      <v-row>
        <!-- Filter row -->
        <v-col :cols="3">
          <v-row>
            <v-col :cols="12">

              <FilterCard colour="red" :store="languageStore" title="Languages" />

            </v-col>
            <v-col :cols="12">

              <FilterCard colour="blue" :store="frameworkStore" title="Frameworks" />

            </v-col>
            <v-col :cols="12">

              <FilterCard colour="green" :store="technologyStore" title="Technologies" />

            </v-col>
            <v-col :cols="12">

              <FilterCard colour="purple" :store="tagStore" title="Tags" :default-attribute-enabled="false" />

            </v-col>
          </v-row>

        </v-col>

        <!-- Column 2 -->
        <v-col :cols="9">

          <ProjectPaginator
            :projects="projects"
            :total="total"
            @pagechange="onPageChange"
          />

        </v-col>
      </v-row>

  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import { languageStore, frameworkStore, technologyStore, tagStore } from "~/utils/store/store-accessor";
  import FilterCard from "~/components/FilterCard.vue";
  import ProjectPaginator from "~/components/ProjectPaginator.vue";

  @Component({
    components: {
      ProjectPaginator, FilterCard
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

    private async onPageChange({newPage, loadingCallback}: {newPage: number, loadingCallback: () => void}) {
      // Request projects page
      const projects: Project[] = await this.$api(this.$axios, {
        "starts_with": "project",
        "sort_by": "content.date_of_completion:desc",
        "page": newPage,
        "per_page": 12
      }) as Project[];

      // Update projects property
      Vue.set(this, "projects", projects);

      // Runs loading callback
      loadingCallback();
    }
  }
</script>
