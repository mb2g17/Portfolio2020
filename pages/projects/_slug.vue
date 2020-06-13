<template>
  <v-dialog
    v-model="open"
    @click:outside="onClickOutside"
    max-width="800"
  >

    <v-card>
      <!-- Header -->
      <v-card-title
        class="headline green darken-4 py-1"
        primary-title
      >
        <v-row>

          <!-- Title -->
          <v-col cols="9" style="word-wrap:break-word">
            {{ project.name }}
            <v-icon
              v-if="project.starred"
              color="orange"
            >mdi-star</v-icon>
          </v-col>

          <!-- Date of completion -->
          <v-col cols="3" class="text-right subtitle-2">{{ dateOfCompletion }}</v-col>

        </v-row>
      </v-card-title>
      <v-divider></v-divider>


      <!-- Contents -->
      <v-card-text class="project-dialog-content mt-3">

        <v-row>
          <v-col cols="12" md="6">
            <!-- Summary -->
            <p>{{ project.summary }}</p>

            <!-- Chips -->
            <template v-if="project.languages.length > 0">
              <h3 class="mb-1">Languages</h3>
              <v-chip-group column multiple :value="filteredLanguages">
                <v-chip
                  filter
                  class="animate-chip mr-1 mb-2"
                  color="red"

                  v-for="language in project.languages"
                  :key="language"
                  :value="language"

                  @click="$emit('languagechipclick', language)"
                >
                  {{ languageStore.find(language).name }}
                </v-chip>
              </v-chip-group>
              <v-divider class="my-2"></v-divider>
            </template>

            <template v-if="project.frameworks.length > 0">
              <h3 class="mb-1">Frameworks</h3>
              <v-chip-group column multiple :value="filteredFrameworks">
                <v-chip
                  filter
                  class="animate-chip mr-1 mb-2"
                  color="blue"

                  v-for="framework in project.frameworks"
                  :key="framework"
                  :value="framework"

                  @click="$emit('frameworkchipclick', framework)"
                >
                  {{ frameworkStore.find(framework).name }}
                </v-chip>
              </v-chip-group>
              <v-divider class="my-2"></v-divider>
            </template>

            <template v-if="project.technologies.length > 0">
              <h3 class="mb-1">Technologies</h3>
              <v-chip-group column multiple :value="filteredTechnologies">
                <v-chip
                  filter
                  class="animate-chip mr-1 mb-2"
                  color="green"

                  v-for="technology in project.technologies"
                  :key="technology"
                  :value="technology"

                  @click="$emit('technologychipclick', technology)"
                >{{ technologyStore.find(technology).name }}</v-chip>
              </v-chip-group>
              <v-divider class="my-2"></v-divider>
            </template>

            <template v-if="project.tags.length > 0">
              <h3 class="mb-1">Tags</h3>
              <v-chip-group column multiple :value="filteredTags">
                <v-chip
                  filter
                  class="animate-chip mr-1 mb-2"
                  color="purple"

                  v-for="tag in project.tags"
                  :key="tag"
                  :value="tag"

                  @click="$emit('tagchipclick', tag)"
                >{{ tagStore.find(tag).name }}</v-chip>
              </v-chip-group>
            </template>

          </v-col>

          <v-col cols="12" md="6">
            <!-- Banner -->
            <v-img :src="project.banner" class="mb-3"></v-img>

            <!-- Images -->
            <v-carousel hide-delimiters height="300px">
              <v-carousel-item
                v-for="screenshot in project.screenshots"
                :key="screenshot"
              >
                <v-img
                  contain
                  eager
                  height="100%"
                  :src="screenshot"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <!-- Description -->
        <vue-markdown :source="project.description"></vue-markdown>

      </v-card-text>

      <!-- Footer -->
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red" v-if="project.demo" :href="project.demo" target="_blank">Demo</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" v-if="project.release" :href="project.release" target="_blank">Release</v-btn>
        <v-btn color="green" v-if="project.source" :href="project.source" target="_blank">Source</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import Project from "~/plugins/api/components/Project";
  import { Context } from "@nuxt/types";
  import {languageStore, frameworkStore, technologyStore, tagStore} from "~/utils/store/store-accessor";

  @Component({
    async asyncData(ctx: Context) {
      // Gets project
      return {
        project: await ctx.app.$api.getStory(`projects/${ctx.route.params.slug}`, {}, false)
      };
    }
  })
  export default class ProjectsName extends Vue {
    private languageStore = languageStore;
    private frameworkStore = frameworkStore;
    private technologyStore = technologyStore;
    private tagStore = tagStore;

    /** A list of languages uuids to filter */
    @Prop({default: null}) filteredLanguages!: string[] | null;

    /** A list of framework uuids to filter */
    @Prop({default: null}) filteredFrameworks!: string[] | null;

    /** A list of technology uuids to filter */
    @Prop({default: null}) filteredTechnologies!: string[] | null;

    /** A list of tag uuids to filter */
    @Prop({default: null}) filteredTags!: string[] | null;

    /** If true, modal is open */
    private open: boolean = true;

    /** Project we are displaying */
    private project!: Project;

    /**
     * Returns formatted date in the project property
     */
    private get dateOfCompletion(): string {
      const date = new Date(this.project.dateOfCompletion);
      return this.$vuetify.breakpoint.smAndDown ?
        date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() :
        date.toDateString();
    }

    /**
     * When user tries to exit the dialog
     */
    private onClickOutside() {
      this.$router.push({
        path: "/projects"
      });
    }
  }
</script>

<style scoped lang="scss">
  @import '~/assets/chip-hover.scss';
  @import "~vuetify/src/styles/styles";

  // Desktop
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    .project-dialog-content {
      max-height: calc(100vh - 250px);
      overflow-y: auto;
    }
  }

  // Phone
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .project-dialog-content {
      max-height: calc(100vh - 300px);
      overflow-y: auto;
    }
  }
</style>
