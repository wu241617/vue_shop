<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- 卡片视图 -->
		<el-card>
			<!-- 添加角色按钮区域 -->
			<el-row>
				<el-col>
						<el-button type="primary" @click="showAddRole">添加角色</el-button>
				</el-col>
			</el-row>
			<!-- 角色列表区域 -->
			<el-table :data="rolelist" border stripe >
				<!-- 展开列 -->
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
							<!-- 渲染一级权限 -->
							<el-col :span="5">
						      <el-tag  closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
							  <i class="el-icon-caret-right"></i>
							  
							</el-col>
							<!-- 渲染二级和三级权限 -->
							<el-col :span="19">
								<el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
									<!-- 通过for循环嵌套渲染二级权限 -->
									<el-col :span="6">
										<el-tag type="success"  closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="18">
										<el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
										
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<!-- 索引列 -->
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="角色名称" prop="roleName"></el-table-column>
				<el-table-column label="角色描述" prop="roleDesc"></el-table-column>
				<el-table-column label="操作" width="300">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRole(scope.row.id)">编辑</el-button>
						<el-button type="danger" icon="el-icon-detele"size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
						<el-button type="warning" icon="el-icon-setting"size="mini" @click="showSetRiahtDialog(scope.row)">分配权限</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 添加角色的对话框 -->
		<el-dialog
		  title="添加角色"
		  :visible.sync="addRoleDialogVisible"
		  width="50%"
<<<<<<< HEAD
		  >
		 <el-form ref="addRoleFormRef" :model="addRoleForm" label-width="80px">
		   <el-form-item label="角色名称:">
=======
		  @close="addRoleClosed"
		  >
		 <el-form ref="addRoleFormRef" :model="addRoleForm" label-width="80px" :rules="addRoleFormRules">
		   <el-form-item label="角色名称:" prop="roleName">
>>>>>>> rights
		     <el-input v-model="addRoleForm.roleName"></el-input>
		   </el-form-item>
		   <el-form-item label="角色描述:">
		     <el-input v-model="addRoleForm.roleDesc"></el-input>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addRoleDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addRole">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 编辑角色的对话框 -->
		<el-dialog
		  title="编辑角色"
		  :visible.sync="editRoleDialogVisible"
		  width="50%"
		  >
<<<<<<< HEAD
		 <el-form ref="editRoleFormRef" :model="editRoleForm" label-width="80px">
		   <el-form-item label="角色名称:">
=======
		 <el-form ref="editRoleFormRef" :model="editRoleForm" label-width="80px" :rules="editRoleFormRules">
		   <el-form-item label="角色名称:" prop="roleName">
