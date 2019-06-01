<template>
  <div v-html="recipy.description"></div>
</template>

<script>
export default {
  name: 'Recipe',

  props: {
    recipy: Object
  }
}
</script>

<style scoped>
div { padding: 2rem; }
</style>
