import {
  request
} from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取用户文章列表，需要token
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
  })
}

//获取当前用户列表
export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params,
  })
}
//获取受欢迎的文章列表
export const getFavoritedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params:{
      ...params,
      favorited: "reneemoura"
    },
  })
}
// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
// 获取文章评论
export const creatArticles = article => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data:article
  })
}

export const comments = params =>{
  return request({
    method: 'POST',
    url: `/api/articles/${params.slug}/comments`,
    comment: {
      body: params.body
    }
  })
}