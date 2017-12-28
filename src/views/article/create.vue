<template>
  <div class="app-container">
    <article-detail :is-edit='false'></article-detail>
  </div>
</template>
<style>

</style>
<script>
  import articleDetail from './components/articleDetail'
  export default {
    name: 'article_create',
    data: function() {
      return {
      }
    },
    methods: {
    },
    components: { articleDetail }
  }
</script>