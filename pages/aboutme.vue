<template>
  <v-container>

    <h1>About Me</h1>

    <v-container class="mb-5">

      <!-- Mobile image -->
      <v-container class="d-flex justify-center" v-if="$vuetify.breakpoint.smAndDown">
        <v-img
          class="portrait ma-5"
          :src="require('~/assets/images/wine.jpg')"
        ></v-img>
      </v-container>

      <!-- Desktop image -->
      <v-img
        class="portrait ma-5"
        :src="require('~/assets/images/wine.jpg')"
        v-else
      ></v-img>

      <h2 class="mb-3">My name is Matthew Barnes.</h2>

      <p>By the time you read this, I should be <b>{{ age }}</b> years old.</p>

      <p>From a young age, I've been interested in programming. When I was younger, I drew comics and created stories based on those comics. I used to have ideas on making games for those comic series, taking inspiration from video games I played. With that, I soon got around to it when I learned how to use the Game Maker engine at the age of 9.</p>

      <p>After around 2 years of using the Game Maker engine, I moved on to proper programming languages, my first being C. I started off with making command-line interface utilities.</p>

      <p>Eventually, I sprouted off to other languages such as C++, Java, and C#. Following this, I started using a broader range of frameworks, libraries, and programming technologies.</p>

      <p>My projects are not the only things I am showcasing; this website was also hand-crafted by yours truly!</p>
    </v-container>

    <v-row class="clear">
      <v-col cols="12" md="6">

        <h2>Employment</h2>
        <EmploymentCards />

      </v-col>
      <v-col cols="12" md="6">
        <h2 class="mb-3">Education</h2>

        <v-expansion-panels>

          <DegreeExpansionPanel />
          <ALevelExpansionPanel />
          <GCSEExpansionPanel />
          <AwardsExpansionPanel />

        </v-expansion-panels>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from "nuxt-property-decorator";
  import EmploymentCards from "~/components/aboutme/EmploymentCards.vue";
  import DegreeExpansionPanel from "~/components/aboutme/DegreeExpansionPanel.vue";
  import ALevelExpansionPanel from "~/components/aboutme/ALevelExpansionPanel.vue";
  import GCSEExpansionPanel from "~/components/aboutme/GCSEExpansionPanel.vue";
  import AwardsExpansionPanel from "~/components/aboutme/AwardsExpansionPanel.vue";

  @Component({
    components: {
      AwardsExpansionPanel,
      GCSEExpansionPanel,
      ALevelExpansionPanel,
      DegreeExpansionPanel,
      EmploymentCards
    }
  })
  export default class AboutMePage extends Vue {
    head() {
      return {
        title: "About Me"
      };
    }

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
      difference = difference /= 365.25; // day to year

      // Floors difference to get my age in years
      return Math.floor(difference);
    }
  }
</script>

<style scoped lang="scss">
  @import "~vuetify/src/styles/styles";

  .portrait {
    // Desktop
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      border-radius: 10px;
      float: right;
      width: 300px;
      height: auto;
    }
    // Phone
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      border-radius: 10px;
      width: 100%;
      max-width: 300px;
      height: auto;
    }
  }

  .clear {
    clear:both;
  }
</style>
