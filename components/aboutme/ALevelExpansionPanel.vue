<template>

  <v-expansion-panel>
    <v-expansion-panel-header>GCE Advanced Level</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-simple-table
        :dense="true"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Exam board</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>Computer Science</td>
            <td>A*</td>
            <td>OCR</td>
          </tr>
          <tr>
            <td>Maths</td>
            <td>A*</td>
            <td>OCR</td>
          </tr>
          <tr>
            <td>Further Maths</td>
            <td>A</td>
            <td>OCR</td>
          </tr>
          <tr>
            <td>Physics</td>
            <td>B</td>
            <td>AQA</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({})
  export default class ALevelExpansionPanel extends Vue {}
</script>

<style scoped>

</style>
