<template>
<v-container fluid>
  <v-layout justify-center>
    <v-flex xs12 sm6 lg4>
<v-layout justify-center wrap mt-4>
  <v-flex xs12>
    <h2 class="text-xs-center mb-4">Últimas novedades</h2>
  </v-flex>
  <v-progress-circular
    v-if="isLoading"
    size="50"
    width="6"
    indeterminate
    color="primary"
  ></v-progress-circular>

  <v-flex v-else v-for="(post, index) in news" :key="index" xs12 my-2>
    <SearchResult :post="post" />
  </v-flex>
</v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import SearchResult from '@/views/home/components/SearchResult'
import { mapGetters } from 'vuex';

export default {
  name: 'News',

  components: {
    SearchResult
  },

  computed: {
    ...mapGetters({
      news: 'news/news',
      status: 'news/status'
    }),

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      await this.$store.dispatch('news/getNews')
    }
  }

}
</script>
