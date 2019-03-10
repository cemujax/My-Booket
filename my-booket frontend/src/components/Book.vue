<template>
  <div class="book-info-wrapper">
    <div class="book-info1">
      <img :src="item.imageLink" :alt="item.title">
      <div class="book-desc">
        {{item.description}}
        <div></div>
      </div>
    </div>
    <div class="book-info2">
      <span class="book-title">{{item.title}}</span>
      <ul>
        <li>저자:{{item.author}}</li>
        <li>출판사: {{item.publisher}}</li>
        <li>출판일: {{toDate(item.pubDate)}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Book",
  data() {
    return {};
  },
  props: ["item"],
  methods: {
    toDate(date) {
      return moment(date).format("YYYY-MM-DD");
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
