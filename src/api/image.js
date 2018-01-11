import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/images/',
    method: 'get',
    params
  })
}
export function fetchImage(params) {
  return request({
    url: '/api/images/' + params.id,
    method: 'get'
  })
}

export function createImage(data) {
  return request({
    url: '/api/images/',
    method: 'post',
    data
  })
}

export function updateImage(data) {
  return request({
    url: '/api/images/' + data.id,
    method: 'put',
    data
  })
}
