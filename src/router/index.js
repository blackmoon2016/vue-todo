import Vue from 'vue'
import Router from 'vue-router'
import Todos from '../todos/App'
import AjaxTest from '../components/testAjax'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'vue-todos',
      component: Todos,
      meta: {
        title: 'Todos'
      }
    },
    {
      path: '/test',
      name: 'test-ajax',
      component: AjaxTest,
      meta: {
        title: 'Ajax-Test'
      }
    }
  ]
})

// 修改页面的
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
