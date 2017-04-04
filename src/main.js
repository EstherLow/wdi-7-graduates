// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../static/semantic.min.css'
import App from './App2'
import Search from './components/search'
import Alumnis from './components/alumnis'




Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus
    }
});


const bus = new Vue({})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  data: { bus: bus}
})
