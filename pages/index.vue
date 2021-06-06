<template>
  <div>

    <!-- Title page -->
    <v-container fluid id="first-page" class="fullpage">

      <h1 id="first-page-title" class="font-weight-light">Matthew Barnes</h1>
      <h2 id="first-page-subtitle" class="font-weight-regular">Software Engineer</h2>

    </v-container>

    <!-- About me -->
    <v-container fluid id="aboutme" class="mb-5">
      <v-row>
        <v-col cols="12" md="4" style="padding: 0 80px;" class="d-flex justify-center align-center">
          <v-avatar width="200px" height="200px">
            <v-img :src="require('~/assets/images/me.jpg')" />
          </v-avatar>
        </v-col>
        <v-col id="aboutme-body" cols="12" md="8">
          <h1 class="mb-2">Welcome!</h1>
          <p>I am a software developer with a passion for automation, clean code, and cool programs that do cool things.</p>
          <p>In my spare time, I work on self-driven projects and play video games.</p>
          <v-btn id="aboutme-resume" :href="resume.link" target="_blank">Download my resume</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Starred projects -->
    <v-container>

      <h1 class="mb-5" align="center">Star Projects</h1>

      <v-row>
        <v-col v-for="starredProject in starredProjects" :key="starredProject.slug" cols="12" md="3">
          <ProjectCard
            :project="starredProject"
          />
        </v-col>
      </v-row>

      <v-container
        class="d-flex flex-column align-center mb-5"
      >
        <v-btn width="80%" height="80px" nuxt href="/projects">
          More projects
        </v-btn>
      </v-container>

    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Context } from "@nuxt/types";
  import Project from "~/plugins/api/components/Project";
  import Vanta from "vanta/dist/vanta.net.min";
  import * as THREE from "three";
  import Resume from "~/plugins/api/components/Resume";
  import ProjectCard from "~/components/ProjectCard.vue";

  @Component({
    components: {
      ProjectCard
    },
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
        starredProjects: JSON.parse(JSON.stringify(starredProjects)),
        resume: JSON.parse(JSON.stringify(resume))
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

    head() {
      return {
        title: "Home"
      };
    }

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
  @import "~vuetify/src/styles/styles";

  // Desktop
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    .fullpage {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #first-page {
      background-color: #222;
      padding-left: 100px;
      padding-top: 100px;

      #first-page-title {
        font-size: 100px;
      }

      #first-page-subtitle {
        font-size: 30px;
      }
    }

    #aboutme {
      padding: 100px 0;
      background-color:#333;
    }
  }

  // Phone
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .fullpage {
      width: 100vw;
      height: calc(100vh - 56px);
    }

    #first-page {
      background-color: #222;
      padding-left: 30px;
      padding-top: 100px;

      #first-page-title {
        font-size: 10vw;
      }

      #first-page-subtitle {
        font-size: 6vw;
      }
    }

    #aboutme {
      padding: 50px 0;
      background-color:#333;

      #aboutme-body {
        display: flex;
        flex-direction: column;
        align-items: center;

        h1, p {
          text-align:center;
          padding: 0 10px;
        }

        #aboutme-resume {
          margin-top: 20px;
          width: 80%;
        }
      }
    }
  }

  .rounded {
    border-radius: 8px;
  }
</style>
