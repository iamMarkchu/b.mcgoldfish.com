<template>
<el-form ref="form" :model="article" label-width="120px">
  <el-form-item label="标题">
    <el-col :span="8">
      <el-input v-model="article.title"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="封面">
    <el-col :span="8">
      <upload :imageUrl.sync="article.image"></upload>
    </el-col>
  </el-form-item>
  <el-form-item label="类别">
    <category-select :category_id="article.category_id" @create="handleCreateCategory" @change="handleChangeCategory"></category-select>
  </el-form-item>
  <el-form-item label="标签">
    <tag-muti-select :tag_ids="article.tags" @create="handleCreateTag" @change="handleChangeTag"></tag-muti-select>
  </el-form-item>
  <el-form-item label="排序">
    <el-col :span="2">
      <el-input v-model="article.display_order"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="来源">
    <el-select v-model="article.source" placeholder="请选择">
      <el-option
        v-for="item in sourceOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="内容">
    <el-col :span="18">
      <markdown-editor id="contentEditor" ref="contentEditor" v-model="article.content"></markdown-editor>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="onCancel">取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { createArticle, fetchArticle, updateArticle } from '@/api/article'
import upload from '@/components/Upload'
import markdownEditor from '@/components/MarkdownEditor'
import categorySelect from './categorySelect'
import tagMutiSelect from './tagMutiSelect'
const sourceOptions = [
  { key: 'origin', value: 'origin', label: '原创' },
  { key: 'reprint', value: 'reprint', label: '转载' }
]

const defaultArticle = {
  id: undefined,
  category_id: null,
  tags: [],
  title: '',
  image: '',
  content: '',
  display_order: 99,
  source: 'origin'
}
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.article = Object.assign({}, defaultArticle)
    }
  },
  data() {
    return {
      sourceOptions,
      article: Object.assign({}, defaultArticle),
      visible2: false
    }
  },
  watch: {
    'article.content': function(val) {
      console.log(val)
    }
  },
  methods: {
    fetchData() {
      const params = { id: this.$route.params.id }
      fetchArticle(params).then(response => {
        this.article = response.data.content
      }).catch(error => {
        console.log(error)
      })
    },
    onSubmit() {
      if (this.isEdit) {
        this.update()
      } else {
        this.create()
      }
    },
    onCancel() {
      this.$router.go(-1)
    },
    create() {
      const that = this
      createArticle(this.article).then(response => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        that.$router.go(-1)
      }).catch(error => {
        console.log(error)
      })
    },
    update() {
      const that = this
      updateArticle(this.article).then(response => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        that.$router.go(-1)
      }).catch(error => {
        console.log(error)
      })
    },
    handleCreateCategory(category) {
      this.article.category_id = category.id
    },
    handleChangeCategory(category) {
      this.article.category_id = category.id
    },
    handleCreateTag(tag) {
      this.article.tags.push(tag.id)
    },
    handleChangeTag(tagList) {
      this.article.tags = tagList
    }
  },
  components: {
    upload,
    categorySelect,
    tagMutiSelect,
    markdownEditor
  }
}
</script>