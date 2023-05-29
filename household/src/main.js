import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab} from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Analytics } from '@vercel/analytics';
library.add(fab, fas)



router.beforeEach(() => {
    store.dispatch('CHECK_TOKEN_EXPIRATION');
  });
  
  // Call CHECK_TOKEN_EXPIRATION action every 5 minutes
  setInterval(() => {
    store.dispatch('CHECK_TOKEN_EXPIRATION');
  }, 5 * 60 * 1000);
  

createApp(App)
.component('fa', FontAwesomeIcon)
.component('Analytics', Analytics)
.use(store).use(router).mount('#app')
