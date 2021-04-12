<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  :disabled="isPublishing"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  :disabled="isPublishing"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  :disabled="isPublishing"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagList"
                  :disabled="isPublishing"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="creatArticles"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  creatArticles,
} from "@/api/article";
export default {
  props: [],
  components: {},
  data() {
    return {
      article:{
        body:'',
        description:'',
        tagList:'',
        title:''
      },
      isPublishing:false
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async creatArticles(){
      this.isPublishing = true
      let article = {
        ...this.article,
        tagList:[this.article.tagList]
      }
      const res = await creatArticles(article)
      // console.log(res)
      if(res.status === 200){
        const {slug} = res.data.article
        this.isPublishing = false
        // article/yex-tst-nq3i54
        this.$router.push({
          path:`/article/${slug}`
        })
      }
      // alert(1)
    }
  },
};
</script>

<style>
</style>
