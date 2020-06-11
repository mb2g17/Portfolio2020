<template>

  <v-card>
    <!-- Toolbar -->
    <v-toolbar
      flat
      dark
      class="filtercard-toolbar"
      :color="`${colour} darken-4`"
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
        <v-chip-group column multiple>
          <v-chip filter :color="colour" v-for="story in store.uuids" :key="story">{{ store.find(story).name }}</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-expand-transition>
  </v-card>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";
  import MappingModule from "~/utils/store/MappingModule";

  @Component({})
  export default class FilterCard extends Vue {
    /** The colour of the filter card */
    @Prop(String) colour!: string;

    /** Mapping module of the filter card */
    @Prop(Object) store!: MappingModule<any>;

    /** Title of the filter card */
    @Prop(String) title!: string;

    /** Initial value of attribute enabled */
    @Prop({default: true, type: Boolean}) defaultAttributeEnabled!: boolean;

    /** If true, chips are shown */
    private showChips: boolean = false;

    /** If true, attribute is enabled */
    private attributeEnabled: boolean = true;

    mounted() {
      this.attributeEnabled = this.defaultAttributeEnabled;
    }

    private onToolbarClick() {
      this.showChips = !this.showChips;
    }

    private onEnablerClick() {
      this.attributeEnabled = !this.attributeEnabled;
    }
  }
</script>

<style scoped>
  .filtercard-toolbar:hover {
    cursor: pointer;
  }
</style>
