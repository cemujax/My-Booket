<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout>
          <v-flex xs8 sm8 md8 offset-sm2>
            <h2>책조회</h2>
            <div class="search-book-wrapper mt-3">
              <v-flex xs6 sm4 md3>
                <v-select
                  :items="queryOptions"
                  item-text="text"
                  item-value="value"
                  label="검색타입"
                  solo
                  v-model="queryType"
                ></v-select>
              </v-flex>
              <v-flex xs6 sm8 md9>
                <v-text-field
                  v-model.trim="query"
                  ref="query"
                  hide-details
                  solo
                  @keydown.enter="searchBook"
                >
                  <template v-slot:append>
                    <v-btn class="mx-0" color="red lighten-2" flat @click="searchBook">
                      <v-icon dark cneter>search</v-icon>검색
                    </v-btn>
                  </template>
                </v-text-field>
              </v-flex>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container style="padding-top:0;">
        <div v-if="Object.keys(searchResult).length !== 0" class="serch-book-result text-xs-center">
          <div v-if="errorMessage">
            <h2>{{errorMessage}}</h2>
          </div>
          <h2>{{searchResult.totalResults}}(건)</h2>
          <div class="serch-book-pagination" v-if="searchResult.totalResults>0">
            <v-pagination
              v-model="page"
              :length="Math.ceil(searchResult.totalResults/searchResult.maxResults)"
            ></v-pagination>
          </div>
        </div>
        <v-card class="card-wrapper mt-3">
          <v-layout row wrap fill-height>
            <v-flex xs12 md6 lg3 v-for="(item, index) in searchResult.item" :key="index">
              <router-link :to="{ path: `/book/${item.isbn}`, query: { book: item } }">
                <v-card class="card-item">
                  <v-layout>
                    <v-flex xs4>
                      <v-img :src="item.coverLargeUrl" height="150px" contain></v-img>
                    </v-flex>
                    <v-flex xs8>
                      <v-card-title primary-title>
                        <div>
                          <div>{{item.title}}</div>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-3">{{item.author}}</v-card-actions>
                </v-card>
              </router-link>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import axios from "axios";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";
export default {
  name: "SearchBook",
  components: { NavToolbar, Footer },
  data() {
    return {
      query: "",
      queryType: "title",
      queryOptions: [
        { text: "제목", value: "title" },
        { text: "저자", value: "author" },
        { text: "출판사", value: "publisher" },
        { text: "isbn", value: "isbn" },
        { text: "전체", value: "all" }
      ],
      searchResult: {},
      page: 1,
      errorMessage: ""
    };
  },
  watch: {
    page() {
      if (!this.query) {
        alert("검색어를 입력해주세요.");
        return false;
      }
      this.searchBook();
    }
  },
  mounted() {
    this.$refs.query.focus();
  },
  methods: {
    searchBook() {
      if (!this.query) return;

      const payload = {
        query: this.query,
        start: this.page,
        queryType: this.queryType || "title"
      };

      axios
        .get("http://localhost:4000/interparkAPI/search.api", {
          params: payload
        })
        .then(res => {
          const { returnCode, returnMessage } = res.data;
          this.searchResult = res.data;
          if (returnCode !== "000") {
            this.errorMessage = returnMessage;
          }
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
.search-book-wrapper {
  display: flex;
}

.card-item {
  padding: 2%;
  margin: 2%;
}
</style>
