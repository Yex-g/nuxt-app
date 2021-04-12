<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  class="nav-link"
                  >Your Feed</nuxt-link
                >
                <!-- <a class="nav-link disabled" href="">Your Feed</a> -->
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  >Global Feed</nuxt-link
                >
                <!-- <a class="nav-link active" href="">Global Feed</a> -->
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  ># {{ tag }}</nuxt-link
                >
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
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>
        <!-- <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"
                ><img src="http://i.imgur.com/Qr71crq.jpg"
              /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
        </div> -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getArticles,
  getYourFeedArticles,
  getUserArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
export default {
  name: "Home",
  props: [],
  components: {},
  data() {
    return {};
  },
  watchQuery: ["page", "tab", "tag"],
  async asyncData(context) {
    const { query,store } = context;
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab ||(store.state.user?'your_feed':'global_feed');
    const tag = query.tag;
    // console.log(store.state)
    let loadArticles = getUserArticles,author = store.state.user?store.state.user.username:undefined;
    if(tab === "global_feed"){
      loadArticles = getArticles
      author = undefined
    }
    /* const loadArticles =
      tab === "global_feed" ? getArticles : getUserArticles;
    const author= store.state.user?store.state.user.username:undefined */
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
        author
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      tags, // 标签列表
      limit, // 每页大小
      page, // 页码
      tab, // 选项卡
      tag, // 数据标签
    };
  },
  watch: {},
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  created() {},
  mounted() {},
  methods: {
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
