import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import 'normalize.css'

import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Input,
  MessageBox,
  Form,
  FormItem,
  Radio,
  RadioGroup
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)

Vue.use(VueCookies)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$axios = axios


axios.defaults.baseURL = 'http://localhost:3030/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
