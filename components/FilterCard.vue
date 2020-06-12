<template>

  <v-card>
    <!-- Toolbar -->
    <v-toolbar
      flat
      dark
      class="filtercard-toolbar"
      :color="`${attributeEnabled ? colour : 'grey'} darken-4`"
      @click="onToolbarClick"
    >
      <!-- Title -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click.stop="onEnablerClick" fab outlined>
        <v-icon :color="`${colour} lighten-3`">{{ attributeEnabled ? "mdi-check" : "mdi-close" }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-expand-transition>
      <v-card-text v-show="showChips">
        <v-chip-group column multiple v-model="selectedUuidIndexes">
          <v-chip filter :color="colour" v-for="story in store.uuids" :key="story">{{ store.find(story).name }}</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-expand-transition>
  </v-card>

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";
  import MappingModule from "~/utils/store/MappingModule";
  import Story from "~/plugins/api/components/Story";

  @Component({})
  export default class FilterCard extends Vue {
    /** The colour of the filter card */
    @Prop(String) colour!: string;

    /** Mapping module of the filter card */
    @Prop(Object) store!: MappingModule<any>;

    /** Title of the filter card */
    @Prop(String) title!: string;

    /** If true, chips are shown */
    private showChips: boolean = false;

    /** The attribute value UUIDs to filter.
     * If empty list, no values are filtered, so show everything.
     * If null, this attribute is disabled and should be hidden.
     */
    @Prop({default: () => [], type: Array})
    private value!: string[] | null;

    /** Indexes of UUIDs that are selected */
    private selectedUuidIndexes: number[] = [];

    /** If true, attribute is enabled */
    private get attributeEnabled(): boolean {
      return this.value !== null;
    }

    /** The list of selected story uuids */
    private get selectedUuids(): string[] {
      return this.selectedUuidIndexes.map(i => this.store.uuids[i]);
    }

    @Watch('selectedUuids')
    private onSelectedUuidsChange(newUuids: string[], oldUuids: string[]) {
      // If this attribute is enabled, update value
      if (this.attributeEnabled)
        this.$emit("input", newUuids);
    }

    private onToolbarClick() {
      this.showChips = !this.showChips;
    }

    private onEnablerClick() {
      // If attribute is enabled, disable it
      if (this.attributeEnabled)
        this.$emit("input", null);
      else
        this.$emit("input", this.selectedUuids);
    }
  }
</script>

<style scoped>
  .filtercard-toolbar:hover {
    cursor: pointer;
  }
</style>
