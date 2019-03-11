<template>
  <v-app>
    <NavToolbar/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <v-expansion-panel v-model="panel" expand>
              <v-expansion-panel-content>
                <template v-slot:header>
                  <h2>Booket</h2>
                </template>

                <v-card>
                  <v-card-title>
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
                    disable-initial-sort
                    no-data-text="booket이 없습니다."
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-right">
                        <img :src="props.item.imageLink" alt="book" height="60px">
                      </td>
                      <td class="text-xs-left">{{ props.item.title }}</td>
                      <td class="text-xs-left">{{ props.item.author }}</td>
                      <td class="text-xs-left">{{ props.item.publisher }}</td>
                      <td class="text-xs-left">
                        <div v-for="(item, index) in booketStatusCode" :key="index">
                          <span v-if="item.code=== props.item.status">{{item.value}}</span>
                        </div>
                      </td>
                      <td class="text-xs-left">{{ toDate(props.item.startDate) }}</td>
                      <td class="text-xs-left">{{ toDate(props.item.endDate) }}</td>
                      <td class="text-xs-left">
                        <router-link :to="{ name: 'booketDetail', params: { id: props.item._id } }">
                          <v-btn color="primary" dark small flat>
                            <v-icon dark cneter>search</v-icon>상세
                          </v-btn>
                        </router-link>

                        <v-btn
                          color="red lighten-1"
                          dark
                          small
                          flat
                          @click.prevent="onDeleteBooket(props.item._id)"
                        >
                          <v-icon dark cneter>delete</v-icon>삭제
                        </v-btn>
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
              </v-expansion-panel-content>
            </v-expansion-panel>
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
import moment from "moment";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Booket",
  components: { NavToolbar, Footer },
  data() {
    return {
      panel: [true],
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
        { text: "저자", value: "author" },
        { text: "출판사", value: "publisher" },
        { text: "상태", value: "status" },
        { text: "시작일", value: "startDate" },
        { text: "종료일", value: "endDate" },
        { text: "Action", value: "action", sortable: false, align: "center" }
      ]
    };
  },
  computed: {
    ...mapState({
      bookets: "bookets",
      booketStatusCode: "booketStatusCode"
    }),

    pages() {
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
    pagination() {
      this.pagination.totalItems = this.bookets.length;
    }
  },
  created() {
    this.FETCH_BOOKETS();
  },
  methods: {
    ...mapMutations(["SET_BOOKETS"]),
    ...mapActions(["FETCH_BOOKETS", "DELETE_BOOKET"]),

    onDetail() {
      this.$data.panel = [];
    },
    onDeleteBooket(id) {
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      this.DELETE_BOOKET({ id }).then(_ => this.$router.push("/booket"));
    },
    toDate(date) {
      return !date ? "" : moment(date).format("YYYY-MM-DD(ddd)");
    }
  }
};
</script>

<style>
</style>
