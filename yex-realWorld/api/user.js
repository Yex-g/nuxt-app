import {
  request
} from '@/plugins/request'
export const login = (user) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data:user
  })
}
export const regist = (user) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data:user
  })
}
export const getProfiles = (username)=>{
  return request({
    method:'GET',
    url:`/api/profiles/${username}`,
  })
}
export const followUser = (username)=>{
  return request({
    method:'POST',
    url:`/api/profiles/${username}/follow`,
  })
}
export const unFollowUser = (username)=>{
  return request({
    method:'DELETE',
    url:`/api/profiles/${username}/follow`,
  })
}
export const getCurrentUser = ()=>{
  return request({
    method:'GET',
    url:`/api/user`,
  })
}
export const updatedUser = (params)=>{
  return request({
    method:'PUT',
    url:`/api//user`,
    data:params
  })
}