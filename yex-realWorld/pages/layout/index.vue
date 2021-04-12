<template>
  <div>
    <!-- 顶部导航栏 -->
    <Navheader />
    <!-- /顶部导航栏 -->
    <!-- 子路由 -->
    <!-- <Home /> -->
    <nuxt-child/>
    <!-- /子路由 -->

    <!-- 底部 -->
    <LayoutFoot />
    <!-- /底部 -->
  </div>
</template>

<script>
import Navheader from '~/components/navHeader.vue'
import LayoutFoot from '~/components/footer.vue'
export default {
  name: "LayoutIndex",
  props: [],
  components: {
    Navheader,
    LayoutFoot,
  },
  data() {
    return {
      user:null
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style>
</style>
