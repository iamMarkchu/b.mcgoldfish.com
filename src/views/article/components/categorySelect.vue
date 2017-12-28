<template>
<div class="categorySelect">
    <el-select 
      v-model="category.id"
      placeholder="请选择"
      clearable
      @change="handleChange">
      <el-option
        v-for="item in categoryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-popover
      ref="popoverCategory"
      placement="top"
      width="160"
      v-model="visible">
      <el-input v-model="category.category_name"></el-input>
      <div style="text-align: right; margin-top:10px;">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="handleCreate">确定</el-button>
      </div>
    </el-popover>
    <el-button type="success" plain v-popover:popoverCategory>添加类别</el-button>
</div>
</template>
<style>

</style>
<script>
import { getList, createCategory } from '@/api/category'
const category = {
  id: null,
  category_name: '',
  parent_id: 0,
  display_order: 99
}
export default {
  name: 'category_select',
  props: [
    'category_id'
  ],
  data() {
    return {
      categoryOptions: [],
      category,
      visible: false
    }
  },
  created() {
    this.category.id = this.category_id
    this.fetchData()
  },
  watch: {
    category_id: function(val) {
      this.category.id = val
    }
  },
  methods: {
    fetchData: function() {
      const params = {}
      getList(params).then(response => {
        this.categoryOptions = response.data.content.map(function(item) {
          return { key: item.id, value: item.id, label: item.category_name }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleCreate: function() {
      createCategory(this.category).then(response => {
        this.category = response.data.content
        this.categoryOptions.push({ key: this.category.id, value: this.category.id, label: this.category.category_name })
        this.$emit('create', this.category)
        this.visible = false
      }).catch(error => {
        console.log(error)
      })
    },
    handleChange: function() {
      this.$emit('change', this.category)
    }
  }
}
</script>