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

export function createCategory(params) {
  return request({
    url: '/api/categories/',
    method: 'post',
    params
  })
}

export function updateCategory(params) {
  return request({
    url: '/api/categories/' + params.id,
    method: 'put',
    params
  })
}
