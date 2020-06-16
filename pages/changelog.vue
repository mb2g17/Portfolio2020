<template>
  <v-container>

    <h1>Changelog</h1>
    <p>This is the changelog, where I log all of the changes to this portfolio, including the addition of projects, editing how the website works, fixing bugs etc.</p>

    <Changelog :changes="changes" />

  </v-container>
</template>

<script lang="ts">
  import { Context } from "@nuxt/types";
  import {Component, Vue} from "nuxt-property-decorator";
  import Changelog from "~/components/Changelog.vue";
  import Change from "~/plugins/api/components/Change";

  @Component({
    async asyncData(ctx: Context) {
      // Fetches changes
      const stories = await ctx.app.$api.getStories({
        "starts_with": "changelog"
      });

      // If call was successful, return list of changes
      if (stories) {
        return {
          changes: JSON.parse(JSON.stringify(stories))
        };
      }
    },
    components: {
      Changelog
    }
  })
  export default class ChangelogPage extends Vue {
    /** A list of changes, populated by asyncData */
    private changes: Change[] = [];

    head() {
      return {
        title: "Changelog"
      };
    }
  }
</script>
