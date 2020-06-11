<template>

  <v-data-table
    :headers="headers"
    :items="changes"
    item-key="date"
    :sort-by="['date']"
    :sort-desc="true"
    :hide-default-footer="true"
  >
    <!-- Markdown -->
    <template v-slot:item.story.content.changes="{ item }">
      <vue-markdown class="markdown" :source="item.changes"></vue-markdown>
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
        value: "date",
        width: "15%"
      },
      {
        text: "Logs",
        value: "changes",
        sortable: false,
        width: '200px'
      }
    ];
  }
</script>

<style scoped>
  .markdown {
    max-width:850px; /* This makes sure markdown doesn't stretch the table */
  }
</style>
