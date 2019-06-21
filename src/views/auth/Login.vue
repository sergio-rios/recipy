<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 xl3>
      <div class="card">
        <h1 class="mb-4">Recipy</h1>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="user.email"
            prepend-icon="fas fa-user"
            name="login"
            :label="$text(1, 1, 1)"
            type="text"
          ></v-text-field>
          

          <v-text-field
            v-model="user.password"
            prepend-icon="fas fa-key"
            name="password"
            :label="$text(1, 1, 2)"
            type="password"
          ></v-text-field>

          
          <small v-for="(error, index) in errors" class="msg-error text-center" :key="index">
            <i v-if="error" class="fas fa-times"></i>
            {{ error }}
          </small>

          <v-checkbox
            v-model="user.remember"
            :label="$text(1, 1, 5)"
            color="primary"
          ></v-checkbox>

          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/new-account">
              {{ $text(1, 1, 6) }}
            </router-link>
            <button class="btn btn1 ml-3">
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
      email: null,
      pass: null,
      verified: null
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
      for (let key in this.errors) this.errors[key] = null

      try {
        await this.$store.dispatch("auth/login", this.user)

        if (this.user.remember) {
          window.localStorage.setItem('rememberedUser', JSON.stringify(this.user))
        } else {
          window.localStorage.removeItem('rememberedUser')
        }

        if (this.$store.getters['auth/user'].verified) {
          this.$router.push('/')
        }
        else {
          console.log('else')
          this.$router.push('/verify')
        }
      }
      catch (error) {
        switch (error.error) {
          case 'unauthorized_email':
            this.errors.email = 'No existe ninguna cuenta con ese email'
            break
          case 'unauthorized_pass':
            this.errors.pass = 'Contraseña incorrecta'
            break
          case 'verified':
            this.errors.verified = 'Email no verificado'
            break
        }
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
  padding: 1rem 2rem;
}

.app-logo {
  width: 30px;
}
</style>
