import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
  

const router =new Router({
  
  mode: "history",/**** 部署时要删除（注释），再进行打包 ****/
  
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path:'/index',
      component:resolve => require(['../components/index/index.vue'], resolve),
      meta: { title: '首页' ,requireAuth:true},
      children:[
        {
          path: '/',
          component: resolve => require(['../components/index/page/welcome.vue'], resolve),
          meta: { title: '欢迎页面' }
        },
        {
          path: '/welcome',
          component: resolve => require(['../components/index/page/welcome.vue'], resolve),
          meta: { title: '欢迎页面' }
        },
        {
          path: '/customerSearch',
          component: resolve => require(['../components/index/page/customerSearch/customerSearch.vue'], resolve),
          meta: { title: '搜索客户',name:'customerSearch' }
        },
        {
          path: '/automaticSearch',
          component: resolve => require(['../components/index/page/customerSearch/automaticSearch.vue'], resolve),
          meta: { title: '智能获客' }
        },
        {
          path: '/clue',
          component: resolve => require(['../components/index/page/clue/clue.vue'], resolve),
          meta: { title: '线索',name:'clue' }
        },
        {
          path: '/clueDetails',
          component: resolve => require(['../components/index/page/clue/clueDetails.vue'], resolve),
          meta: { title: '线索详情' }
        },
        {
          path: '/clueaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/clueaddorupdate.vue'], resolve),
          meta: { title: '编辑线索' }
        },
        {
          path: '/cluePool',
          component: resolve => require(['../components/index/page/clue/cluePool.vue'], resolve),
          meta: { title: '线索池',name:'cluePool' }
        },
        {
          path: '/customer',
          component: resolve => require(['../components/index/page/customer/customer.vue'], resolve),
          meta: { title: '客户',name:'customer' }
        },
        {
          path: '/customerPool',
          component: resolve => require(['../components/index/page/customer/customerPool.vue'], resolve),
          meta: { title: '客户池',name:'customerPool' }
        },
        {
          path: '/contacts',
          component: resolve => require(['../components/index/page/contacts/contacts.vue'], resolve),
          meta: { title: '联系人',name:'contacts' }
        },
        {
          path: '/contactsaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/contactsaddorupdate.vue'], resolve),
          meta: { title: '编辑联系人' }
        },
        {
          path: '/agreement',
          component: resolve => require(['../components/index/page/agreement/agreement.vue'], resolve),
          meta: { title: '合同',name:'agreement' }
        },
        {
          path: '/agreementaddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/agreementaddorupdate.vue'], resolve),
          meta: { title: '编辑合同' }
        },
        {
          path: '/businessOpportunity',
          component: resolve => require(['../components/index/page/businessOpportunity/businessOpportunity.vue'], resolve),
          meta: { title: '商机',name:'businessOpportunity' }
        },
        {
          path: '/organization',
          component: resolve => require(['../components/index/page/organization/organization.vue'], resolve),
          meta: { title: '组织机构',name:'organization' }
        },
        {
          path: '/user',
          component: resolve => require(['../components/index/page/user/user.vue'], resolve),
          meta: { title: '用户',name:'user' }
        },
        {
          path: '/customeraddorupdate',
          component: resolve => require(['../components/index/page/AddAndUpdate/customeraddorupdate.vue'], resolve),
          meta: { title: '编辑客户' }
        },
      ]
    },
        
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (sessionStorage.getItem('token')) {
//       next();
//     }else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   }else {
//     next();
//   }
// })
export default  router
