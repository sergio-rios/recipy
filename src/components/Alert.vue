<template>
<v-snackbar v-model="show" :color="color" top right multi-line
 :timeout="10000">
  {{ msg }}
  <v-btn color="white" flat icon @click.native="show = false">
    <v-icon small>
      fas fa-times
    </v-icon>
  </v-btn>
</v-snackbar>
</template>

<script>
export default {
  name: 'Alert',

  data: () => ({
    show: false,
    msg: '',
    color: ''
  }),

  created() {
    this.$store.watch((state) => state.alert.text, () => {
      const msg = this.$store.state.alert.text
      const type = this.$store.state.alert.type
      if (msg !== '') {
        this.show = true
        this.msg = msg
        this.color = type
        this.$store.commit('alert/setAlert', {text: '', type: ''})
      }
    })
  }
}
</script>
