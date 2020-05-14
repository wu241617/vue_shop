import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Welcome from '@/components/welcome.vue'
import Users from '@/components/users.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		component: Login
	},
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/home',
		component: Home,
		children: [{
			path: '/welcome',
			component: Welcome
		},
		{path:'/home',redirect:'/welcome'},
		{path:'/users',component:Users}
		]
	}
]

const router = new VueRouter({
	routes
})

//路由导航守卫控制访问权限
//需求: 如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登陆页面
//为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
	//to 将要访问的页面
	//from 代表从哪个路径跳转而来
	//next 是一个函数，表示放行； next()放行； next('/login') 强制跳转到某页面
	//如果用户访问的登录页，直接放行
	if (to.path === '/login') return next();
	//从sessionStorage中获取，保存的 token 值
	const tokenStr = window.sessionStorage.getItem('token');
	if (tokenStr) return next();
	//没有 token 强制跳转到 login 页面
	next('/login');
})

export default router
