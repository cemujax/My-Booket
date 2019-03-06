<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <h2>BookInfo</h2>
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
  name: "BookInfo",
  components: { NavToolbar, Footer },
  data() {
    return {};
  }
};
</script>

<style>
</style>
