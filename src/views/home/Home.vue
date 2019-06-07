<template>
<v-container fluid>
  <v-layout justify-center>
    <v-flex xs12 sm6 lg4>
      <v-layout justify-center>        
        <v-flex>
          <h1 class="big-header mt-3 mb-3">Recipy</h1>
          <v-autocomplete
            v-model="selectedTags"
            :items="tags"
            chips
            color="primary"
            placeholder="¿Qué tienes por casa?"
            item-text="name"
            item-value="id"
            multiple
            return-object
            append-icon
            clearable
            append-outer-icon="search"
            @click:append-outer="search"
            @change="clear"
            ref="buscador"
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                @input="removeSelected(data.item)"
              >{{ data.item.name }}</v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                </v-list-tile-content>
              </template>
            </template>
          </v-autocomplete>
        </v-flex>
      </v-layout>

      <v-layout justify-center wrap mt-4>
        <v-progress-circular
          v-if="isLoading"
          size="50"
          width="6"
          indeterminate
          color="primary"
        ></v-progress-circular>

        <v-flex v-for="(post, index) in result" :key="index" xs12 my-2>
          <SearchResult :post="post" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>

  <!-- <router-link to="/login">Cerrar sesion</router-link> -->
</v-container>
</template>


<script>
import SearchResult from './components/SearchResult'
import SearchService from '@/services/search'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

  components: {
    SearchResult
  },

  data: () => ({
    posts: null
  }),

  computed: {
    ...mapGetters({
      result: 'search/result',
      tags: 'tag/tags',
      status: 'search/status'
    }),

    selectedTags: {
      get() {
        return this.$store.getters['tag/selected']
      },
      set(items) {
        this.$store.commit('tag/set', items)
      }
    },

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.getTags()
  },

  methods: {
    async getTags() {
      try {
        await this.$store.dispatch('tag/getTags')
      }
      catch (error) {
        console.error(error)
      }
    },

    async search() {
      this.$refs.buscador.blur()

      try {
        const tagsId = this.selectedTags.map(tag => tag.id)
        await this.$store.dispatch('search/search', tagsId)
      }
      catch (error) {
        console.error(error);
      }
    },

    clear() {
      this.$refs.buscador.lazySearch = ''
    },

    removeSelected(item) {
      this.$store.commit('tag/remove', item)
    }
  }
}
</script>

<style scoped>
.big-header {
  font-size: 4rem;
  font-weight: 300;
}
</style>

