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
      <img src="@/assets/logo.svg" class="app-logo" style="width: 28px;" alt="app logo">
      <v-toolbar-title class="mr-5 align-center">
        <span>Recipy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <AccountCard />
    </v-toolbar>

    <!-- MAIN CONTENT -->
    <v-content :class="wallpaper">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import AccountCard from '@/components/AccountCard'
import { menu } from '@/config/index'

export default {
  props: {
    source: String
  },

  components: {
    AccountCard
  },

  data: () => ({
    drawer: null,
    items: menu
  }),

  computed: {
    showUI() {
      const notUI = ['/login']
      
      return !notUI.includes(this.$route.path)
    },
    wallpaper() {
      return {
        wallpaper: this.$route.path === '/login'
      }
    }
  }
}
</script>

<style lang="sass">
@import './styles/main.scss';
</style>
