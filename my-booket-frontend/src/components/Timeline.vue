
<template>
  <div class="timeline-wrapper">
    <v-timeline clipped>
      <v-timeline-item color="red lighten-2" icon="calendar_today" fill-dot>
        <v-text-field
          v-model="input"
          hide-details
          label="comment..."
          solo
          @keydown.enter="writeComment"
        >
          <template v-slot:append>
            <v-btn class="mx-0" color="red lighten-2" flat @click="writeComment">
              <v-icon dark cneter>create</v-icon>작성
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-timeline-item
        v-for="timeline in booket.timeline"
        :key="timeline._id"
        color="red lighten-2"
        dark
        hide-dot
      >
        <v-card color="red lighten-2" dark>
          <v-card-title class="title">
            <v-flex xs12 v-text="toDate(timeline.createdAt)"></v-flex>
            <v-btn color="white lighten-1" dark small flat @click="onDelete(timeline._id)">
              <v-icon dark cneter>delete</v-icon>삭제
            </v-btn>
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>{{timeline.text}}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "Timeline",
  data: () => ({
    input: null,
    nonce: 0
  }),

  computed: {
    ...mapState({
      booket: "booket"
    })
  },

  methods: {
    ...mapActions(["UPDATE_BOOKET"]),

    writeComment() {
      if (!this.input) return;

      this.UPDATE_BOOKET({
        id: this.booket._id,
        timeline: { text: this.input }
      });
      this.input = null;
    },
    onDelete(timelineId) {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      this.$emit("onDelete", timelineId);
    },
    toDate(date) {
      return !date ? "" : moment(date).format("YYYY-MM-DD(ddd) hh:mm a");
    }
  }
};
</script>
<style>
.timeline-wrapper {
  margin: auto;
}
</style>
