<template>
<v-container fluid>
  <v-layout justify-center>
    <v-flex xs12 sm6 lg4>
      <v-layout justify-center>        
        <v-flex>
          <v-layout align-center>
            <v-flex xs3 md2>
              <img src="@/assets/logo.png" class="app-logo" style="width: 64px;" alt="app logo">
            </v-flex>
            <v-flex>
              <h1 class="big-header mt-3 mb-3">Recipy</h1>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex>
              <h2>¡Ya está casi listo!</h2>
              <p>
                Hemos enviado un e-mail a: <span class="no-link">{{ authUser.email }}</span>.
                <br>
                Para verificar tu cuenta, revisa tu bandeja de entrada, haz clic en el botón confirmar y vuelve a iniciar sesión.
              </p>
              <h4>¿No has recibido nuestro e-mail?</h4>
              <p>
                <ul>
                  <li>Ten paciencia. Aveces el e-mail puede tardar varios minutos.</li>
                  <li>¿Has revisado tu carpeta de <i>spam</i>?</li>
                  <li>Comprueba tu conexión a internet.</li>
                </ul>
              </p>
              <h4>¿Ya te has tomado tu tiempo y sigues sin recibirlo?</h4>
              <button class="btn btn1 mt-3" @click="resend">Reenviar e-mail</button>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Verify',

  computed: {
    ...mapGetters({
      authUser: 'auth/user'
    }),
  },

  created() {
    if (this.authUser && this.authUser.verified === 1) {
      this.$router.push('/')
    }
  },

  methods: {
    async resend() {
      try {
        const response = await this.$store.dispatch('auth/resend', this.authUser.id)

      }
      catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.app-logo {
  margin-top: 8px;
}

.big-header {
  font-size: 4rem;
  font-weight: 300;
}
</style>

