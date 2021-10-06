import Vue from "vue";
import Vuex from "vuex";
import cats from "./cats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cats,
  },
});
