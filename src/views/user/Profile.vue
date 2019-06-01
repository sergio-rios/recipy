<template>
<v-container fluid>
  <v-layout justify-center wrap>
    <v-flex v-if="success" xs12 sm8 md7 lg6 xl5>
      <v-layout justify-center row wrap>

        <v-flex xs12 sm4 md4 xl3>
          <div class="container-avatar">
            <img :src="getUserImage" alt="avatar">
          </div>
        </v-flex>

        <v-flex xs12 sm8 md8 xl9>
          <h1 class="font-weight-regular text-xs-center text-sm-left">{{ user.name }}</h1>
          <h2 class="font-weight-light text-xs-center text-sm-left">@{{ user.nick }}</h2>
          <p class="text-xs-center text-sm-left">
            <v-layout justify-center row mt-2>
              <v-flex class="text-xs-center text-sm-left" xs4>
                Posts
                <div class="info-number">{{ user.post.length }}</div>
              </v-flex>
              <v-flex class="text-xs-center text-sm-left" xs4>
                Seguidores
                <div class="info-number">{{ user.follower.length }}</div>
              </v-flex>
              <v-flex class="text-xs-center text-sm-left" xs4>
                Siguiendo
                <div class="info-number">{{ user.following.length }}</div>
              </v-flex>
            </v-layout>

            <button v-if="isSelfProfile" @click="profileSettings" class="btn btn2 px-5 mt-2">Ajustes del perfil</button>
            <button v-else class="btn btn1 px-5 mt-2">Seguir</button>
          </p>
        </v-flex>
      </v-layout>
      <hr>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Profile',

  props: {
    id: String
  },

  data: () => ({
    user: null
  }),

  created() {
    this.getUserData()
  },

  computed: {
    success() {
      return this.$store.state.data.status === 'success' && this.user
    },

    isSelfProfile() {
      const auth = this.$store.state.auth.auth.user
      return this.user.nick === auth.nick
    },

    getUserImage() {
      return this.user.image
        ? this.user.image
        : '/img/user.png'
    }
  },

  methods: {
    async getUserData() {
      try {
        const response = await this.$store.dispatch('data/get', `user/${this.id}`)
        this.user = response.data
      }
      catch (error) {
        console.error(error)
        // TODO redirect to error view
      }
    },

    profileSettings() {
      const id = this.user.id
      this.$router.push(`/user/${id}/settings`)
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  display: block; height: 1px;
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 1em 0; padding: 0;
}

.container-avatar {
  width: 9rem;
  height: 9rem;
  border-radius: 100%;
  margin: auto;
  overflow: hidden;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.info-number {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>
