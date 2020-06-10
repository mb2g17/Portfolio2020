<template>

  <v-data-table
    :headers="headers"
    :items="changes"
    item-key="story.content.date"
    :sort-by="['story.content.date']"
    :sort-desc="true"
    :hide-default-footer="true"
  >
    <!-- Date -->
    <template v-slot:item.story.content.date="{ item }">
      {{ filterDate(item.story.content.date) }}
    </template>

    <!-- Markdown -->
    <template v-slot:item.story.content.changes="{ item }">
      <vue-markdown class="markdown" :source="item.story.content.changes"></vue-markdown>
    </template>

    <!-- Pagination in the header -->
    <template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
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
        width: '200px'
      }
    ];

    /**
     * Filters datetime string to give just the date
     * @param dateTime - the date time string
     * @returns the same thing but with just the date
     */
    private filterDate(dateTime: string) {
      let date = new Date(dateTime);
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
  }
</script>

<style scoped>
  .markdown {
    max-width:850px; /* This makes sure markdown doesn't stretch the table */
  }
</style>
