<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12 sm8 offset-sm2>
            <h2>Signup Page</h2>
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
  name: "Signup",
  components: { NavToolbar, Footer },
  data() {
    return {};
  }
};
</script>

<style>
</style>
