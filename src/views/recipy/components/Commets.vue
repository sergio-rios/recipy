<template>
  <section>
    <v-form
      @submit.prevent="pushComment"
      v-model="valid"
      lazy-validation
    >
      <!-- <v-textarea
        v-model="comment.content"
        placeholder="Comenta algo..."
        rows="1"
        auto-grow
        no-resize
        required
      ></v-textarea> -->

      <v-layout align-end justify-space-between mb-1 row>
      <v-flex xs10>
        <v-textarea
          v-model="comment.content"
          placeholder="Comenta algo..."
          rows="1"
          auto-grow
          required
        ></v-textarea>
      </v-flex>

      <v-flex xs1 mr-3 pb-2>
        <v-btn type="submit" color="secondary" icon flat>
          <v-icon>fas fa-share</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
      
    </v-form>
  </section>
</template>

<script>
import CommentService from '@/services/comment'

export default {
  name: 'Comments',

  props: {
    postId: Number
  },

  data: () => ({
    valid: false,
    comment: null,
    commentRules: [
      v => !!v || 'Comment is required',
    ],
  }),

  created() {
    this.comment = {
      user_id: this.$store.getters['auth/user'].id,
      post_id: this.postId,
      content: ''
    }
  },

  methods: {
    async pushComment() {
      try {
        await CommentService.post(this.comment)
      }
      catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
section {
  padding: 1rem;
}
</style>
