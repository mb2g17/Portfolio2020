<template>
  <v-container>

    <h1>About Me</h1>

    <v-row>
      <v-col cols="6">

        <h2>Employment</h2>
        <EmploymentCards />

      </v-col>
      <v-col cols="6">
        <h2>Education</h2>

        <v-expansion-panels>

          <DegreeExpansionPanel />

          <v-expansion-panel>
            <v-expansion-panel-header>GCE Advanced Level</v-expansion-panel-header>
            <v-expansion-panel-content>Hello world</v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>GCSE</v-expansion-panel-header>
            <v-expansion-panel-content>Hello world</v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Awards</v-expansion-panel-header>
            <v-expansion-panel-content>Hello world</v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-col>
    </v-row>

    <p>My name is Matthew Barnes. By the time you read this, I should be <b>{{ age }}</b> years old.</p>

    <p>From a young age, I've been interested in programming. When I was younger, I used to draw a lot of comics and create stories based on those comics. I've always had ideas on making games for those comic series I made. In addition, I've always wanted to make video games of the same calibre I used to play. With that, I soon got around to it when I learned how to use the Game Maker engine at the age of around 9.</p>

    <p>After around 2 years of using Game Maker to fulfil my thirst for game-making, I started to move on to proper programming languages; my first being C. I started off with making command prompt games and utilities, some of which you can download on this portfolio.</p>

    <p>Eventually, when I sprouted off to other languages such as C++, Java and C# (in that order), I started to get better at making programs and realised my talent for programming. Following this, I started using a broader range of libraries (such as SDL and LibGDX) and programming techniques.</p>

    <p>Despite being heavily inspired by video games to start programming in the first place, I do take pleasure in creating utilities and web applications too; however, making games will always be a great hobby of mine, for nothing would please me greater than to develop and grow the same things that got me into the world of programming in the first place.</p>

    <p>Keep in mind that my projects are not the only things I'm showcasing; I built this website myself, too!</p>

  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";
  import EmploymentCards from "~/components/aboutme/EmploymentCards.vue";
  import DegreeExpansionPanel from "~/components/aboutme/DegreeExpansionPanel.vue";

  @Component({
    components: {
      DegreeExpansionPanel,
      EmploymentCards
    }
  })
  export default class AboutMePage extends Vue {

    /**
     * My age in years
     */
    private get age(): number {
      // Gets dates now and then
      const dateNow = new Date();
      const dateThen = new Date("1998/12/13");

      // Calculates difference in milliseconds
      let difference = dateNow.getTime() - dateThen.getTime();

      difference = difference /= 1000; // millisec to sec
      difference = difference /= 60; // sec to min
      difference = difference /= 60; // min to hr
      difference = difference /= 24; // hr to day
      difference = difference /= 365; // day to year

      // Floors difference to get my age in years
      return Math.floor(difference);
    }
  }
</script>
