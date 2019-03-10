<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex>
          <Book :item="booket"/>

          <div class="booket-wrapper">
            <div booket-status v-for="(item, index) in booketStatusCode" :key="index">
              <h2 v-if="item.code=== booket.status">[Booket 상태] {{item.value}}</h2>
            </div>
            <div class="booket-date">
              <span>시작일 : {{ toDate(booket.startDate)}}</span>
              <span>종료일 : {{toDate(booket.endDate)}}</span>
            </div>
            <div class="booket-read" v-if="booket.status===2">
              <div class="booket-comment">
                <span>한줄평 : {{booket.comment}}</span>
              </div>
              <div class="booket-rate">
                <span>평점 : {{booket.rate}}</span>
              </div>
            </div>

            <div class="booket-readAction">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-if="readAction===1"
                @click.prevent="changeReadAction('읽기 시작')"
              >읽기 시작</v-btn>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-if="readAction>=2"
                @click.prevent="SET_IS_REVIEW_BOOKET('true')"
              >리뷰</v-btn>
            </div>
          </div>

          <div class="booket-timeline" v-if="booket.status>0">
            <Timeline/>
          </div>
          <ReviewBooket v-if="isReviewBooket"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";
import Book from "@/components/Book";
import Timeline from "@/components/Timeline";
import ReviewBooket from "@/components/ReviewBooket";

export default {
  name: "BooketDetail",
  components: { Book, Timeline, ReviewBooket },
  data() {
    return {
      loading: false,
      readAction: 0
    };
  },
  computed: {
    ...mapState({
      booket: "booket",
      booketStatusCode: "booketStatusCode",
      isReviewBooket: "isReviewBooket"
    })
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData().then(() => {});
  },
  methods: {
    ...mapMutations(["SET_IS_REVIEW_BOOKET"]),
    ...mapActions(["FETCH_BOOKET", "UPDATE_BOOKET"]),

    fetchData() {
      this.loading = true;
      return this.FETCH_BOOKET({ id: this.$route.params.id }).then(_ => {
        this.loading = false;
        this.readAction = this.booket.status + 1;
      });
    },

    changeReadAction(msg) {
      if (!window.confirm(`${msg}하시겠습니까?`)) return;

      let payload = {
        id: this.booket._id,
        status: this.booket.status + 1,
        startDate: new Date()
      };
      this.updateBooket(payload);
      this.readAction++;
    },

    updateBooket(payload) {
      this.UPDATE_BOOKET(payload);
    },

    toDate(date) {
      return !date ? "" : moment(date).format("YYYY-MM-DD(ddd)");
    }
  }
};
</script>

<style>
.booket-wrapper {
  margin-top: 2%;
}
.booket-date {
  display: flex;
}
</style>
