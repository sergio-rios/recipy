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
          await LikeService.like({ post_id: this.postId })
        }
        else {
          const response = await LikeService.unlike(this.postId)
        }

        this.isLiked = !this.isLiked
      }
      catch (error) {
        console.error(error.response)
      }
    },

    checkIfLiked() {
      const authUser = this.$store.getters['auth/user']
      this.currentLike = this.postLikes.filter(like => like.user_id === authUser.id)[0]

      if (this.currentLike) {
        this.isLiked = true
      }
    }
  }
}
</script>
