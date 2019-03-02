<template>
  <v-app>
    <NavToolbar/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex xs12 sm8 offset-sm2>
            <v-card>
              <h2>베스트셀러</h2>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex v-for="n in 9" :key="n" xs4>
                    <v-card flat tile>
                      <v-img
                        :src="`https://us.123rf.com/450wm/kropic/kropic1510/kropic151000023/46969887-%ED%9D%B0%EC%83%89-%EC%BB%A4%EB%B2%84%EC%99%80-%ED%95%A8%EA%BB%98-%EC%B1%85%EC%9D%84-%EB%B9%88.jpg?ver=6`"
                        height="150px"
                      ></v-img>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <v-divider></v-divider>
            <!-- card2 -->
            <v-card>
              <h2>신간</h2>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex v-for="n in 9" :key="n" xs4>
                    <v-card flat tile>
                      <v-img
                        :src="`https://us.123rf.com/450wm/kropic/kropic1510/kropic151000023/46969887-%ED%9D%B0%EC%83%89-%EC%BB%A4%EB%B2%84%EC%99%80-%ED%95%A8%EA%BB%98-%EC%B1%85%EC%9D%84-%EB%B9%88.jpg?ver=6`"
                        height="150px"
                      ></v-img>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import NavToolbar from "@/components/common/NavToolbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "Home",
  components: { NavToolbar, Footer },
  data() {
    return {
      msg: "Home Page"
    };
  }
};
</script>

<style>
</style>
