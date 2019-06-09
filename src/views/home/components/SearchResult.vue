<template>
<router-link :to="`/recipy/${post.id}`" class="no-link">
  <v-card class="result-card rounded">
    <v-layout align-center>
      <v-flex pl-4>
        <h3>{{ post.title }}</h3>
        <span class="nick">
          <router-link :to="`/user/${post.user.id}`" class="no-link">@{{ post.user.nick }}</router-link>
        </span>
        <span class="muted-text"> &bull; {{ $date(post.created_at) }}</span>
      </v-flex>

      <v-flex>
        <div class="img-container">
          <img :src="getImage">
        </div>
      </v-flex>      
    </v-layout>
  </v-card>
</router-link>
</template>

<script>
export default {
  name: 'SearchResult',

  props: {
    post: Object
  },

  computed: {
    getImage() {
      return this.post.image
        ? this.post.image
        : '/img/cover.png'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/theme.scss';

h3 {
  font-weight: 400;
}

.nick {
  color: $primary-color;
  font-weight: 400;
}

.result-card {
  overflow: hidden;
}

.img-container {
  float: right;
  height: 7rem;
  overflow: hidden;
  width: 7.1rem;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
