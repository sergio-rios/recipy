<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large v-on="on">
          <v-avatar
            class="photo"
            size="28">
            <img :src="getUserImage" alt="user image" style="width: 100%;">
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar class="photo">
              <img :src="getUserImage" alt="User iamge">              
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ getAuthUser().name }}</v-list-tile-title>
              <v-list-tile-sub-title>@{{ getAuthUser().nick }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-space-around>
            <v-flex xs5>
              <router-link :to="`/user/${getAuthUser().id}`">
                <button @click="menu = false" class="btn btn1 w-100">Ver perfil</button>
              </router-link>
            </v-flex>
            <v-flex xs5>
              <button @click="logout" class="btn btn2 w-100">
                Salir
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),

  computed: {
    getUserImage() {
      return this.getAuthUser().image
        ? this.getAuthUser().image
        : '/img/user.svg'
    }
  },

  methods: {
    getAuthUser() {
      return this.$store.state.auth.auth.user
    },

    logout() {
      this.menu = false
      this.$store.commit('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.photo {
  border-radius: 50px;
  overflow: hidden;

  img {
    object-fit: cover;
    -o-object-fit: cover;
  }
}
</style>

