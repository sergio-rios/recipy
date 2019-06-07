<template>
<v-container fluid>
  <v-layout justify-center wrap>
    <v-flex xs12 sm8 lg6>
      <v-form
        @submit.prevent="create"
        v-model="valid"
        lazy-validation
      >
      <h2 class="text-xs-center my-4">Crear recipy</h2>

        <v-text-field
          v-model="post.title"
          :counter="40"
          :rules="titleRules"
          label="Título"
          required
        ></v-text-field>

        <TagSelector class="mb-4" />

        <ImageInput label="Muestra la pinta que tiene" />

        <p class="theme--light v-label mt-5">Describe tu recipy paso a paso</p>
        <ckeditor
          v-model="post.description"
          class="mt-3"
          :editor="editor"
          :config="editorConfig"
        ></ckeditor>

        <v-layout justify-space-end wrap mt-4>
          <v-spacer></v-spacer>
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
          <button @click.prevent="goBack" class="btn btn2 ml-2">{{ $text(4, 1, 8) }}</button>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import TagSelector from './components/TagSelector'
import ImageInput from '@/components/ImageInput'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { mapGetters } from 'vuex';

export default {
  name: 'CreateRecipy',

  components: {
    TagSelector,
    ImageInput
  },

  data: () => ({
    valid: false,
    post: {
      title: null,
      tags: null,
      description: null,
      image: null
    },
    titleRules: [
      v => !!v || 'El título no puede estar vacio',
      v => (v && v.length <= 40) || 'El título supera los 40 caracteres',
    ],
    editor: ClassicEditor,
    editorConfig: {
      language: {
        type: String,
        default: 'es'
      },
      toolbar: [ 'heading', 'bold', 'italic', '|', 'bulletedlist', 'numberedlist', '|', 'undo', 'redo' ]
    }
  }),

  computed: {
    ...mapGetters({
      image: 'file/file'
    }),

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

  methods : {
    async create() {
      try {
        this.post.image = this.image
        this.post.tags = this.$store.getters['tag/selected'].map(tag => tag.id)
        console.log(this.post)
        const response = await this.$store.dispatch('data/create', {
          path: 'post',
          data: this.post
        })
        const recipyID = response.data.id
        this.$router.push(`/recipy/${recipyID}`)
      }
      catch (error) {
        console.log(error)
        this.errors = error.error
      }
    }
  }

}
</script>

<style lang="sass">
@import '@/styles/ckeditor.scss';
</style>


