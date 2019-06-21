<template>
<div class="inline">
  <v-btn small flat icon color="secondary" @click="dialog = true">
    <v-icon small class="muted-text">fas fa-trash</v-icon>
  </v-btn>

  <v-dialog
    v-model="dialog"
    max-width="360"
  >
    <v-card>
      <v-card-title class="headline">¿Estás seguro?</v-card-title>

      <v-card-text>{{ msg }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <button class="btn btn1" @click="del">Borrar</button>

        <button class="btn btn2 ml-2" @click="dialog = false">Cancelar</button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'DelDialog',

  props: {
    msg: String,
    action: Function
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    del() {
      this.action()
      this.dialog = false
      this.$router.go(-1)
    }
  }

}
</script>

<style scoped>
.btn1 {
  background-color: red !important;
  border-color: red !important;
}

.inline {
  display: inline;
}
</style>
