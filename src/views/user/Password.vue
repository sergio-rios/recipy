<template>
<v-container fluid>
  <v-layout row justify-center>
    <v-flex xs12 sm6 md4 lg3 xl2>
      <v-form
        v-model="valid"
        @submit.prevent="save"
        ref="form"
      >
        <v-text-field
          v-model="password_old"
          label="Contraseña actual *"
          prepend-icon="fas fa-lock"
          type="password"
          :rules="passRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="password_new"
          label="Nueva contraseña *"
          prepend-icon="fas fa-key"
          type="password"
          :rules="passRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="repetir"
          label="Repetir nueva contraseña *"
          prepend-icon="fas fa-key"
          type="password"
          :rules="passRepeatRules"
          required
          class="mb-4"
        ></v-text-field>
        
        <button type="submit" class="btn btn1" :disabled="!valid">Cambiar</button>
        <button class="btn btn2 ml-2" @click="goBack">Cancelar</button>
        <br>
        <small class="grey--text text--darken-1 mt-3 ml-2">* Campos obligatorios</small>
      </v-form>
    </v-flex>  
  </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Password',

  props: {
    pk: String,
  },

  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },

  data: () => ({
    valid: false,
    password_old: '',
    password_new: '',
    repetir: '',
    passRules: [
      v => !!v || 'Campo requerido.',
      v => (!!v && v.length >= 4) || 'La contraseña debe tener más de 4 caracteres',
    ],
  }),

  computed: {
    passRepeatRules() {
      return [(this.repetir == this.password_new) || 'Las contraseñas no coinciden']
    }
  },

  methods: {
    async save() {
      if(this.$refs.form.validate()) {
        const id = this.$store.getters['auth/user'].id
        try {
          const response = await this.$store.dispatch('data/update', {
            path: `user/${id}/password`,
            data: { password_old: this.password_old, password_new: this.password_new }
          })
          this.goBack()
          this.$store.commit('alert/setAlert', {
            text: 'Contraseña actualizada con éxito.',
            type: 'success'
          })
        }
        catch (error) {
          console.log(error)
          if (error === 400) {
            this.$store.commit('alert/setAlert', {
              text: 'Contraseña incorrecta.',
              type: 'error'
            })
          }
          else {
            this.$store.commit('alert/setAlert', {
              text: 'No se pudo actualizar la contraseña. Intentalo más tarde.',
              type: 'error'
            })
          }
        }
      }
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
