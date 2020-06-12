<template>
  <v-container>

      <h1>Projects</h1>

      <v-row>
        <!-- Filter row -->
        <v-col :cols="12" md="3" v-show="filterShow">
          <v-row>
            <v-col :cols="12">
              <FilterCard
                v-model="filteredLanguages"
                colour="red"
                :store="languageStore"
                title="Languages"
              />
            </v-col>
            <v-col :cols="12">
              <FilterCard
                v-model="filteredFrameworks"
                colour="blue"
                :store="frameworkStore"
                title="Frameworks"
              />
            </v-col>
            <v-col :cols="12">
              <FilterCard
                v-model="filteredTechnologies"
                colour="green"
                :store="technologyStore"
                title="Technologies"
              />
            </v-col>
            <v-col :cols="12">
              <FilterCard
                v-model="filteredTags"
                colour="purple"
                :store="tagStore"
                title="Tags"
                :default-attribute-enabled="false"
              />
            </v-col>
          </v-row>
        </v-col>

        <!-- Projects row -->
        <v-col cols="12" :md="filterShow ? 9 : 12">
          <ProjectPaginator
            :projects="projects"
            :total="total"
            :xs-cols="1"
            :md-cols="filterShow ? 3 : 4"

            :show-languages="filteredLanguages !== null"
            :show-frameworks="filteredFrameworks !== null"
            :show-technologies="filteredTechnologies !== null"
            :show-tags="filteredTags !== null"

            @pagechange="onPageChange"
            @togglefilter="onToggleFilter"
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
  import Language from "~/plugins/api/components/Language";

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

    /** If true, filter is shown, false if not */
    private filterShow: boolean = false;

    /** Language UUIDs to filter; null if no filtering required */
    private filteredLanguages: string[] | null = [];

    /** Framework UUIDs to filter; null if no filtering required */
    private filteredFrameworks: string[] | null = [];

    /** Technology UUIDs to filter; null if no filtering required */
    private filteredTechnologies: string[] | null = [];

    /** Tag UUIDs to filter; null if no filtering required */
    private filteredTags: string[] | null = null;

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

    private onToggleFilter() {
      this.filterShow = !this.filterShow;
    }
  }
</script>
