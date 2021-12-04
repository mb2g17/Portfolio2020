<template>
  <v-row>
    <v-col cols="12" v-for="job in jobs" :key="job.name">
      <v-card @click="job.showDescription = !job.showDescription">

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

        <v-expand-transition>
          <v-card
            v-if="job.showDescription"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <p>{{ job.description }}</p>
            </v-card-text>
          </v-card>
        </v-expand-transition>

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
    description: string;
    showDescription: boolean;
  }

  @Component({})
  export default class EmploymentCards extends Vue {
    /**
     * Jobs I've had
     */
    private jobs: Job[] = [
      {
        name: "Gearset",
        role: "Software Engineer",
        date: "September 2021 to November 2021",
        time: "Full-time",
        image: require('~/assets/images/gearset.png'),
        description: "My employment with Gearset was very similar to my internship. During my employment, I worked on Salesforce data and metadata backups, as well as messaging customers concerning their backup failures.",
        showDescription: false,
      },
      {
        name: "Gearset",
        role: "Software Engineer Intern",
        date: "July 2020 to September 2020",
        time: "Full-time",
        image: require('~/assets/images/gearset.png'),
        description: "During my internship with Gearset, I worked on various parts of the Gearset app, including DevOps integration, Salesforce backups and data / metadata deployments. I learned the importance of working in a team, as well as the differences between working on software projects in industry and working on personal projects.",
        showDescription: false,
      },
      {
        name: "Cheam High",
        role: "Software Developer",
        date: "August 2015 for 2 weeks",
        time: "Part-time",
        image: require('~/assets/images/cheamhigh.jpeg'),
        description: "At Cheam High, I performed various programming tasks, such as creating a bell program used for parents’ evening. I learned how to apply user feedback to projects and how to adapt my code style for others.",
        showDescription: false,
      },
      {
        name: "THP",
        role: "Accounting Assistant (Work Experience)",
        date: "July 2014 for 2 weeks",
        time: "Full-time",
        image: require('~/assets/images/thp.jpg'),
        description: "At THP, I performed tasks such as maintaining folder organisation and working with Microsoft Excel spreadsheets.",
        showDescription: false,
      }
    ];

    private reveal: boolean = false;
  }
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
