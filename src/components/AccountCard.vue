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
            size="28" tile>
            <img :src="getUserImage" alt="User iamge">
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="getUserImage" alt="User iamge">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
              <v-list-tile-sub-title>@{{ user.nick }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-space-around>
            <v-flex xs5>
              <button @click="menu = false" class="btn btn1 w-100">Ver perfil</button>
            </v-flex>
            <v-flex xs5>
              <button @click="logout" class="btn btn2 w-100">Cerrar sesión</button>
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
      hints: true,
      user: null
    }),

    created() {
      this.user = JSON.parse(localStorage.getItem('authUser')).user
    },

    computed: {
      getUserImage() {
        return !!this.user.image
          ? this.user.image
          : '/img/user.png'
      }
    },

    methods: {
      logout() {
        this.menu = false
        this.$store.dispatch('auth/logout')
          .then(() => { this.$router.push('/login') })
      }
    }
  }
</script>

<style lang="scss" scoped>
img {

}
</style>
