<template>
<section>
  <v-layout justify-center>
    <v-flex v-if="isLoading" xs12 sm10 md8 lg6>
      <v-divider class="my-4"></v-divider>
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

    <v-flex v-else xs12 sm10 md8 lg6>
      <v-divider class="my-4"></v-divider>
      <router-link v-for="(user, index) in followers" :key="index" :to="`/user/${user.id}/posts`" class="no-link">
        <v-card class="result-card rounded">
          <v-layout align-center>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar class="img-container">
                  <img :src="getUserImage(user)" alt="user image">              
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>@{{ user.nick }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>      
          </v-layout>
        </v-card>
      </router-link>
    </v-flex>
  </v-layout>
</section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserFollowing',

  computed: {
    ...mapGetters({
      followers: 'user/following',
      status: 'user/status'
    }),

    userId() {
      return this.$route.params.id
    },

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      await this.$store.dispatch('user/getFollowing', this.userId)
    },

    getUserImage(user) {
      return user.image
        ? user.image
        : '/img/user.svg'
    }
  }
}
</script>

<style lang="scss" scoped>
.result-card {
  overflow: hidden;
}

.img-container {
  border-radius: 50px;
  overflow: hidden;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
