<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex>
            <div v-if="item">
              <div class="book-info1">
                <img :src="item.coverLargeUrl" :alt="item.title">
                <div class="book-desc">
                  {{item.description}}
                  <div>
                    <a :href="item.link">
                      <v-btn color="info">인터파크 링크</v-btn>
                    </a>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn flat icon color="pink" v-on="on" @click.prevent="addBooket">
                          <v-icon>favorite</v-icon>
                        </v-btn>
                      </template>
                      <span>Booket 담기</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
              <div class="book-info2">
                <span class="book-title">{{item.title}}</span>
                <ul>
                  <li>저자:{{item.author}}</li>
                  <li>출판사: {{item.publisher}}</li>
                  <li>출판일: {{item.pubDate}}</li>
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
import { mapActions } from "vuex";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "BookInfo",
  components: { NavToolbar, Footer },
  data() {
    return {
      item: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["ADD_BOOKET", "FETCH_BOOKETS"]),

    addBooket() {
      this.ADD_BOOKET({ bookInfo: this.item }).then(_ =>
        this.$router.push(`/booket`)
      );
    },
    fetchData() {
      const books = [
        ...this.$store.state.newBooks,
        ...this.$store.state.bestSellers
      ];
      const item = books.filter(item => item.isbn == this.$route.params.id);
      this.item = { ...item[0] };
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
