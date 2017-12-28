<template>
  <div class="app-container">
    <article-detail :is-edit="true"></article-detail>
  </div>
</template>
<style>

</style>
<script>
  import articleDetail from './components/articleDetail'
  export default {
    name: 'article_edit',
    data: function() {
      return {
      }
    },
    methods: {
    },
    components: { articleDetail }
  }
</script>