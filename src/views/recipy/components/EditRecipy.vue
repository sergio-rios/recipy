<template>
<div class="inline">
  <v-btn small flat icon color="secondary" @click="dialog = true">
    <v-icon small class="muted-text">fas fa-pen</v-icon>
  </v-btn>

  <v-dialog v-model="dialog">
    <v-card class="px-3 py-4">
      <v-card-title class="headline mb-3">{{ post.title }}</v-card-title>

      <v-form
        v-model="valid"
        lazy-validation
        ref="form"
      >
        <ckeditor
          v-model="post.description"
          :editor="editor"
          :config="editorConfig"
        ></ckeditor>

        <v-card-actions class="mt-3">
          <v-spacer></v-spacer>

          <button class="btn btn1" @click.prevent="save">Guardar</button>
          <button class="btn btn2 ml-2" @click.prevent="dialog = false">Cancelar</button>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'EditRecipy',

  props: {
    post: Object
  },

  data: () => ({
    dialog: false,
    valid: true,
    editor: ClassicEditor,
    editorConfig: {
      language: {
        type: String,
        default: 'es'
      },
      toolbar: [ 'heading', 'bold', 'italic', '|', 'bulletedlist', 'numberedlist', '|', 'undo', 'redo' ]
    }
  }),

  methods: {
    async save() {
      if(this.$refs.form.validate()) {
        try {
          const response = await this.$store.dispatch('data/update', {
            path: `post/${this.post.id}`,
            data: this.post
          })
          this.$emit('saved', response.data)
          this.$store.commit('alert/setAlert', {
            text: 'Guardado correctamente',
            type: 'success'
          })
          this.dialog = false
        }
        catch (error) {
          console.log(error)
          this.errors = error.error
        }
      }
    }
  }
}
</script>

<style scoped>
.inline {
  display: inline;
}
</style>
