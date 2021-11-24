<template>
  <v-container>

    <h1>Donate</h1>

    <v-container class="mb-5">
      <p>If you like my work and want to support me, then feel free to donate with Bitcoin, Monero, or through PayPal!</p>

      <v-row justify="center">
        <!-- Bitcoin -->
        <v-col cols=12 md=3>
          <v-card max-height="380">

            <v-img
              max-height="380"
              class="mt-3"
              :src="require('~/assets/images/bitcoin.png')"
            >
              <v-card-title>Bitcoin</v-card-title>
              <v-card-text align="center">
                <code class="wrap-overflow">bc1qnedvzjz3f0xkx85hnhqsyevllzwxf923ztxrqt</code>
                <v-img
                  max-width="145"
                  max-height="145"
                  class="mt-3"
                  :src="require('~/assets/images/bitcoin-qr.png')"
                />
              </v-card-text>
            </v-img>

          </v-card>
        </v-col>

        <!-- Monero -->
        <v-col cols=12 md=3>
          <v-card>

            <v-img
              max-height="380"
              class="mt-3"
              :src="require('~/assets/images/monero.png')"
            >
              <v-card-title>Monero</v-card-title>
              <v-card-text align="center">
                <code class="wrap-overflow">89Q3zVVBoZFYAWS1X4cKUBgqK9B2PNfSkhrAKNn9ymPDATXy5DdXjzNRtocANZvyVoWojJd1fohWAAymAB3prSqxUhBJAyE</code>
                <v-img
                  max-width="240"
                  max-height="240"
                  class="mt-3"
                  :src="require('~/assets/images/monero-qr.png')"
                />
              </v-card-text>
            </v-img>

          </v-card>
        </v-col>

        <!-- Paypal -->
        <v-col cols=12 md=3>
          <v-card>

            <v-img
              max-height="380"
              class="mt-3"
              :src="require('~/assets/images/paypal.png')"
            >
              <v-card-title>PayPal</v-card-title>
              <v-card-text align="center">
                <v-btn class="mt-1" href="https://paypal.me/mb2g17" target="_blank">PayPal.Me</v-btn>
              </v-card-text>
            </v-img>

          </v-card>
        </v-col>
      </v-row>

    </v-container>

  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import ProjectCard from "~/components/ProjectCard.vue";

  @Component({
    components: {
      ProjectCard
    }
  })
  export default class DonatePage extends Vue {
  }
</script>

<style scoped lang="scss">
  @import "~vuetify/src/styles/styles";

  .wrap-overflow {
    overflow-wrap: anywhere;
  }
</style>
