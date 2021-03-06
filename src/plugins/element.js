import Vue from 'vue'
import { Button,Form,FormItem,Input,Message,Container,Header,Aside,Main,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,MessageBox,Tag,Tree,Select,Option,Cascader,Alert,Tabs,TabPane,Steps,Step,Checkbox,CheckboxGroup,Upload,Timeline,TimelineItem,Carousel,CarouselItem,Divider,Avatar,Link } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Divider)
Vue.use(Avatar)
Vue.use(Link)

//把弹窗组件挂载到 vue 的原型对象上
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

