<template>

  <v-expansion-panel>
    <v-expansion-panel-header>Awards</v-expansion-panel-header>
    <v-expansion-panel-content>

      <v-card
        color="grey darken-3"
        class="mb-2"
        v-for="award in awards"
        :key="award.title"
      >
        <v-list-item>
          <v-list-item-content>
            <div class="overline">{{ award.years }}</div>
            <v-list-item-title class="headline mb-1 text-wrap">
              {{ award.title }}
            </v-list-item-title>
            <v-list-item-subtitle v-for="subheading in award.awards" :key="subheading">
              {{ subheading }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  interface Award {
    years: string;
    title: string;
    awards: string[];
  }

  @Component({})
  export default class AwardsExpansionPanel extends Vue {
    private awards: Award[] = [
      {
        years: "2017",
        title: "Bournemouth School",
        awards: [
          "Year 13 Prize for Performance in A-level Examinations",
          "Year 13 Computing Prize",
          "Headmaster's Prize for academic excellence"
        ]
      },
      {
        years: "2016-2017",
        title: "British Informatics Olympiad",
        awards: [
          "2016 - 49%",
          "2017 - 47%"
        ]
      },
      {
        years: "2015",
        title: "Year 11 Representative",
        awards: [
          "Voted by peers"
        ]
      },
      {
        years: "2016-2017",
        title: "UKMT Senior and Junior Mathematical Challenges",
        awards: [
          "Attained Silver and Bronze certificates throughout"
        ]
      }
    ]
  }
</script>

<style scoped>

</style>
