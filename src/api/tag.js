import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/tags/',
    method: 'get',
    params
  })
}
export function fetchTag(params) {
  return request({
    url: '/api/tags/' + params.id,
    method: 'get'
  })
}

export function createTag(params) {
  return request({
    url: '/api/tags/',
    method: 'post',
    params
  })
}

export function updateTag(params) {
  return request({
    url: '/api/tags/' + params.id,
    method: 'put',
    params
  })
}
