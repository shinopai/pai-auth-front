import {
  createApp
} from 'vue'
import './assets/css/tailwind.css'
import firebase from './plugins/firebase'
import router from './router/index'
import App from './App.vue'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt)

createApp(App).use(router).use(firebase).component('fa', FontAwesomeIcon).mount('#pai-auth')
