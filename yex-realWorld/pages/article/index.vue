<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <!-- <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a> -->
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
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username,
                },
              }"
            >
              {{ article.author.username }}
            </nuxt-link>
            <!-- <a href="" class="author">Eric Simons</a> -->
            <span class="date">{{ article.author.createdAt }}</span>
          </div>
          <button
            class="btn btn-sm action-btn ng-binding btn-outline-secondary"
            @click="setFollowing(article)"
          >
            <i class="ion-plus-round"></i>
            &nbsp; {{ article.author.following? "Unfollow" : "Follow" }}{{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{
              active: article.favorited,
            }"
            @click="onFavorite(article)"
            :disabled="article.favoriteDisabled"
          >
            <i class="ion-heart"></i> Favorite Article  ({{ article.favoritesCount }})
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article.body }}
          </p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
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
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username,
                },
              }"
            >
              {{ article.author.username }}
            </nuxt-link>
            <!-- <a href="" class="author">Eric Simons</a> -->
            <span class="date">{{ article.author.createdAt }}</span>
          </div>

          <button
            class="btn btn-sm action-btn ng-binding btn-outline-secondary"
            @click="setFollowing(article)"
          >
            <i class="ion-plus-round"></i>
            &nbsp; {{ article.author.following? "Unfollow" : "Follow" }}{{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{
              active: article.favorited,
            }"
            @click="onFavorite(article)"
            :disabled="article.favoriteDisabled"
          >
            <i class="ion-heart"></i> Favorite Article  ({{ article.favoritesCount }})
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" v-on:submit.prevent>
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="body"
              ></textarea>
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary"
              @click="setComment"
              >Post Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle,deleteFavorite,addFavorite,comments } from "@/api/article";
import {  followUser, unFollowUser } from "@/api/user";
export default {
  props: [],
  components: {},
  data() {
    return {
      body:''
    };
  },
  async asyncData(context) {
    const { params } = context;
    const slug = params.slug;
    const {data} = await getArticle(slug);
    // console.log(slug)
    return {
      article: data.article||{},
    };
  },
  watch: {},
  computed: {},
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
    async setFollowing(article){
      const {author} =  article
      const setFollow = author.following?unFollowUser:followUser
      await setFollow(author.username)
      author.following = !author.following
    },
    async setComment (){
      const params = {
        slug:this.article.slug,
        body:this.body
      }
      await comments(params)
    },
    onSubmit(){
      return false
    }
  },
};
</script>

<style>
</style>
