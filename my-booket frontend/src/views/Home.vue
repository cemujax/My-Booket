<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <h2 v-if="loading">Loading..</h2>
            <Carousel header-title="베스트셀러" :items="bestSellers"/>
            <v-divider></v-divider>
            <Carousel header-title="신간도서" :items="newBooks"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: "Home",
  components: { NavToolbar, Footer, Carousel },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      newBooks: "newBooks",
      bestSellers: "bestSellers"
    })
  },
  created() {
    if (
      !this.$store.state.newBooks.length ||
      !this.$store.state.bestSellers.length
    )
      this.fetchData();
  },

  methods: {
    ...mapActions(["FETCH_NEWBOOKS", "FETCH_BESTSELLERS"]),

    fetchData() {
      this.loading = true;
      this.FETCH_NEWBOOKS();
      this.FETCH_BESTSELLERS().finally(_ => {
        this.loading = false;
      });
    }
  }
};
</script>

<style>
</style>
