<template>
  <div>

    <!-- Title page -->
    <div id="first-page" class="fullpage d-flex flex-column justify-space-between align-stretch">

      <div class="" style="padding-left: 100px; padding-top: 100px">
        <h1 id="first-page-title" class="font-weight-light">Matthew Barnes</h1>
        <h2 id="first-page-subtitle" class="font-weight-regular">Software Engineer</h2>
      </div>

      <div class=" d-flex justify-end align-end" style="height:300px;">
        <p></p>
      </div>

    </div>

    <!-- About me -->
    <v-container fluid class="mb-5" style="padding: 100px 0;background-color:#333">
      <v-row>
        <v-col cols="4" style="padding: 0 80px;" class="d-flex justify-center align-center">
          <v-avatar width="200px" height="200px">
            <v-img :src="require('~/assets/images/me.jpg')" />
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <h1 class="mb-2">Welcome!</h1>
          <p>I am a software developer with a passion for automation, clean code, and cool programs that do cool things.</p>
          <p>In my spare time, I play video games and work on self-driven projects.</p>
          <v-btn :href="resume.link" target="_blank">Download my resume</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Starred projects -->
    <v-container>

      <v-row
        class="mb-5 project-row"
        @click="$router.push(`projects/${starredProject.slug}`)"
        v-for="(starredProject, i) in starredProjects" :key="starredProject.slug"
      >
        <!-- Banner -->
        <v-col
          cols="6"
          :order="i % 2"
        >
          <v-img class="rounded project-image" :src="starredProject.banner"></v-img>
        </v-col>

        <!-- Description -->
        <v-col
          class="d-flex flex-column justify-center align-center"
          cols="6"
          :order="1 - i % 2"
          nuxt
        >
          <h1>{{ starredProject.name }}</h1>
          <p class="text-center">{{ starredProject.summary }}</p>
        </v-col>
      </v-row>

      <v-container
        class="d-flex flex-column align-center mb-5"
      >
        <v-btn width="80%" height="80px" nuxt href="/projects">More projects</v-btn>
      </v-container>

    </v-container>
  </div>
  <!--
  <v-container>

    <h1>Home</h1>

    <h2>Starred projects:</h2>
    <div v-for="project in starredProjects" :key="project.uuid">
      <p>{{ project.name }}</p>
      <p>{{ project.release }}</p>
    </div>

  </v-container>
  -->
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import Vanta from "vanta/dist/vanta.net.min";
  import * as THREE from "three";
  import Resume from "~/plugins/api/components/Resume";

  @Component({
    async asyncData(context: Context) {
      // Gets the latest 4 starred projects
      const starredProjects = await context.app.$api.getStories({
        "starts_with": "projects",
        "filter_query[starred][is]": "true",
        "page": 1,
        "per_page": 4
      });

      // Gets resume object
      const resume = await context.app.$api.getResume();

      // Error handling
      if (!starredProjects)
        throw Error("Couldn't fetch starred projects");
      if (!resume)
        throw Error("Couldn't fetch resume object");

      return {
        starredProjects: starredProjects as Project[],
        resume: resume as Resume
      };
    }
  })
  export default class IndexPage extends Vue {
    /** Starred projects */
    private starredProjects: Project[] = [];

    /** Resume object (includes link) */
    private resume!: Resume;

    /** Vanta effect handle for first page */
    private vantaEffect: any;

    async mounted() {
      this.vantaEffect = Vanta({
        el: "#first-page",
        THREE: THREE,
        color: "#444",
        backgroundColor: "#121212"
      });
    }

    beforeDestroy() {
      if (this.vantaEffect)
        this.vantaEffect.destroy();
    }
  }
</script>

<style scoped lang="scss">
  .fullpage {
    width: 100vw;
    height: calc(100vh - 64px);
  }

  #first-page {
    background-color: #222;

    #first-page-title {
      font-size: 100px;
    }

    #first-page-subtitle {
      font-size: 30px;
    }
  }

  .rounded {
    border-radius: 8px;
  }

  .project-row {
    color: darkgrey;
    transition: color 0.2s;

    .project-image {
      transform: rotate(0deg);
      transition: transform 0.2s;
    }

    &:hover {
      color: white;
      cursor:pointer;
      transition: color 0.2s;

      .project-image {
        transform: rotate(2deg);
        transition: transform 0.2s;
      }
    }
  }
</style>
