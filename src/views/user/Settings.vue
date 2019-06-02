<template>
<v-container fluid>
  <v-layout justify-center wrap>
    <v-flex xs10 sm5 md4 lg3 xl2>
      <v-form
        @submit.prevent="save"
        v-model="valid"
        lazy-validation
      >
      <h2 class="text-xs-center my-4">{{ $text(4, 1, 1) }}</h2>
        <div class="container-avatar">
          <img :src="getUserImage" alt="avatar">
        </div>

        <v-text-field
          v-model="user.nick"
          :counter="20"
          :rules="nickRules"
          :label="$text(4, 1, 2)"
          prefix="@"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          :counter="40"
          :label="$text(4, 1, 3)"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          :label="$text(4, 1, 4)"
          type="email"
          required
        ></v-text-field>

        <v-textarea
          v-model="user.description"
          :label="$text(4, 1, 5)"
          :counter="200"
          :rules="descriptionRules"
        ></v-textarea>

        <v-layout justify-space-around mt-4>
          <v-flex xs5>
            <button type="submit" class="btn btn1" :class="disabled" :disabled="!valid">
              {{ saveBtn }}
              <v-progress-circular
                v-if="loading"
                indeterminate
                size="20"
                width="2"
                color="white"
              ></v-progress-circular>
            </button>
          </v-flex>
          <v-flex xs5>
            <button @click.prevent="goBack" class="btn btn2">{{ $text(4, 1, 8) }}</button>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Settings',

  data: () => ({
    user: null,
    valid: true,
    nickRules: [
      v => !!v || 'Nick is required',
      v => (v && v.length <= 20) || 'Nick must be less than 10 characters',
      v => {
        const pattern = /^[A-Za-z0-9\._]+$/
        return pattern.test(v) || 'Invalid nicknname.'
      }
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 40) || 'Name must be less than 10 characters',
      v => {
        const pattern = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s]+$/
        return pattern.test(v) || 'Invalid nicknname.'
      }
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'Invalid e-mail.'
      }
    ],
    descriptionRules: [
      v => (!v ||v.length <= 200) || 'Name must be less than 240 characters',
    ],
  }),

  computed: {
    getUserImage() {
      return !!this.user.image
        ? this.user.image
        : '/img/user.png'
    },

    disabled() {
      return {
        'btn-disabled': !this.valid
      }
    },

    loading() {
      return this.$store.state.data.status === 'loading'
    },

    saveBtn() {
      return this.loading
        ? this.$text(4, 1, 7)
        : this.$text(4, 1, 6)
    }
  },

  created() {
    this.user = Object.assign({}, this.$store.state.auth.auth.user)
  },

  methods: {
    async save() {
      try {
        const response = await this.$store.dispatch('data/update', {
          path: `user/${this.user.id}`,
          data: this.user
        })
        this.$store.dispatch('auth/edit', response.data)
        this.goBack()
      }
      catch (error) {
        throw error
      }
    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-avatar {
  width: 9rem;
  height: 9rem;
  border-radius: 100%;
  margin: auto;
  margin-bottom: 1.5rem;
  overflow: hidden;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

button {
  width: 100%;
}
</style>
