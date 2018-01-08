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
    <el-table-column align="center" label="所属文章" width="200">
      <template slot-scope="scope">
        <span><a href="javascript:;" @click="handleViewArticle(scope.row.article)">{{scope.row.article.title}}</a></span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="内容" width="200">
      <template slot-scope="scope">
        <span>{{scope.row.content}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="用户" width="100">
      <template slot-scope="scope">
        <span>{{scope.row.owner.name}}</span>
      </template>
    </el-table-column>    
    <el-table-column align="center" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status| statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" label="点赞次数" width="100">
      <template slot-scope="scope">
        <span>{{scope.row.good_count}}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleChangeStatus(scope.row, 'active')" v-show="scope.row.status !== 'active'">通过</el-button>
        <el-button size="mini" @click="handleChangeStatus(scope.row, 'pending')" v-show="scope.row.status !== 'pending'">撤回</el-button>
        <el-button type="danger" size="mini" @click="handleChangeStatus(scope.row, 'deleted')" v-show="scope.row.status !== 'deleted'">删除</el-button>
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
<style>
</style>
<script>
import { getList, changeStatus } from '@/api/comment'
import { parseTime } from '@/utils'
export default {
  name: 'comment_index',
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleViewArticle(row) {
      window.open(process.env.FRONT_URL + '/article/' + row.id)
    },
    handleChangeStatus(row, status) {
      const params = { id: row.id, status: status }
      changeStatus(params).then(response => {
        if (response.data.message === 'success') {
          const messageMap = {
            active: '审核成功!',
            republish: '撤回成功!',
            deleted: '删除成功'
          }
          this.$notify({
            title: '成功',
            message: messageMap[status],
            type: 'success',
            duration: 2000
          })
          row.status = response.data.content.status
          row.updated_at = response.data.content.updated_at
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  filters: {
    parseTime
  }
}
</script>