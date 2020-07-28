<template>
	<el-container class="home-container">
		<!-- 头部区域 -->
		<el-header>
			<div>
				<img src="@/assets/heima.png" alt="图片加载失败!">
				<span class="title">电商后台管理系统</span>
			</div>
			<el-button @click="logout" type="info"icon="el-icon-switch-button">退出</el-button>
		</el-header>
		<!-- 页面主题区域 -->
		<el-container class="zhuti">
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div class="toggle-button" @click="toggleCollapse">|||</div>
				<!-- 侧边栏菜单区域 -->
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
					<!-- 一级菜单 -->
					<el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
						<!-- 一级菜单模板区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconsObj[item.id]"></i>                  
							<!-- 文本 -->
							<span>{{item.authName}}</span>
						</template>
	                     <!-- 二级菜单 -->
						<el-menu-item :index="'/'+subItem.path +''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>                  
								<!-- 文本 -->
								<span>{{subItem.authName}}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!-- 右侧主体区域 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data(){
			return {
				//左侧菜单数据
				menulist:[],
				iconsObj:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao'
				},
				//是否折叠
				isCollapse:false,
				//被激活的链接地址
				activePath:''
			}
		},
		methods: {
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			//获取所有的菜单
			async getMenuList(){
			const {data:res} = await this.$axios.get('menus');
			if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
			this.menulist = res.data;
			},
			//点击按钮，切换菜单的展开和折叠
			toggleCollapse(){
				this.isCollapse = !this.isCollapse;
			},
			//保存链接的激活状态
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath',activePath);
				this.activePath = activePath;
			}
		},
		created(){
			this.getMenuList();
			this.activePath = window.sessionStorage.getItem('activePath');
		}

	}
</script>

<style lang="less" scoped="scoped">
	.home-container {
		height: 100%;
	}
    .title{
	    font-size:24px;
		color:white;
		text-shadow: 0px 3px 5px red !important;
		margin:0;
		padding:0;
	}
	.el-header {
		background-color: #373D41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;
		height:10% !important;
		width:100%;

		> div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}
	}
     
	 .zhuti{
		 height:90%;
	 }
	 
	.el-aside {
		background-color: #333744;
		height:100% !important;
		.el-menu{
			border-right:none;
		}
	}

	.el-main {
		background-color: #eaedf1;
		height:100% !important;
	}
	.iconfont{
		margin-right:10px;
	}
	.toggle-button{
		background-color:#4A5064;
		color:#fff;
		text-align:center;
		font-size:10px;
		line-height:24px;
		letter-spacing: 0.2em;
		cursor:pointer;
	}

</style>
