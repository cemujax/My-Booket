<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>로그인</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="비밀번호"
                    id="password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="invalidForm" @click.prevent="onSubmit">로그인</v-btn>
              </v-card-actions>
              <p class="error" v-if="error">{{error}}</p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Login",
  components: { NavToolbar, Footer },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: ""
    };
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password;
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions(["LOGIN"]),

    onSubmit() {
      this.LOGIN({ email: this.email, password: this.password })
        .then(data => {
          this.$router.push(this.rPath);
        })
        .catch(err => {
          this.error = err.data.error;
        });
    }
  }
};
</script>

<style>
</style>
