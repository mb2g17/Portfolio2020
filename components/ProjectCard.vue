<template>

  <v-card class="project-card">
    <!-- Banner -->
    <v-img
      contain
      class="white--text align-end"
      :lazy-src="require('~/assets/placeholder-logo.jpg')"
      :src="project.banner"
    >
      <v-icon
        v-if="project.starred"
        color="orange"
        class="ml-1 mb-1"
      >mdi-star</v-icon>
    </v-img>

    <!-- Summary -->
    <v-card-text>{{ project.summary }}</v-card-text>

    <!-- Chips -->
    <v-divider class="mx-4"></v-divider>
    <v-card-text>

      <!-- Languages -->
      <v-chip v-for="language in project.languages" color="red" class="project-chip mr-1 mb-2">
        {{ languageStore.find(language).name }}
      </v-chip>

      <!-- Frameworks -->
      <v-chip v-for="framework in project.frameworks" color="blue" class="project-chip mr-1 mb-2">
        {{ frameworkStore.find(framework).name }}
      </v-chip>

      <!-- Technologies -->
      <v-chip v-for="technology in project.technologies" color="green" class="project-chip mr-1 mb-2">
        {{ technologyStore.find(technology).name }}
      </v-chip>

      <!-- Tags -->
      <v-chip v-for="tag in project.tags" color="purple" class="project-chip mr-1 mb-2">
        {{ tagStore.find(tag).name }}
      </v-chip>

    </v-card-text>

  </v-card>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import Project from "~/plugins/api/components/Project";
  import { languageStore, frameworkStore, technologyStore, tagStore } from "~/utils/store/store-accessor";

  @Component({})
  export default class ProjectCard extends Vue {
    private languageStore = languageStore;
    private frameworkStore = frameworkStore;
    private technologyStore = technologyStore;
    private tagStore = tagStore;

    /** Project that we are displaying */
    @Prop(Object) project!: Project;
  }
</script>

<style scoped>
  .project-card {
    transform: scale(1);
    transition: transform 0.2s;
  }
  .project-card:hover {
    transform: scale(1.08);
    transition: transform 0.2s;
    cursor: pointer;
  }

  .project-chip {
    transform: scale(1) rotate(0deg);
    transition: transform 0.2s;
  }
  .project-chip:hover {
    transform: scale(1.1) rotate(-2deg);
    transition: transform 0.2s;
    cursor: pointer;
  }
</style>
