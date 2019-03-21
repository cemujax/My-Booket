<template>
  <Modal>
    <div slot="header">
      <a href class="modal-default-button" @click.prevent="SET_IS_REVIEW_BOOKET(false)">
        <v-icon color="red">cancel</v-icon>
      </a>
      <h3>[리뷰] {{booket.title}}</h3>
    </div>
    <div slot="body">
      <form id="review-booket-form" @submit.prevent="reviewBooket">
        <v-flex xs8 sm12 md12>
          <v-text-field v-model.trim="comment" ref="comment" label="한줄평" outline clearable></v-text-field>
        </v-flex>
        <div class="text-xs-center">
          <v-rating v-model="rate" color="yellow darken-2" background-color="grey darken-1" hover></v-rating>
          <span class="caption">평점:</span>
          <span class="font-weight-bold">{{ rate }}</span>
        </div>
        <div></div>
      </form>
    </div>
    <div slot="footer">
      <v-divider></v-divider>
      <div class="text-xs-center mt-1">
        <v-btn color="pink lighten-2" dark class="mb-2" type="submit" form="review-booket-form">
          <v-icon dark cneter>create</v-icon>작성완료
        </v-btn>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Modal from "./Modal.vue";

export default {
  name: "ReviewBooket",
  components: { Modal },
  data() {
    return {
      comment: "",
      rate: 5
    };
  },

  computed: {
    ...mapState({
      booket: "booket"
    })
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$refs.comment.focus();
  },
  methods: {
    ...mapMutations(["SET_IS_REVIEW_BOOKET"]),
    ...mapActions(["UPDATE_BOOKET"]),

    fetchData() {
      this.comment = this.booket.comment;
      this.rate = this.booket.rate || 5;
    },
    reviewBooket() {
      if (!this.comment) {
        alert("한줄평을 입력해주세요.");
        return false;
      }

      this.SET_IS_REVIEW_BOOKET(false);

      const status = this.booket.status < 2 ? this.booket.status + 1 : 2;
      const payload = {
        id: this.booket._id,
        status,
        rate: this.rate,
        comment: this.comment,
        endDate: new Date()
      };
      this.UPDATE_BOOKET(payload);
    }
  }
};
</script>

<style>
</style>
