<template>
  <v-btn icon @click="btnLikeClick">
    <v-icon :color="btnColor">fas fa-heart</v-icon>
  </v-btn>
</template>

<script>
import LikeService from '@/services/like'

export default {
  name: 'like-btn',

  props: {
    postId: Number,
    postLikes: Array
  },

  data: () => ({
    isLiked: false,
    currentLike: null
  }),

  computed: {
    btnColor() {
      return this.isLiked
        ? 'primary'
        : 'grey'
    },
  },

  created() {
    this.checkIfLiked()
  },

  methods: {
    async btnLikeClick() {
      try {
        if (!this.isLiked) {
          this.isLiked = !this.isLiked
          await this.$store.dispatch('like/like', this.postId)
        }
        else {
          this.isLiked = !this.isLiked
          await thie.$store.dispatch('like/unlike', this.postId)
        }
      }
      catch (error) {
        this.isLiked = !this.isLiked
        console.error(error.response)
      }
    },

    checkIfLiked() {
      const authUser = this.$store.getters['auth/user']
      this.currentLike = this.postLikes.some(like => like.user_id === authUser.id)

      if (this.currentLike) {
        this.isLiked = true
      }
      else {
        this.isLiked = false
      }
    }
  }
}
</script>
