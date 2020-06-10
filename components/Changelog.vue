<template>
  <v-data-table
    :headers="headers"
    :items="changes"
    item-key="story.content.date"
    :sort-by="['story.content.date']"
    :sort-desc="true"
  >
    <template v-slot:item.story.content.changes="{ item }">
      <vue-markdown :source="item.story.content.changes"></vue-markdown>
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import Change from "~/plugins/api/components/Change";

  @Component({})
  export default class Changelog extends Vue {
    /** Prop holding list of changes (logs) */
    @Prop({default: () => [], type: Array}) changes!: Change[];

    /** Headers of the table */
    private headers: any = [
      {
        text: "Date",
        value: "story.content.date",
        width: "15%"
      },
      {
        text: "Logs",
        value: "story.content.changes",
        sortable: false,
        width: '85%'
      }
    ];
  }
</script>

<style scoped>

</style>
