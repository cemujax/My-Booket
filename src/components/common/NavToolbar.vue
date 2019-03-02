<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense></v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-1" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          <router-link to="/">My Booket</router-link>
        </span>
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
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn flat>로그인</v-btn>
      <v-btn flat>회원가입</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  }
};
</script>

<style>
</style>
