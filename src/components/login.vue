<template>
	<div class="login_container">
		<div class="login_box">
			<h2>电商后台登陆界面</h2>
			<!-- 头像区域 -->
			 <el-tooltip class="item" effect="dark" content="点击更改头像" placement="right-start">
			      <div class="avatar_box" @click="change">
			      	<el-upload
			      	  class="avatar-uploader"
			      	  action="http://127.0.0.1:8888/api/private/v1/upload"
			      	  :show-file-list="false"
			      	  :on-success="handleAvatarSuccess"
			      	 >
			      	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			      	  <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
			      	  <el-button v-else type="warning" icon="el-icon-circle-plus" circle class="addIcon"></el-button>
			      	</el-upload>
			      	<img src="@/assets/2.jpg" alt="图片加载失败!" v-if="!isIcon"> 
			      </div>
			    </el-tooltip>
			
			<!-- 登录表单区域 -->
			<el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
				</el-form-item >
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
				</el-form-item>
				<!-- 按钮区域 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login" icon="el-icon-switch-button">登录</el-button>
				    <el-button type="info" @click="resetLoginForm" icon="el-icon-setting">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		 <el-alert
		    title="为了方便测试,账号和密码已自动填充 !"
		    type="warning"
		    center
		    show-icon class="tishi"
			:closable="false">
		  </el-alert>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				imageUrl: '',
				isIcon:false,
				//这是登录表单的数据绑定对象
				loginForm:{
				 username:'admin',
			     password:'123456'
				},
				//这是表单的验证规则对象
				loginFormRules:{
					//验证用户名是否合法
					username:[
						{required:true,message:"请输入登录名称",trigger:"blur"},
						{min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}
					],
					//验证密码是否合法
					password:[
						{required:true,message:"请输入登录密码",trigger:"blur"},
						{min:6,max:15,message:"长度在6到15个字符",trigger:"blur"}
					]
				}
			}
		},
		methods:{
			//点击重置按钮，重置登录表单
			resetLoginForm(){
			this.$refs.loginFormRef.resetFields();
			},
			handleAvatarSuccess(res, file) {
			        this.imageUrl = URL.createObjectURL(file.raw);
			},
			change(){
				this.isIcon = true;
			},
			login(){
			this.$refs.loginFormRef.validate(async valid=>{
				if(!valid) return;
				const {data:res} = await this.$axios.post('login',this.loginForm);
				if(res.meta.status !== 200) return this.$message.error("登录失败!");
				this.$message.success("登录成功!");
				//1.将登录成功之后的 token，保存到客户端的 sessionStorage(sessionStorage会话期间存储机制，localStorage永久保存机制)  中
				//1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
				//1.2 token 只应当在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
				window.sessionStorage.setItem('token',res.data.token);
				//2 通过编程式导航跳转到后台主页，路由地址是 /home
				this.$router.push('/home');
			});	
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.login_container{
		height:100%;
		background-image: url(../assets/3.png);
	}
    h2{
		color:rgba(255,255,255,.8);
		text-shadow: 5px 5px 5px #f60;
		text-align: center;
		width:100%;
		height:70px;
		line-height:70px;
		background-color:rgba(255,0,0,.3);
		border-radius: 20px 20px 0 0;
		margin:0;
		padding:0;
	}
	.tishi{
		width:400px;
		height:25px;
		line-height:25px;
		position:absolute;
		bottom:120px;
		left:550px;
		background-color:rgba(0,0,0,0) !important;
	}
	.login_box{
		width:500px;
		height:500px;
		border-radius: 20px;
		border:2px solid rgba(255,0,0,.4);
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		background-color:rgba(255,255,255,.5);
		box-shadow: 0px 0px 1px 20px rgba(255, 255, 255, 0.2);
		
		.avatar_box{
			height:90px;
			width:90px;
			border:1px solid #eee;
			border-radius:50%;
			padding:10px;
			box-shadow: 0 0 10px #ddd;
			position:absolute;
			left:50%;
			transform: translate(-50%,25%);
			cursor: pointer;
			background-color:rgba(255,0,0,.2);
			position: relative;
			
			img{
				width:90px;
				height:90px;
				border-radius:50%;
				background-color:#eee;
				position:absolute;
				top:10px;
				left:10px;
			}
			.addIcon,.avatar{
				width:90px;
				height:90px;
			}
		}
		.login_form{
			position:absolute;
			bottom:50px;
			width:100%;
			padding:0 20px;
			box-sizing: border-box;
		}
		.btns{
			display:flex;
			justify-content: flex-end;
		}
	}
</style>
