import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/categories/',
    method: 'get',
    params
  })
}
export function fetchCategory(params) {
  return request({
    url: '/api/categories/' + params.id,
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/api/categories/',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/api/categories/' + data.id,
    method: 'put',
    data
  })
}