>>>>>>> rights
		     <el-input v-model="editRoleForm.roleName"></el-input>
		   </el-form-item>
		   <el-form-item label="角色描述:">
		     <el-input v-model="editRoleForm.roleDesc"></el-input>
		   </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editRoleDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editRole">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 分配权限的对话框 -->
		<el-dialog
		  title="分配权限"
		  :visible.sync="setRightDialogVisible"
		  width="50%"
		  @close="setRightDialogClosed"
		  >
		  <!-- 树形控件 -->
		  <el-tree :data="rightlist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="setRightDialogVisible = false">取 消</el-button>
		    <el-button type="primary"  @click="allotRights">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//所有角色列表数组
				rolelist:[],
				//控制分配权限对话框的显示与隐藏
				setRightDialogVisible:false,
				//所有权限的数据
				rightlist:[],
				//树形控件的属性绑定对象
				treeProps:{
					label:'authName',
					children:'children'
				},
				//默认选中的节点的 Id 数组
				defKeys:[],
				//当前即将分配权限的角色Id
				roleId:'',
				//控制添加角色对话框的显示与隐藏
				addRoleDialogVisible:false,
				//添加角色的内容
				addRoleForm:{
					roleName:'',
					roleDesc:''
				},

				//添加角色表单中验证规则
				addRoleFormRules:{
					roleName:[
						{required:true,message:'请输入角色名称',trigger:'blur'}
					]
				},

				//控制编辑角色对话框的显示与隐藏
				editRoleDialogVisible:false,
				//编辑角色的内容
				editRoleForm:{},

				//编辑角色表单中验证规则
				editRoleFormRules:{
					roleName:[
						{required:true,message:'请输入角色名称',trigger:'blur'}
					]
				},

				//当前编辑的角色 id
				editId:''
			}
		},
		created(){
			this.getRolesList();
		},
		methods:{
			//获取所有角色的列表
			async getRolesList(){
				const {data:res} = await this.$axios.get('roles')
				if(res.meta.status !== 200){
					return this.$message.error('获取角色列表失败!');
				}
				this.rolelist = res.data;
			},
			//根据 Id 删除对应的权限 
			async removeRightById(role,rightId){
				//弹框提示用户是否删除
				const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续 ?', '提示', {
					      confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				}).catch(err => err)
				//如果用户确认删除,返回值为字符串 confirm
				//如果用户取消删除,返回值为字符串 cancel
				if(confirmResult !== 'confirm') {
					return this.$message.info('已取消删除!');
				}
				const {data:res} = await this.$axios.delete(`roles/${role.id}/rights/${rightId}`)
				if(res.meta.status !== 200) {
					this.$message.error('删除权限失败!');
				}
				this.$message.success('删除权限成功!');
				role.children = res.data;	
			},
			//展示分配权限的对话框
			async showSetRiahtDialog(role){
				this.roleId =role.id;
				//获取所有权限的数据
				const {data:res} = await this.$axios.get('rights/tree')
				if(res.meta.status !== 200) {
					return this.$message.error('获取权限列表失败!')
				}
				//被获取到的权限数据保存到 data 中
				this.rightlist = res.data;
				//递归回去三级节点的 id 
				this.getLeafKeys(role,this.defKeys)
				this.setRightDialogVisible = true;
			},
			//通过递归的形式，获取角色下所有三级权限的 Id 并保存到 defKeys 数组中
			getLeafKeys(node,arr){
				//如果当前 node  节点不包含children属性，则是三级节点
				if(!node.children) {
				  return arr.push(node.id)
				}
				node.children.forEach(item => this.getLeafKeys(item,arr))
			},
			//监听分配权限对话框的关闭事件
			setRightDialogClosed(){
				this.defKeys = [];
			},
			//点击为权限分配角色
			async allotRights(){
				const keys = [
					...this.$refs.treeRef.getCheckedKeys(),
					...this.$refs.treeRef.getHalfCheckedKeys()
				];
				const idStr = keys.join(',');
				const {data:res} = await this.$axios.post(`roles/${this.roleId}/rights`,{rids:idStr});
				if(res.meta.status !== 200){
					return this.$message.error('分配权限失败!');
				}
				this.$message.success('分配权限成功!');
				this.getRolesList();
				this.setRightDialogVisible = false;
			},
			//监听添加角色对话框
			showAddRole(){
				this.addRoleDialogVisible = true;
			},
			//点击添加角色
		    addRole(){
				this.$refs.addRoleFormRef.validate(async valid => {
					if(!valid) return
					const {data:res} = await this.$axios.post('roles',this.addRoleForm);
					if(res.meta.status !== 201){
						return this.$message.error('添加角色失败!');
					}
					this.$message.success('添加角色成功!');
					this.getRolesList();
					this.addRoleDialogVisible = false;
				})

			},
			//监听添加角色对话框
			async showEditRole(id){
				//根据 ID 查询到要修改的角色
				const {data:res} = await this.$axios.get(`roles/${id}`);
				if(res.meta.status !== 200) {
					return this.$message.error('查询角色失败!');
				}
				this.$message.success('查询角色成功!');
				this.editId = id;
				this.editRoleForm = res.data;
				this.editRoleDialogVisible = true;
			},
			//点击添加角色

			editRole(){
				this.$refs.editRoleFormRef.validate(async valid => {
					if(!valid) return
					const {data:res} = await this.$axios.put(`roles/${this.editId}`,this.editRoleForm);
					if(res.meta.status !== 200){
						return this.$message.error('编辑提交角色失败!');
					 }
					this.$message.success('编辑提交角色成功!');
					this.getRolesList();
					this.editRoleDialogVisible = false;
					
				})
			},
			//删除对应 ID 的角色
			async deleteRole(id){
				const deleteRelust = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).catch(err => err);
				if(deleteRelust !== 'confirm'){
					return this.$message.info('已取消删除!');
				}
				const {data:res} = await this.$axios.delete(`roles/${id}`);
				if(res.meta.status !== 200){
					return this.$message.error('删除角色失败!');
				}
				this.$message.success('删除角色成功!');
				this.getRolesList();
			},
			//关闭添加角色对话框时，表单数据的清空
			addRoleClosed(){
				this.$refs.addRoleFormRef.resetFields();
				this.addRoleForm.roleName='';
				this.addRoleForm.roleDesc='';	
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.el-tag{
		margin:7px;
	}
	.bdtop{
		border-top:1px solid #eee;
	}
	.bdbottom{
		border-bottom:1px solid #eee;
	}
	.vcenter{
		display:flex;
		align-items: center;
	}
</style>
