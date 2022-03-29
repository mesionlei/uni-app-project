import request from './request'

export const getOrder = (params) => {
  return request({
    url: '/order',
    params
  })
}

export const updState = (data) => {
  return request({
    url: '/order/updatestate',
    method: 'post',
    data
  })
}
