import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import AsyncComputed from 'vue-async-computed';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(AsyncComputed);

new Vue({render: h => h(App),}).$mount('#app');