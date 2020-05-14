import Vue from 'vue'
import { Button,Form,FormItem,Input,Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//把弹窗组件挂载到 vue 的原型对象上
Vue.prototype.$message = Message;
