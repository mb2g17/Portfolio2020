<template>

  <v-expansion-panel>
    <v-expansion-panel-header>GCSE</v-expansion-panel-header>
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
            <td>Further Mathematics</td>
            <td>A**</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>Information Technology</td>
            <td>A*</td>
            <td>Edexcel</td>
          </tr>
          <tr>
            <td>Mathematics</td>
            <td>A*</td>
            <td>OCR</td>
          </tr>
          <tr>
            <td>Business Studies</td>
            <td>A</td>
            <td>Edexcel</td>
          </tr>
          <tr>
            <td>Computer Science</td>
            <td>A</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>Additional Science</td>
            <td>A</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>A</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>English Language</td>
            <td>A</td>
            <td>CIE</td>
          </tr>
          <tr>
            <td>English Literature</td>
            <td>A</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>German</td>
            <td>B</td>
            <td>AQA</td>
          </tr>
          <tr>
            <td>Media Studies</td>
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
  export default class GCSEExpansionPanel extends Vue {}
</script>

<style scoped>

</style>
