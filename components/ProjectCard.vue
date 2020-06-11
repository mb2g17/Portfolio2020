<template>

  <v-card>
    <!-- Banner -->
    <v-img
      contain
      class="white--text align-end"
      :src="project.banner"
    >
    </v-img>

    <!-- Summary -->
    <v-card-text>{{ project.summary }}</v-card-text>

    <!-- Chips -->
    <v-divider class="mx-4"></v-divider>
    <v-card-text>

      <!-- Languages -->
      <v-chip v-for="language in project.languages" color="red" class="mr-1 mb-2">
        {{ languageStore.find(language).name }}
      </v-chip>

      <!-- Frameworks -->
      <v-chip v-for="framework in project.frameworks" color="blue" class="mr-1 mb-2">
        {{ frameworkStore.find(framework).name }}
      </v-chip>

      <!-- Technologies -->
      <v-chip v-for="technology in project.technologies" color="green" class="mr-1 mb-2">
        {{ technologyStore.find(technology).name }}
      </v-chip>

      <!-- Tags -->
      <v-chip v-for="tag in project.tags" color="purple" class="mr-1 mb-2">
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
    /** Project that we are displaying */
    @Prop(Object) project!: Project;

    private languageStore = languageStore;
    private frameworkStore = frameworkStore;
    private technologyStore = technologyStore;
    private tagStore = tagStore;
  }
</script>

<style scoped>
</style>
