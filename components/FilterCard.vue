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
        <v-chip-group column multiple :value="value" @change="onValueChange">

          <v-chip
            filter
            class="animate-chip"
            :color="colour"

            v-for="story in store.uuids"
            :key="story"
            :value="story"
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

    /** If true, attribute is enabled */
    private get attributeEnabled(): boolean {
      return this.value !== null;
    }

    /**
     * When the user is updating the filter list
     * @param newValue - the new list of uuids to filter
     */
    private onValueChange(newValue: any) {
      this.$emit('input', newValue);
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
        this.$emit("input", []);
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
