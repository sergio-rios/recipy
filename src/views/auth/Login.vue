<template>
<v-container fluid fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4 xl3>
      <div class="card">
        <h1>Recipy</h1>
        <v-form>
          <v-text-field prepend-icon="fas fa-user" name="login" :label="$text(1, 1, 1)" type="text"></v-text-field>
          <v-text-field id="password" prepend-icon="fas fa-key" name="password" :label="$text(1, 1, 2)" type="password"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <a href="#" class="no-link mr-4">{{ $text(1, 1, 5) }}</a>
            <button class="btn btn1">{{ $text(1, 1, 3) }}</button>
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
    drawer: null
  }),
  
  props: {
    source: String
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
