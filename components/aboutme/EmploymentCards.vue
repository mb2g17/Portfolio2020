<template>
  <v-row>
    <v-col cols="12" v-for="job in jobs" :key="job.name">
      <v-card>

        <v-list-item>

          <v-list-item-content>
            <div class="overline">{{ job.date }}</div>
            <v-list-item-title class="headline mb-1">{{ job.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ job.role }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ job.time }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            style="border-radius:5px"
            color="grey"
          >
            <v-img
              contain
              class="white--text align-end"
              height="100px"
              :src="job.image"
            >
            </v-img>
          </v-list-item-avatar>
        </v-list-item>

      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  interface Job {
    name: string;
    role: string;
    date: string;
    time: string
    image: any;
  }

  @Component({})
  export default class EmploymentCards extends Vue {
    /**
     * Jobs I've had
     */
    private jobs: Job[] = [
      {
        name: "Gearset",
        role: "Remote Software Engineer Intern",
        date: "July 2020 to September 2020",
        time: "Full-time",
        image: require('~/assets/images/gearset.png')
      },
      {
        name: "Cheam High",
        role: "Software Developer",
        date: "August 2015 for 2 weeks",
        time: "Part-time",
        image: require('~/assets/images/cheamhigh.jpeg')
      },
      {
        name: "THP",
        role: "Accounting Assistant (Work Experience)",
        date: "July 2014 for 2 weeks",
        time: "Full-time",
        image: require('~/assets/images/thp.jpg')
      }
    ];
  }
</script>

<style scoped>

</style>
