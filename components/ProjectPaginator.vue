<template>

  <v-container>

    <!-- Header -->
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
        <!-- Toggle filter button -->
        <v-btn
          outlined
          @click="$emit('togglefilter')"
        >Toggle filter</v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <!-- Pagination -->
        <v-pagination
          v-model="value"
          :length="Math.ceil(total / 12)"
        >
        </v-pagination>
      </v-col>
    </v-row>

    <!-- Loading animation -->
    <v-container class="d-flex justify-center" v-if="false">
      <v-progress-circular
        :size="100"
        indeterminate
      >
      </v-progress-circular>
    </v-container>

    <!-- Projects -->
    <v-container class="projects-container" ref="projects-container" fluid>
      <v-row>
        <v-col :cols="12 / xsCols" :md="12 / mdCols" v-for="project in projects" :key="project.uuid">
          <ProjectCard
            :project="project"

            :filtered-languages="filteredLanguages"
            :filtered-frameworks="filteredFrameworks"
            :filtered-technologies="filteredTechnologies"
            :filtered-tags="filteredTags"

            @languageclick="$emit('languageclick', $event)"
            @frameworkclick="$emit('frameworkclick', $event)"
            @technologyclick="$emit('technologyclick', $event)"
            @tagclick="$emit('tagclick', $event)"
          />
        </v-col>
      </v-row>
    </v-container>

  </v-container>

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
  import Project from "~/plugins/api/components/Project";
  import ProjectCard from "~/components/ProjectCard.vue";

  @Component({
    components: {
      ProjectCard
    }
  })
  export default class ProjectPaginator extends Vue {
    /** A list of projects to display */
    @Prop(Array) projects!: Project[];

    /** The total number of projects there are */
    @Prop(Number) total!: number;

    /** How many columns should there be on desktop */
    @Prop({default: 4, type: Number}) mdCols!: number;

    /** How many columns should there be on mobile */
    @Prop({default: 4, type: Number}) xsCols!: number;

    /** A list of languages uuids to filter */
    @Prop({required: true}) filteredLanguages!: string[] | null;

    /** A list of framework uuids to filter */
    @Prop({required: true}) filteredFrameworks!: string[] | null;

    /** A list of technology uuids to filter */
    @Prop({required: true}) filteredTechnologies!: string[] | null;

    /** A list of tag uuids to filter */
    @Prop({required: true}) filteredTags!: string[] | null;

    /** The page number we're on */
    @Prop(Number) value: number = 1;

    /** If true, loading animation is displayed */
    private loading: boolean = false;

    /**
     * Scrolls the project container back to the top
     */
    private scrollProjectContainerUp() {
      // Scrolls project container to the top
      const projectsContainer: Element = this.$refs["projects-container"] as Element;
      projectsContainer.scrollTop = 0;
    }

    @Watch('projects')
    private onProjectsChange() {
      this.scrollProjectContainerUp();
    }

    @Watch('value')
    private async onPageChange(newPage: number, oldPage: number) {
      // Emits v-model event
      this.$emit("input", newPage);
    }
  }
</script>

<style scoped lang="scss">
  @import "~vuetify/src/styles/styles";

  // Desktop
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    // Add scrollbars to projects container
    $elem-height: calc(100vh - 280px);
    .projects-container {
      max-height: $elem-height;
      overflow-y: auto;
    }
  }

</style>
