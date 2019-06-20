<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 xl3>
      <div class="card">
        <h1>Recipy</h1>
        <v-form
          @submit.prevent="create"
          v-model="valid"
          lazy-validation
          ref="form"
        >
          <v-text-field
            v-model="user.nick"
            prepend-icon="fas fa-at"
            name="nick"
            :label="$text(1, 2, 1)"
            :counter="20"
            :rules="nickRules"
            type="text"
            required
          ></v-text-field>
          <small v-if="errors.nick" class="msg-error text-center" :key="index">
            <i class="fas fa-times"></i>
            {{ $text(0, 1, 5) }}
          </small>

          <v-text-field
            v-model="user.name"
            prepend-icon="fas fa-signature"
            name="name"
            :label="$text(1, 2, 2)"
            :rules="nameRules"
            :counter="40"
            type="text"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            prepend-icon="fas fa-envelope"
            name="nick"
            :label="$text(1, 2, 3)"
            :rules="emailRules"
            type="email"
            required
          ></v-text-field>
          

          <v-text-field
            v-model="user.password"
            prepend-icon="fas fa-key"
            name="password"
            :label="$text(1, 2, 4)"
            :rules="passwordRules"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password_confirmation"
            prepend-icon="fas fa-key"
            name="password_confirmation"
            :label="$text(1, 2, 5)"
            :rules="passrepeatRules"
            type="password"
            required
          ></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link to="/login">
              {{ $text(1, 2, 8) }}
            </router-link>
            <button class="btn btn1 ml-3" :class="disabled" :disabled="!valid">
              {{ createBtn }}
              <v-progress-circular
                v-if="loading"
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
  name: 'NewAccount',

  data: () => ({
    user: {
      nick: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors : {},
    valid: false,
    nickRules: [
      v => !!v || 'Campo requerido.',
      v => (v && v.length <= 20) || 'El usuario debe tener menos de 20 caracteres',
      v => {
        const pattern = /^[A-Za-z0-9\._]+$/
        return pattern.test(v) || 'Invalid nicknname.'
      }
    ],
    nameRules: [
      v => !!v || 'Campo requerido.',
      v => (v && v.length <= 40) || 'El usuario debe tener menos de 40 caracteres',
      v => {
        const pattern = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s]+$/
        return pattern.test(v) || 'Solo puede contener letras..'
      }
    ],
    emailRules: [
      v => !!v || 'Campo requerido.',
      v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'E-mail no válido.'
      }
    ],
    passwordRules: [
      v => !!v || 'Campo requerido.',
      v => (v && v.length >= 4) || 'La contraseña debe tener más de 4 caracteres',
    ],
  }),

  computed: {
    disabled() {
      return {
        'btn-disabled': !this.valid
      }
    },

    passrepeatRules() {
      return [(this.user.password_confirmation == this.user.password)
        || 'Las contraseñas no coinciden']
    },

    loading() {
      return this.$store.state.data.status === 'loading'
    },

    createBtn() {
      return this.loading
        ? this.$text(1, 2, 7)
        : this.$text(1, 2, 6)
    }
  },

  methods: {
    async create() {
      if(this.$refs.form.validate()) {
        try {
          const response = await this.$store.dispatch('data/create', {
            path: 'user',
            data: this.user
          })
          this.$router.push('/verify')
        }
        catch (error) {
          console.log(error.error)
          this.errors = error.error
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
  padding: 3rem 3rem;
}

.app-logo {
  width: 30px;
}
</style>
