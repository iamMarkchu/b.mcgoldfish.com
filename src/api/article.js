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

export function createArticle(params) {
  return request({
    url: '/api/articles/',
    method: 'post',
    params
  })
}

export function updateArticle(params) {
  return request({
    url: '/api/articles/' + params.id,
    method: 'put',
    params
  })
}

export function changeStatus(params) {
  return request({
    url: '/api/articles/' + params.id + '/change',
    method: 'put',
    params
  })
}
