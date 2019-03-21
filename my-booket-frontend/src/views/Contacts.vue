<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm4>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <span class="display-2">Contact Me</span>
                </div>
              </v-card-title>
              <v-divider/>
              <v-card-text>
                <div>
                  <span class="subheading">
                    E-Mail:
                    <a href="mailto: cemujax@gmail.com">cemujax@gmail.com</a>
                  </span>
                </div>
                <div>
                  <span class="subheading">GitHub: cemujax</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-layout justify-center>
                  <a href="https://github.com/cemujax">
                    <v-btn color="warning" dark>GitHub</v-btn>
                  </a>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Contacts",
  components: { NavToolbar, Footer },
  data() {
    return {};
  }
};
</script>

<style>
</style>
