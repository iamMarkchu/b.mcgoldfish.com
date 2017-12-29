<template>
  <div class="simplemde-container">
    <textarea :id="id">
    </textarea>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'

export default {
  name: 'simplemde-md',
  props: {
    value: String,
    id: {
      type: String
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 500
    },
    zIndex: {
      type: Number,
      default: 0
    },
    toolbar: {
      type: Array
    }
  },
  data() {
    return {
      simplemde: null,
      hasChange: false
    }
  },
  watch: {
    value(val) {
      if (val === this.simplemde.value() && !this.hasChange) return
      this.simplemde.value(val)
    }
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      element: document.getElementById(this.id || 'markdown-editor-' + +new Date()),
      autoDownloadFontAwesome: false,
      autofocus: this.autofocus,
      toolbar: this.toolbar,
      spellChecker: false,
      insertTexts: {
        link: ['[', ']( )']
      },
      // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
      placeholder: this.placeholder
    })
    if (this.value) {
      this.simplemde.value(this.value)
    }
    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true
      }
      this.$emit('input', this.simplemde.value())
    })
  },
  destroyed() {
    this.simplemde = null
  }
}
</script>

<style>
</style>


