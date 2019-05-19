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
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          </v-avatar>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Sergio Ríos</v-list-tile-title>
              <v-list-tile-sub-title>@srios</v-list-tile-sub-title>
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
              <button @click="menu = false" class="btn btn2 w-100">Cerrar sesión</button>
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
    })
  }
</script>

<style lang="scss" scoped>
img {

}
</style>
