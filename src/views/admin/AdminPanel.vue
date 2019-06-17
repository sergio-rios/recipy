<template>
<v-container fluid>
  <v-layout justify-center>
    <v-flex xs12>
      <h2 class="text-xs-center mt-3 mb-5">Panel de administración</h2>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar..."
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn icon flat @click="getData">
            <v-icon color="primary" small>fas fa-sync-alt {{ isLoading ? 'fa-spin' : '' }}</v-icon>
          </v-btn>
          <a href="http://recipy.com/pdf/users" target="blank">
            <v-btn icon flat>
              <v-icon color="primary">fas fa-file-pdf</v-icon>
            </v-btn>
          </a>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          :loading="isLoading"
        >
          <v-progress-linear v-slot:progress color="primary" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td>@{{ props.item.nick }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ $date(props.item.created_at) }}</td>
            <td>
              <v-checkbox v-model="props.item.enabled" hide-details color="primary" readonly></v-checkbox>
            </td>
            <td>
              <button
                v-if="props.item.enabled"
                class="btn btn2 btn-sm"
                @click="changeEnable(props.item)"
              >
                Suspender
              </button>
              <button
                v-else
                class="btn btn1 btn-sm"
                @click="changeEnable(props.item)"
              >
                Activar
              </button>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AdminPanel',

  data: () => ({
    search: '',
    headers: [
      { text: 'Usuario', value: 'nick' },
      { text: 'Nombre', value: 'name' },
      { text: 'E-Mail', value: 'email' },
      { text: 'Miembro desde', value: 'created_at' },
      { text: 'Activo', value: 'enabled' },
      { text: 'Opciones', value: null }
    ],
  }),

  computed: {
    ...mapGetters({
      data: 'admin/users',
      status: 'admin/status'
    }),

    isLoading() {
      return this.status === 'loading'
    }
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      await this.$store.dispatch('admin/getUsers')
    },

    async changeEnable(user) {
      const enabled = !user.enabled
      await this.$store.dispatch('admin/enable', {
        id: user.id,
        enable: enabled
      })
      this.getData()
    },

    async disableAccount(id) {
      await this.$store.dispatch('admin/disable', id)
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>

