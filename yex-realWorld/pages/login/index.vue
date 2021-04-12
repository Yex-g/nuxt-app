<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <!-- <ul class="error-messages" v-for="(messages, field) in errors">
            <li>That email is already taken</li>
          </ul> -->

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, regist } from "@/api/user";
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  props: [],
  components: {},
  data() {
    return {
      user: {
        username: "Yex",
        email: "1203847397@qq.com",
        password: "12345678",
      },
      errors: {},
    };
  },
  watch: {
    $route(res) {
      this.errors = {};
    },
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },

  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: {
                 email: this.user.email,
                  password: this.user.password
              },
            })
          : await regist({
              user: this.user,
            });
        this.$store.commit("setUser", data.user);
        // 设置cookie
        Cookie && Cookie.set('user', data.user)
        this.$router.push("/");
      } catch (error) {
        // console.log(error);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>
