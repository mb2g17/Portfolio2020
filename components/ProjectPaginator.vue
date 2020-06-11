<template>

  <v-container>

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
    <v-container fluid>
      <v-row>
        <v-col :cols="4" v-for="project in projects" :key="project.uuid">
          <ProjectCard :project="project" />
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

    /** The total number of projects there are*/
    @Prop(Number) total!: number;

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
