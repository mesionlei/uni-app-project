import request from './request'

export const getGoods = (params) => {
  return request({
    url: '/cate/goods',
    params
  })
}

export const addGood = (data) => {
  return request({
    url: '/cate/add',
    method: 'post',
    data
  })
}

export const updateGood = (data) => {
  return request({
    url: '/cate/update',
    method: 'post',
    data
  })
}

export const deleteGood = (data) => {
  return request({
    url: '/cate/delete',
    method: 'post',
    data
  })
}

export const getCates = (params) => {
  return request({
    url: '/cate/getcates',
    params
  })
}

export const addCate = (data) => {
  return request({
    url: '/cate/addcate',
    method: 'post',
    data
  })
}

export const updateCate = (data) => {
  return request({
    url: '/cate/updatecate',
    method: 'post',
    data
  })
}

export const deleteCate = (data) => {
  return request({
    url: '/cate/deletecate',
    method: 'post',
    data
  })
}
