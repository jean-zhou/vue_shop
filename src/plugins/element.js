import Vue from 'vue'
import {
  Form,
  FormItem,
  Button,
  Input,
  Message,
  Container,
  Main,
  Aside,
  Header,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(MenuItemGroup)
Vue.use(BreadcrumbItem)
Vue.use(Card)
// message组件需要全局挂载
Vue.prototype.$message = Message
