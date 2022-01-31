import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Vuex from 'vuex';
Vue.use(Vuex);

//for vuex data manager
import storeData from "./store.js";
const store = new Vuex.Store(
    storeData
);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//SUPPORT EDITOR
import 'v-markdown-editor/dist/v-markdown-editor.css';
import Editor from 'v-markdown-editor';
Vue.use(Editor);


Vue.use(VueSweetalert2);
Vue.config.productionTip = false

//filter config
//support moment
import moment from 'moment'
Vue.filter('timeformat', (arg) => {
    return moment(arg).format("MMM Do YYYY");
});

Vue.filter('sortlength', function(text, length, suffix) {
    return text.substring(0, length) + suffix;
});

//create component
Vue.component('page-header', require('./components/PageHeader.vue').default);
Vue.component('page-footer', require('./components/PageFooter.vue').default);


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')