<template>
	<div class="main">
		<el-card class="card">
			 <el-avatar shape="circle" :size="40"  :src="url"></el-avatar>
			<h1>Welcome to the e-commerce background management system</h1>
			 <el-tooltip class="item" effect="dark" content="自动轮播" placement="left-start">
			     <el-switch
			       v-model="value"
			       active-color="#13ce66"
			       inactive-color="#ff4949">
			     </el-switch>
			    </el-tooltip>

		</el-card>
		
		  <el-carousel :interval="2500" type="card" height="200px" :autoplay="value">
		    <el-carousel-item v-for="item in imagList" :key="item.id">
		      <h3 class="medium">
				  <img :src="item.src" alt="图片加载失败!">
			  </h3>
		    </el-carousel-item>
		  </el-carousel>
		 
		 <el-divider></el-divider>
		 
		  <el-timeline>
		     <el-timeline-item timestamp="2020/5/11" placement="top" color="red">
		       <el-card>
		         <h4>User management</h4>
		         <p> <el-link type="primary"><i class="el-icon-view el-icon--right"></i> WuHao</el-link> 提交于 2020/5/11 20:46</p>
				  <el-divider></el-divider>
		       </el-card>
		     </el-timeline-item>
		     <el-timeline-item timestamp="2020/5/13" placement="top" color="black">
		       <el-card>
		         <h4>Permission management</h4>
		         <p> <el-link type="primary"><i class="el-icon-view el-icon--right"></i> WuHao</el-link> 提交于 2020/5/13 20:46</p>
		          <el-divider></el-divider>
			   </el-card>
		     </el-timeline-item>
		     <el-timeline-item timestamp="2020/5/14" placement="top" color="blue">
		       <el-card>
		         <h4>Commodity management</h4>
		         <p> <el-link type="primary"><i class="el-icon-view el-icon--right"></i> WuHao</el-link> 提交于 2020/5/14 20:46</p>
		          <el-divider></el-divider>
			   </el-card>
		     </el-timeline-item>
			 <el-timeline-item timestamp="2020/5/16" placement="top" color="green">
			   <el-card>
			     <h4>Order management</h4>
			     <p> <el-link type="primary"><i class="el-icon-view el-icon--right"></i> WuHao</el-link> 提交于 2020/5/16 20:46</p>
			      <el-divider></el-divider>
			   </el-card>
			 </el-timeline-item>
			 <el-timeline-item timestamp="2020/5/18" placement="top" color="#f60">
			   <el-card>
			     <h4>Data statistics</h4>
			     <p> <el-link type="primary"><i class="el-icon-view el-icon--right"></i> WuHao</el-link> 提交于 2020/5/18 20:46</p>
			      <el-divider></el-divider>
			   </el-card>
			 </el-timeline-item>
		   </el-timeline>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				value:true,
				imagList:[
					{id:1,src:require('@/assets/images/pic-1.jpg')},
					{id:2,src:require('@/assets/images/pic-2.jpg')},
					{id:3,src:require('@/assets/images/pic-3.jpg')},
					{id:4,src:require('@/assets/images/pic-4.jpg')},
					{id:5,src:require('@/assets/images/pic-5.jpg')},
					{id:6,src:require('@/assets/images/pic-6.jpg')}
				]
			}
		},
		mounted(){
			this.init();	
		},
		methods:{
			init(){
				const div = document.querySelector(".el-carousel__container");
				div.style.height = "350px"
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.main{
		width:100%;
		min-height:100%;
		background-color:#C0C4CC;
		border:1px solid white;
		border-radius: 30px 30px 0 0;
		box-shadow: 0 5px 20px 10px rgba(0, 0, 0, 0.6)
	}
	.el-divider{
		background-color:#C0C4CC;
		margin:15px 0;
		padding:0;
		border-left:none;
		border-right:none;
	}
	.el-avatar{
		position:absolute;
		top:16px;
		left:50px;
		cursor:pointer;
		box-shadow: 0px 1px 3px 3px rgba(255,0,0,.4);
	}
	h1{
		font-size:24px;
		margin:0;
		padding:0;
		text-align:center;
		color:white;
		text-shadow: 8px 8px 8px rgba(255,0,0,.8);
	}
	.el-switch{
		position:absolute;
		top:25px;
		right:50px;
	}
	.card{
		margin-bottom:0px;
		background-color:#606266;
		border-radius: 30px 30px 0 0 ;
		position:relative;
	}
	.el-carousel{
		background-color:#909399;
		padding-top:20px;
	}
	.el-carousel__item h3 {
	    font-size: 14px;
	    opacity: 0.75;
		height:600px !important;
	    margin: 0;
		img{
			display:block;
			width:100%;
			height:100%;
		}
	  }
	  .el-timeline{
		  color:red;
		  .el-timeline-item{
		     color:red;
			 .el-card{
				 margin:0;
				 padding:0;
				 width:96%;
				 h4{
					margin:0;
					padding:0;
					font-size:16px;
					color:#606266;
				 }
				 p{
					 color:#f60;
				 }
			 }
		  }
	  }
</style>
