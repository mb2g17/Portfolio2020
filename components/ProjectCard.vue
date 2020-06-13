<template>

  <v-card
    class="project-card"
    @click="onCardClick"
  >
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
    <template v-if="shouldShowChips">
      <v-divider class="mx-4"></v-divider>
      <v-card-text>

        <!-- Languages -->
        <v-chip
          color="red"
          class="animate-chip mr-1 mb-2"
          v-if="showLanguages"

          v-for="language in project.languages"
          :key="language"

          @mousedown.stop=""
          @touchstart.stop=""
          @click.stop="$emit('languageclick', language)"
        >
          {{ languageStore.find(language).name }}
        </v-chip>

        <!-- Frameworks -->
        <v-chip
          color="blue"
          class="animate-chip mr-1 mb-2"
          v-if="showFrameworks"

          v-for="framework in project.frameworks"
          :key="framework"

          @mousedown.stop=""
          @touchstart.stop=""
          @click.stop="$emit('frameworkclick', framework)"
        >
          {{ frameworkStore.find(framework).name }}
        </v-chip>

        <!-- Technologies -->
        <v-chip
          color="green"
          class="animate-chip mr-1 mb-2"
          v-if="showTechnologies"

          v-for="technology in project.technologies"
          :key="technology"

          @mousedown.stop=""
          @touchstart.stop=""
          @click.stop="$emit('technologyclick', technology)"
        >
          {{ technologyStore.find(technology).name }}
        </v-chip>

        <!-- Tags -->
        <v-chip
          color="purple"
          class="animate-chip mr-1 mb-2"
          v-if="showTags"

          v-for="tag in project.tags"
          :key="tag"

          @mousedown.stop=""
          @touchstart.stop=""
          @click.stop="$emit('tagclick', tag)"
        >
          {{ tagStore.find(tag).name }}
        </v-chip>

      </v-card-text>
    </template>

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

    /** If true, language chips are shown */
    @Prop({default: true, type: Boolean}) showLanguages!: boolean;

    /** If true, framework chips are shown */
    @Prop({default: true, type: Boolean}) showFrameworks!: boolean;

    /** If true, technology chips are shown */
    @Prop({default: true, type: Boolean}) showTechnologies!: boolean;

    /** If true, tag chips are shown */
    @Prop({default: true, type: Boolean}) showTags!: boolean;

    /**
     * If true, we should show chips. If false, we should hide chips.
     */
    private get shouldShowChips(): boolean {
      return this.showLanguages || this.showFrameworks || this.showTechnologies || this.showTags;
    }

    /**
     * When user clicks on card
     */
    private onCardClick() {
      this.$router.push({
        path: `/projects/${this.project.slug}`
      });
    }
  }
</script>

<style scoped lang="scss">
  @import '~/assets/chip-hover.scss';

  .project-card {
    transform: scale(1);
    transition: transform 0.2s;
  }
  .project-card:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
    cursor: pointer;
  }
</style>
