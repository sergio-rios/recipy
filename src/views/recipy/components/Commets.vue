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

      <v-flex xs1 mr-3>
        <v-btn type="submit" color="secondary" icon flat>
          <v-icon small>fas fa-share</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 >
        <p v-for="(comment, index) in commentsList" :key="index">
          <router-link :to="`/user/${comment.user.id}`" class="no-link">
            @{{ comment.user.nick }}
          </router-link>
          {{ comment.content }}
          <br>
          <span class="muted-text">{{ $time(comment.created_at) }} | {{ $date(comment.created_at) }}</span>
          <span v-if="showDelete(comment.user_id)" class="muted-text" @click="delComment(comment.id)">
            &bull;
            <span class="del-link">Borrar</span>
          </span>          
        </p>
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
    post: Object
  },

  data: () => ({
    valid: false,
    comment: null,
    commentsList: null,
    commentRules: [
      v => !!v || 'Comment is required',
    ],
  }),

  computed: {
    
  },

  created() {
    this.getComments()
    this.comment = {
      user_id: this.$store.getters['auth/user'].id,
      post_id: this.post.id,
      content: ''
    }
  },

  methods: {
    async getComments() {
      try {
        const response = await CommentService.getAll(this.post.id);
        console.log(response)
        this.commentsList = response.data
      }
      catch (error) {
        console.error(error)
      }
    },

    async pushComment() {
      try {
        await CommentService.post(this.comment)
        this.getComments()
        this.comment.content = ''
      }
      catch (error) {
        console.error(error)
      }
    },

    async delComment(id) {
      try {
        await CommentService.delete(id)
        this.getComments()
      }
      catch (error) {
        console.error(error)
      }
    },

    showDelete(user_id) {
      return user_id === this.$store.getters['auth/user'].id
          || this.post.user_id === this.$store.getters['auth/user'].id
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
}

.user-nick {
  color: orange;
  font-weight: bold;
}

.del-link:hover {
  color: red;
  cursor: pointer;
}
</style>
