<template>
  <router-link :to="post">
    <v-card class="ma-2">
      <div class="profile-post">
        <v-img
        src="https://www.abc.es/media/familia/2018/05/23/Minevera_Pasta-k4KC--620x349@abc.jpg"
        aspect-ratio="1"
        class="profile-post-img"
      >
      </v-img>
      <div class="profile-post-title">Alitas de pollo a la barbacoa</div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: 'Postview',

  props: {
    post: Object
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
  font-size: 1.8rem;
  left: 50%;
  position: absolute;
  text-align: center;  
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
}


</style>
