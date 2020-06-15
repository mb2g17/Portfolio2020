<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Degree</v-expansion-panel-header>
    <v-expansion-panel-content>
      <h2>University of Southampton</h2>
      <p>Masters Degree in Software Engineering, 2017 - 2021</p>

      <v-data-table
        dense
        :headers="degreeHeaders"
        :items="degreeItems"
      ></v-data-table>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({})
  export default class DegreeExpansionPanel extends Vue {

    private degreeHeaders: any = [
      {
        text: "Module",
        value: "module"
      },
      {
        text: "Marks",
        value: "marks",
        width: "15%"
      }
    ];

    private degreeItems: any = [
      {
        module: "Algorithmics",
        marks: 78
      },
      {
        module: "Programming I",
        marks: 89
      },
      {
        module: "Computer Systems I",
        marks: 68
      },
      {
        module: "Data Management",
        marks: 72
      },
      {
        module: "Professional Development",
        marks: 68
      },
      {
        module: "Programming II",
        marks: 79
      },
      {
        module: "Foundations of Computer Science",
        marks: 89
      },
      {
        module: "Software Modelling and Design",
        marks: 83
      },
      {
        module: "Distributed Systems and Networks",
        marks: 81
      },
      {
        module: "Interaction Design",
        marks: 65
      },
      {
        module: "Intelligent Systems",
        marks: 87
      },
      {
        module: "Programming III",
        marks: 85
      },
      {
        module: "Theory of Computing",
        marks: 62
      },
      {
        module: "Software Engineering Group Project",
        marks: 67
      },
      {
        module: "Programming Language Concepts",
        marks: 75
      },
      {
        module: "Advanced Software Modelling and Design",
        marks: 85
      },
      {
        module: "Part III Individual Project",
        marks: "??"
      },
      {
        module: "Cloud Application Development",
        marks: 77
      },
      {
        module: "Advanced Databases",
        marks: "??"
      },
      {
        module: "Game Design and Development",
        marks: "??"
      },
      {
        module: "Engineering Management & Law",
        marks: 62
      },
      {
        module: "Machine Learning Technologies",
        marks: 82
      },
    ];
  }
</script>

<style scoped>

</style>
