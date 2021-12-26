import Vue from "vue";
import mixpanel from 'mixpanel-browser'

const debug = process.env.NODE_ENV === 'development' // Make sure to be in debug when in dev
mixpanel.init('aa0512a2a1c9f273f96b3216b3e3f63b', { debug })

Vue.prototype.$mixpanel = mixpanel;

export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('mixpanel', mixpanel)
  // For Nuxt <= 2.12, also add 👇
  context.$mixpanel = mixpanel
}