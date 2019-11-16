import Vue from 'vue'
import {
  Form,
  FormItem,
  Button,
  Input,
  Message
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
// message组件需要全局挂载
Vue.prototype.$message = Message
