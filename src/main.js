// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'
import '@/assets/app.css'
import axios from 'axios'

import { post, fetch, patch, put, del } from './services/http'

import { wssend } from './services/ws'

import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
});


//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$del = del;
Vue.prototype.$wssend = wssend

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#vapp',
    router,
    components: { App },
    template: '<App/>'
})
