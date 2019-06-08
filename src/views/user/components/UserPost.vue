<template>
<section>
  <v-divider class="my-4"></v-divider>
  <v-layout row wrap>
    <v-flex v-if="isLoading">
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

    <v-flex v-else v-for="(post, index) in posts" :key="index" xs12 sm6 md4>
      <PostView :post="post"/>
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
    this.getData()
  },

  methods: {
    async getData() {
      await this.$store.dispatch('user/getPosts', this.userId)
    }
  }
}
</script>

<style>

</style>
