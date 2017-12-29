<template>
<el-dialog title="编辑类别" :visible.sync="visible" @close="handleClose">
    <el-form :model="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth">
        <el-input v-model="form.category_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="form.display_order"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
</el-dialog>
</template>
<script>
import { updateCategory } from '@/api/category'
export default {
  name: 'category_edit',
  props: ['dialogFormVisible', 'category'],
  data() {
    return {
      visible: false,
      formLabelWidth: '120px',
      form: {
        category_name: '',
        display_order: 99
      }
    }
  },
  methods: {
    handleClose: function() {
      this.$emit('update:dialogFormVisible', false)
    },
    handleSubmit: function() {
      updateCategory(this.form).then(response => {
        this.form = Object.assign(this.form, response.data.content)
        this.$emit('updateForm', this.form)
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.$emit('update:dialogFormVisible', false)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      this.visible = val
    },
    category: function(val) {
      this.form = Object.assign({}, val)
    }
  }
}
</script>