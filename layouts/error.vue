<template>
  <v-app dark>
    <v-content class="pt-0">

      <v-container>
        <v-layout
          column
          justify-center
          align-center
        >
          <v-flex
            xs12
            sm8
            md6
          >

            <!-- Message -->
            <h1>{{ message }}</h1>

          </v-flex>
        </v-layout>
      </v-container>

    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "nuxt-property-decorator";

  /** Information about the error */
  type ErrorParameters = {
    message: string;
    statusCode: number;
  }

  @Component({})
  export default class ErrorLayout extends Vue {
    @Prop({ type: Object, default: null}) error!: ErrorParameters;

    layout() {
      return "empty";
    }

    get message() {
      if (this.error.statusCode === 404)
        return "404 Not Found";
      else
        return "An error occurred";
    }

    head() {
      return { title: this.message };
    }
  }
</script>

<style scoped>
</style>
