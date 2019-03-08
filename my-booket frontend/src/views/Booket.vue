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
              <v-data-table
                :headers="headers"
                :items="bookets"
                :search="search"
                hide-actions
                :pagination.sync="pagination"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td class="text-xs-right">
                    <img :src="props.item.imageLink" alt="book" height="60px">
                  </td>
                  <td class="text-xs-left">{{ props.item.title }}</td>
                  <td class="text-xs-left">{{ props.item.author }}</td>
                  <td class="text-xs-left">{{ props.item.publisher }}</td>
                  <td class="text-xs-left">{{ props.item.pubDate }}</td>
                  <td class="text-xs-left">
                    <span v-if="props.item.status==0">Wish</span>
                    <span v-else-if="props.item.status==1">Reading</span>
                    <span v-else-if="props.item.status==2">Read</span>
                  </td>
                  <td class="text-xs-left">{{ props.item.startDate }}</td>
                  <td class="text-xs-left">{{ props.item.endDate }}</td>
                  <td class="text-xs-left">
                    <router-link
                      :to="{ name: 'booketDetail', params: { id: props.item.isbn , booket: props.item} }"
                    >
                      <v-btn color="primary" dark class="mb-2">Detail</v-btn>
                    </router-link>
                    <v-btn
                      color="error"
                      dark
                      class="mb-2"
                      @click.prevent="onDeleteBooket(props.item._id)"
                    >삭제</v-btn>
                  </td>
                </template>
                <v-alert
                  v-slot:no-results
                  :value="true"
                  color="error"
                  icon="warning"
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
              <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
              </div>
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
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Booket",
  components: { NavToolbar, Footer },
  data() {
    return {
      search: "",
      pagination: {
        page: 1,
        rowsPerPage: 5,
        totalItems: 0
      },
      selected: [],
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
    }),

    pages() {
      this.pagination.totalItems = this.bookets.length;
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0;
      }

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  watch: {
    pagination(val) {
      this.pagination.totalItems = this.bookets.length;
    }
  },
  created() {
    this.FETCH_BOOKETS({ status: -1 });
  },
  methods: {
    ...mapMutations(["SET_BOOKETS"]),
    ...mapActions(["FETCH_BOOKETS", "DELETE_BOOKET"]),

    onDeleteBooket(id) {
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      this.DELETE_BOOKET({ id }).then(_ => this.$router.push("/"));
    }
  }
};
</script>

<style>
</style>
