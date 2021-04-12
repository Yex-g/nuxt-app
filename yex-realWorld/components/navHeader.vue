<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
      <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link to="/" exact class="nav-link">Home</nuxt-link>
          <!-- <a class="nav-link active" href="">Home</a> -->
        </li>
        <template v-if="user">
          <li class="nav-item" >
            <nuxt-link to="/editor" class="nav-link">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item" >
            <nuxt-link to="/settings" class="nav-link">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
              <nuxt-link class="nav-link" 
              :to="{
                path:`/profile/${user.username}`
              }"
              >
                <img
                  class="user-pic"
                  :src="user.image"
                >
                {{ user.username }}
              </nuxt-link>
            </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link"> Sign in </nuxt-link>
            <!-- <a class="nav-link" href="">Sign up</a> -->
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link"> Sign up </nuxt-link>
            <!-- <a class="nav-link" href="">Sign up</a> -->
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "navHeader",
  props: [],
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["user"]),
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style>
</style>
