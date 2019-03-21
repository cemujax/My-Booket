<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>회원 가입</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form name="signup-form">
                  <v-text-field
                    v-validate="'required|email|min:5|max:40'"
                    v-model="form.email"
                    :counter="40"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-validate="'required|min:4|max:50'"
                    v-model="form.password"
                    :counter="50"
                    :error-messages="errors.collect('password')"
                    label="비밀번호"
                    data-vv-name="password"
                    required
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-validate="'required|min:1|max:30'"
                    v-model="form.name"
                    :counter="30"
                    :error-messages="errors.collect('name')"
                    label="이름"
                    data-vv-name="name"
                    required
                  ></v-text-field>

                  <v-layout class="form-action" align-center justify-center row fill-height>
                    <v-btn color="success" @click="submit">회원가입</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                  </v-layout>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-snackbar
          v-model="snackbar.isSnackbark"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
          {{ snackbar.msg }}
          <v-btn dark flat @click="snackbar.isSnackbark = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import ko from "vee-validate/dist/locale/ko";
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Signup",
  components: { NavToolbar, Footer },
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    form: {
      email: "",
      password: "",
      name: ""
    },
    dictionary: {
      messages: ko.messages,
      attributes: {
        email: "E-mail",
        password: "암호",
        name: "이름"
      }
    },
    snackbar: {
      isSnackbark: false,
      msg: "",
      color: "",
      timeout: 4000
    }
  }),

  mounted() {
    this.$validator.localize("ko", this.dictionary);
  },

  methods: {
    ...mapActions(["SIGNUP"]),

    submit() {
      this.$validator
        .validateAll()
        .then(res => {
          if (!res) throw new Error("필수항목을 기입해주세요.");
          return this.SIGNUP({ form: this.form });
        })
        .then(res => {
          if (!res.result) throw new Error(res.msg);
          this.popSnackBar("회원가입 성공했습니다.", "success");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        })
        .catch(e => this.popSnackBar(e.message, "error"));
    },
    clear() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.$validator.reset();
    },
    popSnackBar(msg, color) {
      this.snackbar.isSnackbark = true;
      this.snackbar.msg = msg;
      this.snackbar.color = color;
    }
  }
};
</script>

<style>
</style>
