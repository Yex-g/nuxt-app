<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <div>
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="URL of profile picture"
                v-model="updateUser.image"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="updateUser.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                v-model="updateUser.bio"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="updateUser.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="updateUser.password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click="setUser"
            >
              Update Settings
            </button>
          </div>
          <hr />
          <button class="btn btn-outline-danger" @click="onExit()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
import { getCurrentUser, updatedUser } from "@/api/user";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  watch: {},
  async asyncData(context) {
    const { store } = context;
    const { data } = await getCurrentUser();

    store.commit("setUser", data.user);
    // 设置cookie
    Cookie && Cookie.set("user", data.user);
    return {
      user: data.user,
      updateUser: {
        bio: data.user.bio,
        email: data.user.email,
        image: data.user.image,
        username: data.user.username,
        password: null,
      },
    };
  },
  computed: {
    // ...mapState(["user"]),
  },
  created() {},
  mounted() {},
  methods: {
    async setUser() {
      await updatedUser({
        user: {
          ...this.updateUser,
        },
      });
      this.$router.push({
        path: `profile/${this.updateUser.username}`,
      });
    },
    onExit() {
      this.$store.commit("setUser", null);
      // 设置cookie
      Cookie && Cookie.remove("user");
      this.$router.push({
        name:'home'
      });
    },
  },
};
</script>

<style>
</style>
