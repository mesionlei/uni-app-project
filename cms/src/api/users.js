import request from './request'
export const getUser = (params) => {
  return request({
    url: '/users',
    params
  })
}

export const addUser = (data) => {
  return request({
    url: '/users/add',
    method: 'post',
    data
  })
}

export const updateUser = (data) => {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}

export const deleteUser = (data) => {
  return request({
    url: '/users/delete',
    method: 'post',
    data
  })
}

export const updateRole = (params) => {
  return request({
    url: '/users/role',
    params
  })
}
