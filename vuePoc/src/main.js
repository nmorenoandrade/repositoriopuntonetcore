// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import queryString from 'querystring'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(queryString)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.http.options.root = process.env.API_URL;
Vue.http.interceptors.push(function (request, next) {
  const authToken = localStorage.getItem('authToken');
  if (authToken !== null) {
    request.headers.set('Authorization', 'Bearer ' + authToken);
  }
  next(response => {
    if ((response.status === 401) && (this !== null)) {
      if (authToken !== null) {
        localStorage.removeItem('authToken');
        this.$store.dispatch('renewToken', authToken);
      }
      this.$store.commit('setIsAuthenticated', false);
      this.$store.state.authErrorMessage = 'Your session has expired.';
    }
  });
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
