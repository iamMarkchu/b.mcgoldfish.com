<template>
<div class="app-container">
  <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
    <el-table-column align="center" prop="id" label='编号' width="95">
    </el-table-column>
    <el-table-column align="center" label="最后修改时间" width="180px">
      <template slot-scope="scope">
        {{scope.row.updated_at | parseTime('{y}/{m}/{d} {h}:{i}') }}
      </template>
    </el-table-column>
    <el-table-column align="center" label="类别名" width="200">
      <template slot-scope="scope">
        <span>{{scope.row.category_name}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="文章数量" width="100">
      <template slot-scope="scope">
        <span>{{scope.row.articles_count}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="排序" width="100">
      <template slot-scope="scope">
        <span>{{scope.row.display_order}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="success" size="mini" @click="handleViewList(scope.row)">文章列表</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
      :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <category-edit :dialogFormVisible.sync="showEdit" :category="category" @updateForm="handleUpdateForm"></category-edit>
</div>
</template>
<style>
</style>
<script>
import { getList } from '@/api/category'
import { parseTime } from '@/utils'
import categoryEdit from './edit'
export default {
  name: 'category_index',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      list: null,
      total: 0,
      listLoading: true,
      showEdit: false,
      category: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.content.data
        this.total = response.data.content.total
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.showEdit = true
      this.category = row
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    handleUpdateForm(val) {
      for (const v of this.list) {
        if (v.id === val.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, val)
          break
        }
      }
    },
    handleViewList() {
      this.$notify({
        title: '待开发',
        message: '查看文章列表功能待开发',
        type: 'info',
        duration: 2000
      })
    }
  },
  filters: {
    parseTime
  },
  components: {
    categoryEdit
  }
}
</script>