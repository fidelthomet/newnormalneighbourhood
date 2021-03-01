import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "privacy" */ '../views/Privacy.vue')
  },
  {
    path: '/:challenge',
    component: () => import(/* webpackChunkName: "about" */ '../views/Challenge.vue'),
    children: [{
      path: '',
      name: 'scenario',
      component: () => import(/* webpackChunkName: "about" */ '../components/ChallengeDetail.vue')
    }, {
      path: ':speculation',
      name: 'speculation',
      component: () => import(/* webpackChunkName: "about" */ '../components/ChallengeSpeculation.vue')
    }]
  },
  // {
  //   path: '/:challenge/:speculation',
  //   name: 'speculation',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Challenge.vue'),
  // },
  {
    path: '/:challenge/speculate',
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      // return { path: `/${to.params.challenge}/speculate/0` }
      return { name: 'speculate', params: { challenge: to.params.challenge, step: '0' } }
    }
  },
  {
    path: '/:challenge/speculate/:step',
    name: 'speculate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contribute.vue')
    // children: [{
    //   path: '',
    //   component: () => import(/* webpackChunkName: "about" */ '../components/ContributePermissions.vue')
    // }, {
    //   path: '1',
    //   name: 'speculate-1',
    //   component: () => import(/* webpackChunkName: "about" */ '../components/ContributeChat.vue')
    // }]
  },
  // {
  //   path: '/challenge/:challenge/form',
  //   name: 'Form',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  // },
  // {
  //   path: '/challenge/:challenge/thanks',
  //   name: 'Thanks',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Thanks.vue')
  // },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue'),
    meta: {
      // prevent indexing on 404 pages
      metaTags: [{
        name: 'robots',
        content: 'noindex'
      }]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// route specific meta tags
// router.beforeEach((to, from, next) => {
//   // This goes through the matched routes from last to first, finding the closest route with a title.
//   // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
//   const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

//   // Find the nearest route element with meta tags.
//   const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
//   // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

//   // If a route with a title was found, set the document (page) title to that value.
//   if (nearestWithTitle) document.title = nearestWithTitle.meta.title

//   // Remove any stale meta tags from the document using the key attribute we set below.
//   Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

//   // Skip rendering meta tags if there are none.
//   if (!nearestWithMeta) return next()

//   // Turn the meta tag definitions into actual elements in the head.
//   nearestWithMeta.meta.metaTags.map(tagDef => {
//     const tag = document.createElement('meta')

//     Object.keys(tagDef).forEach(key => {
//       tag.setAttribute(key, tagDef[key])
//     })

//     // We use this to track which meta tags we create, so we don't interfere with other ones.
//     tag.setAttribute('data-vue-router-controlled', '')

//     return tag
//   })
//   // Add the meta tags to the document head.
//     .forEach(tag => document.head.appendChild(tag))

//   next()
// })

export default router
