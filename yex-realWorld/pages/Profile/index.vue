<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="profile.username !== user.username"
              @click="setFollowing"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
              {{ profile.username }}
            </button>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
              :to="{
                name:'settings'
              }"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span
                  class="nav-link"
                  :to="{
                    name: 'profile',
                    params: {
                      tab: 'my_articles',
                    },
                  }"
                  exact
                  :class="{
                    active: tab === 'my_articles',
                  }"
                  @click="getArticles({ page: 1, tab: 'my_articles' })"
                >
                  My Articles
                </span>
                <!-- <a class="nav-link active" href="">My Articles</a> -->
              </li>
              <li class="nav-item">
                <span
                  exact
                  :to="{
                    name: 'profile',
                    params: {
                      tab: 'my_favorited',
                    },
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'my_favorited',
                  }"
                  @click="getArticles({ page: 1, tab: 'my_favorited' })"
                >
                  Favorited Articles
                </span>
                <!-- <a class="nav-link" href="">Favorited Articles</a> -->
              </li>
            </ul>
          </div>

          <template v-if="articles.length">
            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <!-- <a href="profile.html"><img :src="article.author.image" /></a> -->
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  <img :src="article.author.image" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                  >
                    {{ article.author.username }}
                  </nuxt-link>
                  <!-- <a href="" class="author">{{ article.author.username }}</a> -->
                  <span class="date">{{ article.createdAt }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited,
                  }"
                  @click="onFavorite(article)"
                  :disabled="article.favoriteDisabled"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <!-- <a href="" class="preview-link"> -->
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div class="article-preview">No articles are here... yet.</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getProfiles, followUser, unFollowUser } from "@/api/user";
import {
  getUserArticles,
  getFavoritedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
export default {
  props: [],
  components: {},
  data() {
    return {
      tab: "my_articles",
    };
  },
  watchQuery: ["page", "tab"],
  async asyncData(context) {
    const { query, store, params } = context;
    const username = params.username || user.username;
    const tab = params.tab || "my_articles";
    const page = Number.parseInt(query.page || 1);
    const limit = 10;
    const loadArticles =
      tab === "my_articles" ? getUserArticles : getFavoritedArticles;
    const [ProfilesRes, articleRes] = await Promise.all([
      getProfiles(username),
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        author: username,
      }),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { profile } = ProfilesRes.data;
    return {
      articles,
      articlesCount,
      profile,
    };
  },
  watch: {},
  computed: {
    ...mapState(["user"]),
  },
  created() {},
  mounted() {},
  methods: {
    async getArticles(params) {
      // console.log(params);
      const page = Number.parseInt(params.page || 1);
      const limit = 10;
      const loadArticles =
        params.tab === "my_articles" ? getUserArticles : getFavoritedArticles;
      const [articleRes] = await Promise.all([
        loadArticles({
          // favorited: "reneemoura",
          limit,
          offset: (page - 1) * limit,
          author: this.profile.username,
        }),
      ]);
      this.tab = params.tab;
      this.articles = [...articleRes.data.articles];
      this.articlesCount == articleRes.data.articlesCount;
    },
    async setFollowing() {
      const setFollow = this.profile.following ? unFollowUser : followUser;
      const { data } = await setFollow(this.profile.username);
      this.profile = { ...data.profile };
    },

    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>
