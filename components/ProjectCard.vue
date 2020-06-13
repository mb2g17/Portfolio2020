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
      <v-card-text class="py-2">

        <v-chip-group
          column multiple
          :value="filterUnion"
        >
          <!-- Languages -->
          <v-chip
            filter
            color="red"
            class="animate-chip mr-1 mb-2"
            v-if="showLanguages"

            v-for="language in project.languages"
            :key="language"
            :value="language"

            @mousedown.stop=""
            @touchstart.stop=""
            @click.stop="$emit('languageclick', language)"
          >
            {{ languageStore.find(language).name }}
          </v-chip>

          <!-- Frameworks -->
          <v-chip
            filter
            color="blue"
            class="animate-chip mr-1 mb-2"
            v-if="showFrameworks"

            v-for="framework in project.frameworks"
            :key="framework"
            :value="framework"

            @mousedown.stop=""
            @touchstart.stop=""
            @click.stop="$emit('frameworkclick', framework)"
          >
            {{ frameworkStore.find(framework).name }}
          </v-chip>

          <!-- Technologies -->
          <v-chip
            filter
            color="green"
            class="animate-chip mr-1 mb-2"
            v-if="showTechnologies"

            v-for="technology in project.technologies"
            :key="technology"
            :value="technology"

            @mousedown.stop=""
            @touchstart.stop=""
            @click.stop="$emit('technologyclick', technology)"
          >
            {{ technologyStore.find(technology).name }}
          </v-chip>

          <!-- Tags -->
          <v-chip
            filter
            color="purple"
            class="animate-chip mr-1 mb-2"
            v-if="showTags"

            v-for="tag in project.tags"
            :key="tag"
            :value="tag"

            @mousedown.stop=""
            @touchstart.stop=""
            @click.stop="$emit('tagclick', tag)"
          >
            {{ tagStore.find(tag).name }}
          </v-chip>
        </v-chip-group>

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

    /** A list of languages uuids to filter */
    @Prop({default: null}) filteredLanguages!: string[] | null;

    /** A list of framework uuids to filter */
    @Prop({default: null}) filteredFrameworks!: string[] | null;

    /** A list of technology uuids to filter */
    @Prop({default: null}) filteredTechnologies!: string[] | null;

    /** A list of tag uuids to filter */
    @Prop({default: null}) filteredTags!: string[] | null;

    /** If true, language chips are shown */
    private get showLanguages(): boolean {
      return this.filteredLanguages !== null;
    }

    /** If true, framework chips are shown */
    private get showFrameworks(): boolean {
      return this.filteredFrameworks !== null;
    }

    /** If true, technology chips are shown */
    private get showTechnologies(): boolean {
      return this.filteredTechnologies !== null;
    }

    /** If true, tag chips are shown */
    private get showTags(): boolean {
      return this.filteredTags !== null;
    }

    private get filterUnion(): string[] {
      let rv: string[] = [];
      if (this.filteredLanguages)
        rv = rv.concat(this.filteredLanguages);
      if (this.filteredFrameworks)
        rv = rv.concat(this.filteredFrameworks);
      if (this.filteredTechnologies)
        rv = rv.concat(this.filteredTechnologies);
      if (this.filteredTags)
        rv = rv.concat(this.filteredTags);
      return rv;
    }

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
