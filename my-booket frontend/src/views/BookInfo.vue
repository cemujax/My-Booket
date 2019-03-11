<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <div v-if="book">
              <div class="book-info1">
                <img :src="book.coverLargeUrl" :alt="book.title">
                <div class="book-desc">
                  {{book.description}}
                  <div>
                    <a :href="book.link">
                      <v-btn color="info">인터파크 링크</v-btn>
                    </a>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          flat
                          icon
                          color="pink"
                          v-on="on"
                          v-if="!isBooket(book.isbn)"
                          @click.prevent="addBooket"
                        >
                          <v-icon>favorite</v-icon>
                        </v-btn>
                      </template>
                      <span>Booket 담기</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
              <div class="book-info2">
                <span class="book-title">{{book.title}}</span>
                <ul>
                  <li>저자:{{book.author}}</li>
                  <li>출판사: {{book.publisher}}</li>
                  <li>출판일: {{book.pubDate}}</li>
                </ul>
              </div>
            </div>
            <div v-else>
              <h2>Book Not Exists</h2>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "BookInfo",
  components: { NavToolbar, Footer },
  data() {
    return {};
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState({
      book: "book"
    }),
    ...mapGetters(["isBooket"])
  },
  methods: {
    ...mapActions(["ADD_BOOKET"]),

    addBooket() {
      this.ADD_BOOKET({ bookInfo: this.book }).then(_ =>
        this.$router.push(`/booket`)
      );
    },
    fetchData() {
      if (
        this.$route.query.book &&
        Object.keys(this.$route.query.book).length !== 0
      ) {
        this.$store.state.book = this.$route.query.book;
      }
    }
  }
};
</script>

<style>
.book-info1 {
  display: flex;
}
.book-title {
  font-size: 22px;
  font-weight: bold;
}
.book-info2 {
  margin-top: 3%;
}
.book-desc {
  padding: 2%;
}
li {
  list-style: none;
  font-size: 16px;
}
</style>
