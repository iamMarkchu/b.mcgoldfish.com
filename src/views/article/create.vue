<template>
  <div class="app-container">

  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'article_index',
    data: function() {
      return {

      }
    },
    methods: {
      handleCreate: function() {
        this.$router.push('/article/create')
      }
    }
  }
</script>