<template>
<v-container fluid>
  <v-layout justify-center wrap>
    <v-flex xs12 sm8 md6 lg6 xl4>
      <v-card v-if="success" class="rounded pb-2">
        <v-img
          :src="getImage"
        ></v-img>

        <v-card-title primary-title>
            <v-layout row justify-space-around align-center>
              <v-flex xs11>
                <h2>{{ recipy.title }}</h2>
                <p>
                  <router-link :to="`/user/${recipy.user_id}`" class="no-link">@{{ recipy.user.nick }}</router-link>
                  <span class="muted-text"> &bull; {{ $date(recipy.created_at) }}</span>
                </p>
              </v-flex>
              <v-flex xs1 pr-5>
                <like-btn :postId="recipy.id" :postLikes="recipy.like" />
              </v-flex>             
            </v-layout>
        </v-card-title>

        <v-layout justify-center row>
          <v-flex xs12>
            <v-tabs v-model="selectTab" slider-color="primary" fixed-tabs grow>
              <v-tab v-for="(tab, index) in tabs" :key="index">
                <v-icon>{{ tab }}</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="selectTab">
              <v-tab-item>
                <Recipe :recipy="recipy" />
              </v-tab-item>

              <v-tab-item>
                <Comments :post="recipy" />
              </v-tab-item>
            </v-tabs-items>

          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import Recipe from './components/Recipe'
import LikeBtn from './components/LikeBtn'
import Comments from './components/Commets'

export default {
  name: 'Recipy',

  props: {
    id: String
  },

  components: {
    Recipe,
    Comments,
    LikeBtn
  },

  data: () => ({
    recipy: null,
    selectTab: null,
    tabs: ['fas fa-utensils', 'fas fa-comment']
  }),

  computed: {
    getImage() {
      return this.recipy.image
        ? this.recipy.image
        : '/img/cover.png'
    },

    disabled() {
      return {
        'btn-disabled': !this.valid
      }
    },

    success() {
      return this.$store.state.data.status === 'success' && !!this.recipy
    },

    loading() {
      return this.$store.state.data.status === 'loading'
    },

    saveBtn() {
      return this.loading
        ? this.$text(4, 1, 7)
        : this.$text(4, 1, 6)
    }
  },

  created() {
    this.getData()
  },

  methods : {
    async getData() {
      try {
        const response = await this.$store.dispatch('data/get', `post/${this.id}`)
        this.recipy = response.data
      }
      catch (error) {
        console.error(error)
        this.errors = error.error
      }
    }
  }
}
</script>

<style lang="sass">
@import '@/styles/ckeditor.scss';
</style>


