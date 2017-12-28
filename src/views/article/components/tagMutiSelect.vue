<template>
<div class="tagMutiSelect">
    <el-select 
      v-model="tagList"
      placeholder="请选择"
      clearable
      multiple
      @change="handleChange">
      <el-option
        v-for="item in tagOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-popover
      ref="popoverTag"
      placement="top"
      width="160"
      v-model="visible">
      <el-input v-model="tag.tag_name"></el-input>
      <div style="text-align: right; margin-top:10px;">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="handleCreate">确定</el-button>
      </div>
    </el-popover>
    <el-button type="success" plain v-popover:popoverTag>添加标签</el-button>
</div>
</template>
<style>

</style>
<script>
import { getList, createTag } from '@/api/tag'
const tag = {
  id: null,
  tag_name: '',
  display_order: 99
}
export default {
  name: 'tag_muti_select',
  props: [
    'tag_ids'
  ],
  data() {
    return {
      tagOptions: [],
      tagList: null,
      tag,
      visible: false
    }
  },
  created() {
    this.tagList = this.tag_ids
    this.fetchData()
  },
  watch: {
    tag_ids: function(val) {
      this.tagList = val
    }
  },
  methods: {
    fetchData: function() {
      const params = {}
      getList(params).then(response => {
        this.tagOptions = response.data.content.map(function(item) {
          return { key: item.id, value: item.id, label: item.tag_name }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleCreate: function() {
      createTag(this.tag).then(response => {
        this.tag = response.data.content
        this.tagOptions.push({ key: this.tag.id, value: this.tag.id, label: this.tag.tag_name })
        this.$emit('create', this.tag)
        this.visible = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleChange: function() {
      this.$emit('change', this.tagList)
    }
  }
}
</script>