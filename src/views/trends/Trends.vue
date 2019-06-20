<template>
<v-layout justify-center wrap>
  <v-flex xs12 sm8 md7 lg6 xl5>
    <h2 class="text-xs-center mt-4 mb-4">Destacados de la semana</h2>
    <v-layout justify-center row wrap>
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

      <v-flex v-else v-for="(post, index) in week" :key="index" xs12 sm6 md4>
        <PostView :post="post"/>
      </v-flex>
    </v-layout>

    <h2 class="text-xs-center mt-5 mb-4">Destacados del mes</h2>
    <v-layout justify-center row wrap>
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

      <v-flex v-else v-for="(post, index) in week" :key="index" xs12 sm6 md4>
        <PostView :post="post"/>
      </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
</template>

<script>
import PostView from '@/views/user/components/PostView'
import { mapGetters } from 'vuex';

export default {
  name: 'Trends',

  components: {
    PostView
  },

  computed: {
    ...mapGetters({
      week: 'trends/week',
      month: 'trends/month',
      status: 'trends/status'
    }),

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.getWeek()
    this.getMonth()
  },

  methods: {
    async getWeek() {
      await this.$store.dispatch('trends/getWeek')
    },

    async getMonth() {
      await this.$store.dispatch('trends/getMonth')
    }
  }
}
</script>

<style>

</style>
