<template>
  <v-app dark>
    <v-content class="pt-0">

      <v-container>
        <v-row>

          <v-col cols="12">
            <h1 id="whoops">Whoops!</h1>
          </v-col>

          <v-col>
            <!-- Code -->
            <h1>Error {{ error.statusCode }}</h1>

            <!-- Message -->
            <p>{{ error.message }}</p>
          </v-col>

        </v-row>
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

  @Component({
    layout: 'error'
  })
  export default class ErrorLayout extends Vue {
    @Prop({ type: Object, default: null}) error!: ErrorParameters;

    head() {
      return { title: this.error.message };
    }
  }
</script>

<style scoped lang="scss">
  @import "~vuetify/src/styles/styles";

  #whoops {
    // Desktop
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      font-size: 150px;
    }
    // Phone
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      font-size: 70px;
    }
  }
</style>
