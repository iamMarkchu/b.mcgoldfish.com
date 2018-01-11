<template>

</template>
<script>
export default {
  name: 'image-create',
  props: ['dialogFormVisible', 'image'],
  data() {
    return {

    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.visible = val
    }
  },
  methods: {
    handleSubmit() {
      console.log(111)
    },
    handleClose() {

    }
  }
}
</script>