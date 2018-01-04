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

export function createTag(data) {
  return request({
    url: '/api/tags/',
    method: 'post',
    data
  })
}

export function updateTag(data) {
  return request({
    url: '/api/tags/' + data.id,
    method: 'put',
    data
  })
}
