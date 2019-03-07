<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <v-card>
              <v-card-title>
                <h2>Booket</h2>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table :headers="headers" :items="bookets" :search="search">
                <template v-slot:items="props">
                  <td class="text-xs-right">
                    <img :src="props.item.imageLink" alt="book" height="60px">
                  </td>
                  <td class="text-xs-left">{{ props.item.title }}</td>
                  <td class="text-xs-left">{{ props.item.author }}</td>
                  <td class="text-xs-left">{{ props.item.publisher }}</td>
                  <td class="text-xs-left">{{ props.item.pubDate }}</td>
                  <td class="text-xs-left">{{ props.item.status }}</td>
                  <td class="text-xs-left">{{ props.item.startDate }}</td>
                  <td class="text-xs-left">{{ props.item.endDate }}</td>
                  <td class="text-xs-left">
                    <router-link :to="{ name: 'booketDetail', params: { id: props.item.isbn } }">
                      <v-btn color="primary" dark class="mb-2">Detail</v-btn>
                    </router-link>
                  </td>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-card>

            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { booket } from "@/api";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Booket",
  components: { NavToolbar, Footer },
  data() {
    return {
      search: "",
      headers: [
        { text: "", align: "right", sortable: false, value: "Booket" },
        { text: "제목", align: "left", sortable: true, value: "title" },
        {
          text: "저자",
          value: "author"
        },
        { text: "출판사", value: "publisher" },
        { text: "출판일", value: "pubDate" },
        { text: "상태", value: "status" },
        { text: "시작일", value: "startDate" },
        { text: "종료일", value: "endDate" },
        { text: "Action", value: "action" }
      ]
    };
  },
  computed: {
    ...mapState({
      bookets: "bookets"
    })
  },
  created() {
    this.FETCH_BOOKETS({ status: -1 });
  },
  methods: {
    ...mapMutations(["SET_BOOKETS"]),
    ...mapActions(["FETCH_BOOKETS"])
  }
};
</script>

<style>
</style>
