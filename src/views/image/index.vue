<template>
  <div class="app-container">
    <updload :imageUrl.sync="imageUrl"></updload>
  </div>
</template>

<script>
import updload from '@/components/Upload'
export default {
  name: 'image_index',
  data() {
    return {
      imageUrl: ''
    }
  },
  watch: {
    imageUrl: function(val) {
      console.log(val)
    }
  },
  components: {
    updload
  }
}
</script>
