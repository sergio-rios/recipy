<template>
  <v-app
    id="inspire"
  >
    <!-- ASIDE MENU -->
    <v-navigation-drawer
      v-if="showUI"
      v-model="drawer"
      fixed
      clipped
      temporary
      app
    >
      <v-list dense>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="authAdmin" to="/admin">
          <v-list-tile-action>
            <v-icon>fas fa-users-cog</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Administración</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer class="justify-center pl-0" color="" inset app>
        <span>&copy; {{ new Date().getFullYear() }} Recipy</span>
      </v-footer> 
    </v-navigation-drawer>

    <!-- HEADER -->
    <v-toolbar
      v-if="showUI"
      color="rgba(255, 255, 255, 0.85)"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" class="no-link">
        <img src="@/assets/logo.png" class="app-logo" style="width: 32px;" alt="app logo">
      </router-link>
      <v-toolbar-title class="mr-5 align-center">
          <span>Recipy</span>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <AccountCard />
    </v-toolbar>

    <!-- MAIN CONTENT -->
    <v-content :class="wallpaper">
      <Alert />
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert'
import AccountCard from '@/components/AccountCard'
import { menu } from '@/config/index'

export default {
  props: {
    source: String
  },

  components: {
    Alert,
    AccountCard
  },

  data: () => ({
    drawer: null,
    items: menu
  }),

  computed: {
    showUI() {
      const notUI = ['/login', '/new-account']
      
      return !notUI.includes(this.$route.path)
    },

    wallpaper() {
      const wallpaper = ['/login', '/new-account']

      return {
        wallpaper: wallpaper.includes(this.$route.path)
      }
    },

    authAdmin() {
      const authUser = this.$store.getters['auth/user']
      return !!authUser && authUser.profile_id === 1
    }
  },

  // beforeCreate() {
  //   if (!this.$store.getters['auth/user']) {
  //     console.log('del app')
  //     this.$router.push('/login')
  //   }
  // }
}
</script>

<style lang="sass">
@import './styles/main.scss';
</style>
