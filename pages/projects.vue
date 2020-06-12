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
            v-model="page"

            :projects="projects"
            :total="total"
            :xs-cols="1"
            :md-cols="filterShow ? 3 : 4"

            :show-languages="filteredLanguages !== null"
            :show-frameworks="filteredFrameworks !== null"
            :show-technologies="filteredTechnologies !== null"
            :show-tags="filteredTags !== null"

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

  /** How many projects should be loaded per page */
  const per_page: number = 12;

  @Component({
    components: {
      ProjectPaginator, FilterCard
    },
    async asyncData(ctx: Context) {
      const [projects, headers]: [Project[], any] = await ctx.app.$api(ctx.$axios, {
        "starts_with": "project",
        "sort_by": "content.date_of_completion:desc",
        "page": 1,
        "per_page": per_page
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

    /** The current page number */
    private page: number = 1;

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

    @Watch('filteredLanguages')
    @Watch('filteredFrameworks')
    @Watch('filteredTechnologies')
    @Watch('filteredTags')
    private async onFilteredLanguagesChange(newVal: string[] | null, oldVal: string[] | null) {
      // Resets page and reload projects
      this.page = 1;
      await this.loadProjects();
    }

    /**
     * Loads a page of projects
     */
    private async loadProjects() {
      // Constructs query parameters
      let queryParams: any = {
        "starts_with": "project",
        "sort_by": "content.date_of_completion:desc",
        "page": this.page,
        "per_page": per_page
      };

      // Adds all filters
      const filters: [string[] | null, string][] = [
        [this.filteredLanguages, "languages"],
        [this.filteredFrameworks, "frameworks"],
        [this.filteredTechnologies, "technologies"],
        [this.filteredTags, "tags"],
      ]
      for (const filter of filters) {
        const [filterArray, filterName] = filter;
        if (filterArray !== null)
          queryParams[`filter_query[${filterName}][in_array]`] = filterArray.join(',');
      }

      // Request projects page
      const response: [Project[], any] = await this.$api(this.$axios, queryParams, true) as [Project[], any];
      const [projects, headers] = response;

      // Updates total
      this.total = parseInt(headers.total);

      // Update projects property
      Vue.set(this, "projects", projects);
    }

    /**
     * When the user changes the pagination page
     */
    @Watch('page')
    private async onPageChange(newPage: number, oldPage: number) {
      // Sets new page
      this.page = newPage;

      // Loads new page of projects
      await this.loadProjects();
    }

    /**
     * When the user clicks toggle filter button
     */
    private onToggleFilter() {
      this.filterShow = !this.filterShow;
    }
  }
</script>
