<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="image" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="image.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <upload :imageUrl.sync="image.url_name" imageBtn="btn"></upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="id" label='编号' width="95">
      </el-table-column>
      <el-table-column align="center" label="最后修改时间" width="180px">
        <template slot-scope="scope">
          {{scope.row.updated_at | parseTime('{y}/{m}/{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="500">
        <template slot-scope="scope">
          <span>{{ frontUrl + scope.row.url_name }}</span>
          <br>
          <img :src="frontUrl + scope.row.url_name" alt="" width="300">
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.display_order}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, createImage } from '@/api/image'
import upload from '@/components/Upload'
import { parseTime } from '@/utils'
export default {
  name: 'image_index',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      list: null,
      total: 0,
      listLoading: true,
      image: {
        name: '',
        url_name: ''
      },
      frontUrl: process.env.FRONT_URL
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.content.data
        this.total = response.data.content.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.showCreate = true
    },
    handleSubmit() {
      createImage(this.image).then(response => {
        this.list.push(response.data.content)
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  },
  components: {
    upload
  },
  filters: {
    parseTime
  }
}
</script>
