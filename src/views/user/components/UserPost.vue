<template>
<section>
  <v-divider class="my-4"></v-divider>
  <v-layout row wrap>
    <v-flex v-for="(post, index) in posts" :key="index" xs12 sm6 md4>
      <PostView :post="post"/>
    </v-flex>

    <v-flex v-if="isLoading" class="mt-4">
      <v-layout>
        <v-spacer></v-spacer>
        <v-progress-circular
          size="50"
          width="6"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <v-spacer></v-spacer>
      </v-layout>
    </v-flex>
  </v-layout>
</section>
</template>

<script>
import PostView from './PostView'
import { mapGetters } from 'vuex';

export default {
  name: 'UserPost',

  components: {
    PostView
  },

  computed: {
    ...mapGetters({
      posts: 'user/posts',
      status: 'user/status'
    }),

    userId() {
      return this.$route.params.id
    },

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.$store.commit('user/clearPost')
    this.getData()
  },

  mounted() {
    this.scroll(this.person)
  },

  destroyed() {
    window.onscroll = null
  },

  methods: {
    async getData() {
      await this.$store.dispatch('user/getPosts', {
        id: this.userId,
        init: 0,
        num: 12,
      })
    },

    async getMoreData() {
      await this.$store.dispatch('user/getPosts', {
        id: this.userId,
        init: this.posts.length,
        num: 6,
      })
    },

    scroll (person) {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.getMoreData()
        }
      }
    }
  }
}
</script>

<style>

</style>
