import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/article',
    component: Layout,
    meta: { title: '文章中心', icon: 'article' },
    children: [
      {
        path: 'index',
        name: 'Article',
        component: _import('article/index'),
        meta: { title: '文章', icon: 'article' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'create',
        name: 'Article Create',
        component: _import('article/create'),
        meta: { title: '写文章' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'Article Edit',
        component: _import('article/edit'),
        meta: { title: '编辑文章' },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    meta: { title: '类别中心', icon: 'category' },
    children: [
      {
        path: 'index',
        name: 'Category',
        component: _import('category/index'),
        meta: { title: '类别', icon: 'category' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    meta: { title: '类别' },
    hidden: true,
    children: [
      {
        path: 'create',
        name: 'Category Create',
        component: _import('category/create'),
        meta: { title: '创建类别' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'Category Edit',
        component: _import('category/edit'),
        meta: { title: '编辑类别' },
        hidden: true
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    meta: { title: '标签中心', icon: 'tag' },
    children: [
      {
        path: 'index',
        name: 'Tag',
        component: _import('tag/index'),
        meta: { title: '标签', icon: 'tag' }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    meta: { title: '标签' },
    hidden: true,
    children: [
      {
        path: 'create',
        name: 'Tag Create',
        component: _import('tag/create'),
        meta: { title: '创建标签' }
      },
      {
        path: 'edit/:id',
        name: 'Tag Edit',
        component: _import('tag/edit'),
        meta: { title: '编辑标签' },
        hidden: true
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    meta: { title: '图片' },
    children: [
      {
        path: 'index',
        name: 'Image',
        component: _import('image/index'),
        meta: { title: '图片', icon: 'image' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

