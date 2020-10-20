import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);


// Register a global custom directive called `v-focus`
Vue.directive('focus', {
        // When the bound element is inserted into the DOM...
        inserted: function(el) {
            // Focus the element
            el.focus()
        }
    })
    //NE BRISI !!!!!!!
    //locally register
    // directives: {
    //     focus: {
    // // directive definition
    //       inserted: function (el) {
    //         el.focus()
    //       }
    //     }
    //   }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    // components: { Master },
    render: h => h(App)
}).$mount('#app')