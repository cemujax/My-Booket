<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      width="200"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="{name: 'home'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'booket'}">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Booket</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'contacts'}">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contacts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-1" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link to="/" style="color: white;">
          <span>My Booket</span>
        </router-link>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn flat v-if="isAuth" @click.prevent="logout">로그아웃</v-btn>
      <v-btn flat v-else :to="{name: 'login'}">로그인</v-btn>

      <v-btn flat :to="{name: 'signup'}">회원가입</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapGetters(["isAuth"])
  },
  methods: {
    ...mapMutations(["LOGOUT"]),

    logout() {
      if (!window.confirm("로그아웃 하시겠습니까?")) return;
      this.LOGOUT();
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
