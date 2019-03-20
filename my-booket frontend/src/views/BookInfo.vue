<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container>
        <Book :item="book" :isFunc="true"/>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";
import Book from "@/components/Book";

export default {
  name: "BookInfo",
  components: { NavToolbar, Footer, Book },
  data() {
    return {};
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState({
      book: "book"
    })
  },
  methods: {
    fetchData() {
      if (
        this.$route.query.book &&
        this.$route.query.book.hasOwnProperty("title")
      ) {
        this.$store.state.book = this.$route.query.book;
      } else {
        this.$store.state.book = {};
      }
    }
  }
};
</script>

<style >
</style>
