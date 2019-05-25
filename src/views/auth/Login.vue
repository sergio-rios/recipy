<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 xl3>
      <div class="card">
        <h1>Recipy</h1>
        <v-form @submit.prevent="login">
          <v-text-field v-model="user.email" prepend-icon="fas fa-user" name="login" :label="$text(1, 1, 1)" type="text"></v-text-field>

          <v-text-field v-model="user.password" id="password" prepend-icon="fas fa-key" name="password" :label="$text(1, 1, 2)" type="password"></v-text-field>

          <v-checkbox
            v-model="user.remember"
            :label="$text(1, 1, 5)"
            color="primary"
          ></v-checkbox>

          <v-card-actions>
            <v-spacer></v-spacer>
            <a href="#" class="no-link mr-4">{{ $text(1, 1, 6) }}</a>
            <button class="btn btn1">
              {{ loadingBtn }}
              <v-progress-circular
                v-if="loggingIn"
                indeterminate
                size="20"
                width="2"
                color="white"
              ></v-progress-circular>
              </button>
          </v-card-actions>
        </v-form>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
    user: {
      email: '',
      password: '',
      remember: false
    },
    errors: {
      unauthorized: false
    },
    drawer: null
  }),
  
  props: {
    source: String
  },

  computed: {
    loggingIn() {
      return this.$store.state.auth.status === 'loggingIn'
    },

    loadingBtn() {
      return this.loggingIn
        ? this.$text(1, 1, 4)
        : this.$text(1, 1, 3)
    }
  },

  created() {
    const rememberedUser = window.localStorage.getItem('rememberedUser')

    if (rememberedUser) {
      this.user = JSON.parse(rememberedUser)
    }
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/login", this.user)
        this.$router.push('/')
        if (this.user.remember) {
          window.localStorage.setItem('rememberedUser', JSON.stringify(this.user))
        } else {
          window.localStorage.removeItem('rememberedUser')
        }
      }
      catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 { font-weight: lighter; }

.card {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 3rem 3rem;
}

.app-logo {
  width: 30px;
}
</style>
