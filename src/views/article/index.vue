<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button type="primary" @click="handleCreate">写文章</el-button>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" prop="id" label='编号' width="95">
      </el-table-column>
      <el-table-column align="center" label="最后修改时间" width="150">
        <template slot-scope="scope">
          {{scope.row.updated_at | parseTime('{y}/{m}/{d} {h}:{i}') }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" min-width="150">
        <template slot-scope="scope">          
          <span><a href="javascript:;" @click="handleViewArticle(scope.row)">{{scope.row.title}}</a> <el-tag v-if="scope.row.category">{{scope.row.category.category_name}}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status| statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="来源" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.source| sourceTagFilter">{{ scope.row.source | sourceFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.display_order}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="success" size="mini" @click="handleChangeStatus(scope.row, 'active')" v-show="scope.row.status === 'republish'">发布</el-button>
          <el-button size="mini" @click="handleChangeStatus(scope.row, 'republish')" v-show="scope.row.status !== 'republish'">撤回</el-button>
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
<style scoped>
.table-tag {
  margin-right: 5px;
  margin-bottom: 3px;
}
</style>
<script>
import { getList, changeStatus } from '@/api/article'
import { parseTime } from '@/utils'
export default {
  name: 'article_index',
  data: function() {
    return {
      listQuery: {
        page: 1,
        limit: 20
      },
      list: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
    sourceFilter: function(val) {
      const statusMap = {
        origin: '原创',
        reprint: '转载'
      }
      return statusMap[val]
    },
    sourceTagFilter: function(val) {
      const statusMap = {
        origin: 'success',
        reprint: 'info'
      }
      return statusMap[val]
    },
    parseTime
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
    handleCreate: function() {
      this.$router.push('/article/create')
    },
    handleEdit: function(id) {
      this.$router.push('/article/edit/' + id)
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    handleChangeStatus(row, status) {
      const params = { id: row.id, status: status }
      changeStatus(params).then(response => {
        if (response.data.message === 'success') {
          const messageMap = {
            active: '发布成功!',
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
    handleViewArticle(row) {
      window.open(process.env.FRONT_URL + '/article/' + row.id)
    }
  }
}
</script>