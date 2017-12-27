<template>
    <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" size="mini" @click="handleCreate()">CREATE</el-button>
    </div>
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