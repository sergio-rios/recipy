<template>
  <router-link :to="`/recipy/${post.id}`">
    <v-card class="rounded ma-2">
      <div class="profile-post">
        <v-img
          :src="getImage"
          aspect-ratio="1"
          class="profile-post-img"
        >
      </v-img>
      <div class="profile-post-title">{{ post.title }}</div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: 'Postview',

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
.profile-post {
  overflow: hidden;
  
  .profile-post-img {
    transition: all 450ms ease-out;
  }

  &:hover {
    cursor: pointer;

    .profile-post-img {
      -webkit-filter: blur(2px) brightness(0.5);
      filter: blur(2px) brightness(0.5);
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }

    .profile-post-title {
      display: block;
    }
  }

  &:active {
    .profile-post-img {
      -webkit-filter: blur(2px) brightness(0.5);
      filter: blur(2px) brightness(0.5);
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }

    .profile-post-title {
      display: block;
    }
  }
}

.profile-post-title {
  color: white;
  display: none;
  font-size: 1.5rem;
  left: 50%;
  position: absolute;
  text-align: center;  
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}


</style>
