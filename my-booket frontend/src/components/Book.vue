<template>
  <v-layout>
    <v-flex>
      <div class="book-info-wrapper mt-5">
        <div v-if="Object.keys(item).length>0">
          <v-card>
            <div class="book-info">
              <img class="book-image" :src="item.coverLargeUrl || item.imageLink" :alt="item.title">

              <div class="book-info-main">
                <span class="book-title">{{item.title}}</span>
                <ul>
                  <li>저자:{{item.author}}</li>
                  <li>출판사: {{item.publisher}}</li>
                  <li>출판일: {{toDate(item.pubDate)}}</li>
                </ul>
                <div class="mt-3">{{item.description}}</div>
                <div class="book-info-func" v-if="isFunc">
                  <a :href="item.link">
                    <v-btn color="info">인터파크 링크</v-btn>
                  </a>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        flat
                        icon
                        color="pink"
                        v-on="on"
                        v-if="!isBooket(item.isbn)"
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
          </v-card>
        </div>
        <div v-else>
          <h2>Book Not Exists</h2>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Book",
  data() {
    return {};
  },
  props: ["item", "isFunc"],
  created() {},
  computed: {
    ...mapGetters(["isBooket"])
  },
  methods: {
    ...mapActions(["ADD_BOOKET"]),

    toDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    addBooket() {
      console.log(`addBooket `, this.item);
      this.ADD_BOOKET({ bookInfo: this.item }).then(_ =>
        this.$router.push(`/booket`)
      );
    }
  }
};
</script>

<style>
.book-info {
  display: flex;
  padding: 10px;
}
@media (max-width: 760px) {
  .book-info {
    display: block;
  }
}
.book-title {
  font-size: 22px;
  font-weight: bold;
}

.book-info-main {
  width: 100%;
  padding: 0 2%;
}
.book-image {
  width: 80%;
  height: auto;
  max-width: 200px;
  /* max-width: 50vw; */
}
li {
  list-style: none;
  font-size: 16px;
}
</style>
