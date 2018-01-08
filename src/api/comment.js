import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/comments/',
    method: 'get',
    params
  })
}
export function fetchCategory(params) {
  return request({
    url: '/api/comments/' + params.id,
    method: 'get'
  })
}

export function createCategory(data) {
  return request({
    url: '/api/comments/',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/api/comments/' + data.id,
    method: 'put',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/api/comments/' + data.id + '/change',
    method: 'put',
    data
  })
}
