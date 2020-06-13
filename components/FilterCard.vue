<template>

  <v-card>
    <!-- Toolbar -->
    <v-toolbar
      flat
      dark
      v-ripple
      class="filtercard-toolbar"
      :color="`${attributeEnabled ? colour : 'grey'} darken-4`"
      @click="onToolbarClick"
    >
      <!-- Title -->
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        fab
        outlined
        @mousedown.stop=""
        @touchstart.stop=""
        @click.stop="onEnablerClick"
      >
        <v-icon :color="`${colour} lighten-3`">{{ attributeEnabled ? "mdi-check" : "mdi-close" }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-expand-transition>
      <v-card-text v-show="showChips">
        <v-chip-group column multiple v-model="selectedUuidIndexes">

          <v-chip
            filter
            class="animate-chip"
            :color="colour"

            v-for="story in store.uuids"
            :key="story"
          >
            {{ store.find(story).name }}
          </v-chip>

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

    /** The attribute value UUIDs to filter.
     * If empty list, no values are filtered, so show everything.
     * If null, this attribute is disabled and should be hidden.
     */
    @Prop({default: () => [], type: Array})
    private value!: string[] | null;

    /** If true, chips are shown */
    private showChips: boolean = false;

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

    /**
     * Calculates if value and selected UUIDs are equal
     */
    private isValueAndSelectedUuidsEqual(): boolean {
      if (this.value === null)
        return false;

      // Converts value to id array
      const valueID = this.value.map(uuid => this.store.uuids.indexOf(uuid));

      // Checks if value and selectedUuidIndexes are equal
      const valueIDSet = new Set(valueID);
      const selectedUuidIndexesSet = new Set(this.selectedUuidIndexes);
      let equal: boolean = true;

      // Checks if equal
      if (valueIDSet.size !== selectedUuidIndexesSet.size) {
        equal = false;
      } else {
        for (const val of valueIDSet) {
          if (!selectedUuidIndexesSet.has(val)) {
            equal = true;
          }
        }
      }

      return equal;
    }

    /**
     * When attribute value UUIDs to filter changes.
     * This usually happens when project card chip is clicked.
     */
    @Watch('value')
    private onValueChange(newValue: string[] | null, oldValue: string[] | null) {
      // If value isn't null
      if (newValue === null)
        return;

      // Converts value to id array
      const valueID = newValue.map(uuid => this.store.uuids.indexOf(uuid));

      // If they are not equal, update and return
      if (!this.isValueAndSelectedUuidsEqual()) {
        this.selectedUuidIndexes = valueID;
        return;
      }
    }

    /**
     * When user clicks on a value to filter by
     * @param newUuids - new list of uuids
     * @param oldUuids - old list of uuids
     */
    @Watch('selectedUuids')
    private onSelectedUuidsChange(newUuids: string[], oldUuids: string[]) {
      // If attribute is disabled, no update is needed
      if (!this.attributeEnabled)
        return;

      // If value is null, no update is needed
      if (this.value === null)
        return;

      // If value and selected uuids are not equal, update value
      if (!this.isValueAndSelectedUuidsEqual()) {
        this.$emit("input", newUuids);
      }
    }

    private onToolbarClick() {
      // If this attribute is enabled, show the chips
      if (this.attributeEnabled)
        this.showChips = !this.showChips;
    }

    private onEnablerClick() {
      // If attribute is enabled, disable it and hide chips
      if (this.attributeEnabled) {
        this.$emit("input", null);
        this.showChips = false;
      }
      // If attribute is disabled, enable it and show chips
      else {
        this.$emit("input", this.selectedUuids);
        this.showChips = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~/assets/chip-hover.scss';

  .filtercard-toolbar:hover {
    cursor: pointer;
  }
</style>
