import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/articles/',
    method: 'get',
    params
  })
}
export function fetchArticle(params) {
  return request({
    url: '/api/articles/' + params.id,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/api/articles/',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/articles/' + data.id,
    method: 'put',
    data
  })
}

export function changeStatus(data) {
  return request({
    url: '/api/articles/' + data.id + '/change',
    method: 'put',
    data
  })
}
