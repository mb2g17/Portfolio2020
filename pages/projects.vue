<template>
  <v-container>

    <h1>Projects</h1>

    <nuxt-child
      :filtered-languages="filteredLanguages"
      :filtered-frameworks="filteredFrameworks"
      :filtered-technologies="filteredTechnologies"
      :filtered-tags="filteredTags"

      @languagechipclick="onProjectChipClick($event, filteredLanguages)"
      @frameworkchipclick="onProjectChipClick($event, filteredFrameworks)"
      @technologychipclick="onProjectChipClick($event, filteredTechnologies)"
      @tagchipclick="onProjectChipClick($event, filteredTags)"
    />

    <v-row>
      <!-- Filter column -->
      <v-col class="filter-col" :cols="12" md="3" v-show="filterShow">
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
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Projects column -->
      <v-col class="projects-col pb-0" cols="12" :md="filterShow ? 9 : 12">
        <ProjectPaginator
          v-model="page"

          :projects="projects"
          :total="total"
          :xs-cols="1"
          :md-cols="filterShow ? 3 : 4"

          :filtered-languages="filteredLanguages"
          :filtered-frameworks="filteredFrameworks"
          :filtered-technologies="filteredTechnologies"
          :filtered-tags="filteredTags"

          @togglefilter="onToggleFilter"
          @languageclick="onProjectChipClick($event, filteredLanguages)"
          @frameworkclick="onProjectChipClick($event, filteredFrameworks)"
          @technologyclick="onProjectChipClick($event, filteredTechnologies)"
          @tagclick="onProjectChipClick($event, filteredTags)"
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
      const [projects, headers]: [Project[], any] = await ctx.app.$api.getStories({
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
      const response: [Project[], any] = await this.$api.getStories(queryParams, true) as [Project[], any];
      const [projects, headers] = response;

      // Updates total
      this.total = parseInt(headers.total);

      // Update projects property
      Vue.set(this, "projects", projects);
    }

    @Watch('filteredLanguages')
    @Watch('filteredFrameworks')
    @Watch('filteredTechnologies')
    @Watch('filteredTags')
    private async onFilteredLanguagesChange(newVal: string[] | null, oldVal: string[] | null) {
      // If page number won't change, load projects manually
      if (this.page === 1) {
        await this.loadProjects();
      } else // If page number is changing, page update will refresh projects automatically
        this.page = 1;
    }

    /**
     * When the user changes the pagination page
     */
    @Watch('page')
    private async onPageChange(newPage: number, oldPage: number) {
      // Loads new page of projects
      await this.loadProjects();
    }

    /**
     * When the user clicks toggle filter button
     */
    private onToggleFilter() {
      this.filterShow = !this.filterShow;
    }

    /**
     * When the user clicks on a project chip
     * @param uuid - the uuid of the clicked value
     * @param filter - the filter array to mutate
     */
    private onProjectChipClick(uuid: string, filter: string[] | null) {
      // If attribute is disabled, re-enable it
      if (filter === null)
        filter = [uuid];

      // If value is already filtered, unfilter it
      else if (filter.includes(uuid))
        filter.splice(filter.indexOf(uuid), 1);
      // Filter it
      else
        filter.push(uuid);
    }
  }
</script>

<style lang="scss">
  @import "~vuetify/src/styles/styles";

  // Desktop
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    // Add scrollbars to filter and project columns
    $elem-height: calc(100vh - 185px);
    .projects-col {
      /*height: $elem-height;
      overflow-y: scroll;*/
    }
    .filter-col {
      max-height: $elem-height;
      overflow-y: auto;
    }
  }
</style>
