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
          v-model="page"
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
    <v-container fluid>
      <v-row>
        <v-col :cols="12 / xsCols" :md="12 / mdCols" v-for="project in projects" :key="project.uuid">
          <ProjectCard
            :project="project"
            :show-languages="showLanguages"
            :show-frameworks="showFrameworks"
            :show-technologies="showTechnologies"
            :show-tags="showTags"
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

    /** If true, language chips are shown */
    @Prop({default: true, type: Boolean}) showLanguages!: boolean;

    /** If true, framework chips are shown */
    @Prop({default: true, type: Boolean}) showFrameworks!: boolean;

    /** If true, technology chips are shown */
    @Prop({default: true, type: Boolean}) showTechnologies!: boolean;

    /** If true, tag chips are shown */
    @Prop({default: true, type: Boolean}) showTags!: boolean;

    /** If true, loading animation is displayed */
    private loading: boolean = false;

    /** The page number we're on */
    private page: number = 1;

    @Watch('page')
    private async onPageChange(newPage: number, oldPage: number) {
      this.loading = true;
      this.$emit("pagechange", {
        newPage,
        loadingCallback: () => this.loading = false
      });
    }
  }
</script>

<style scoped>

</style>
