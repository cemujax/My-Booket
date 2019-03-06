<template>
  <v-layout>
    <v-flex>
      <h1>{{headerTitle}}</h1>
      <div class="card-carousel-wrapper">
        <div
          class="card-carousel--nav__left"
          @click="moveCarousel(-1)"
          :disabled="atHeadOfList"
          v-if="items.length>0"
        ></div>
        <div class="card-carousel">
          <div class="card-carousel--overflow-container">
            <div
              class="card-carousel-cards"
              :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
            >
              <div class="card-carousel--card" v-for="(item, index) in items" :key="index">
                <router-link :to="`/book/${item.itemId}`">
                  <img :src="item.coverLargeUrl" :alt="item.title">
                  <div class="card-carousel--card--footer">
                    <p>{{ item.title }}</p>
                    <p style="align: center;">{{ item.author }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-carousel--nav__right"
          @click="moveCarousel(1)"
          :disabled="atEndOfList"
          v-if="items.length>0"
        ></div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      currentOffset: 0,
      windowSize: 2,
      paginationFactor: 250
    };
  },
  props: ["headerTitle", "items"],
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor * -1 * (this.items.length - this.windowSize)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    }
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    }
  }
};
</script>

<style lang="scss" scope>
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #2c3e50;
$vue-teal-light: #42b983;
$gray: #666a73;
$break-medium: 760px;

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: $gray;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 650px;
  @media screen and (max-width: $break-medium) {
    width: 300px;
  }
  height: 400px;
  &--overflow-container {
    overflow: hidden;
  }

  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 10px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }

  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }

  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
      0 2px 2px 0 rgba(40, 44, 53, 0.08);
    background-color: #fff;
    border-radius: 4px;
    z-index: 3;
    margin-bottom: 2px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      max-height: 80%;
      vertical-align: bottom;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      transition: opacity 150ms linear;
      user-select: none;

      &:hover {
        opacity: 0.5;
      }
    }

    &--footer {
      border-top: 0;
      padding: 7px 15px;

      p {
        padding: 3px 0;
        margin: 0;
        margin-bottom: 2px;
        font-size: 13px;
        font-weight: 700;
        color: $vue-navy;
        user-select: none;

        &:nth-of-type(2) {
          font-size: 12px;
          font-weight: 300;
          padding: 6px;
          background: rgba(40, 44, 53, 0.06);
          display: inline-block;
          position: relative;
          margin-left: 4px;
          color: $gray;

          &:before {
            content: "";
            float: left;
            position: absolute;
            top: 0;
            left: -12px;
            width: 0;
            height: 0;
            border-color: transparent rgba(40, 44, 53, 0.06) transparent
              transparent;
            border-style: solid;
            border-width: 12px 12px 12px 0;
          }

          &:after {
            content: "";
            position: absolute;
            top: 10px;
            left: -1px;
            float: left;
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background: white;
            box-shadow: -0px -0px 0px #004977;
          }
        }
      }
    }
  }
}

h1 {
  font-size: 3.6em;
  font-weight: 300;
  text-align: center;
  margin-bottom: 0;
  color: $vue-teal;
}
</style>
