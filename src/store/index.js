import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userLogin : {},
    eventList :{},
  },
  getters: {
    getEventList(state){
      return state.eventList;
    }
  },
  mutations: {
      SET_AUTH(state, authModel){
        state.userLogin = authModel
      },
      SET_EVENT_LIST(state, eventList){
        state.eventList = eventList
      },
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState()]
})
