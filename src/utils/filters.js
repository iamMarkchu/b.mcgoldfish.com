export default {
  statusFilter: function(val) {
    const statusMap = {
      republish: '待发布',
      active: '有效',
      deleted: '已删除',
      pending: '待处理'
    }
    return statusMap[val]
  },
  statusTagFilter: function(val) {
    const statusMap = {
      republish: 'info',
      active: 'success',
      deleted: 'danger'
    }
    return statusMap[val]
  }
}
