import uuid from 'uuid/v4'
import Axios from 'axios'
import urls from '../urls'
export default {
  state: {
    todoList: []
  },
  getters: {
    All: state => state.todoList,
    Done: state => state.todoList.filter(item => item.active === true),
    Active: state => state.todoList.filter(item => item.active !== true),
    size: state => state.todoList.length
  },
  actions: {
    initTodo ({ commit }) {
      Axios.get(urls.getData).then(data => {
        commit('loadTodo', data.data)
      })
    },
    addTodo ({ commit }, context) {
      if (!context) {
        return
      }
      let row = { tid: uuid(), context, active: false }
      Axios.post(urls.setData, row).then(data => {
        commit('addTodo', row)
      })
    },
    removeTodo ({ commit }, tid) {
      Axios.post(urls.delData, { tids: [tid] }).then(data => {
        commit('removeTodo', tid)
      })
    },
    changeActive ({ commit }, { tid, active }) {
      Axios.post(urls.changeActive, { tids: [tid], active }).then(data => {
        commit('changeActive', { tid, active })
      })
    },
    activeAll ({ commit, state }, active) {
      let tids = state.todoList.map(todo => todo.tid)
      if (!tids.length) return
      Axios.post(urls.changeActive, { tids, active }).then(data => commit('activeAll', active))
    },
    removeDone ({commit, state}) {
      let tids = []

      state.todoList.map(todo => {
        if (todo.active) {
          tids.push(todo.tid)
        }
      })
      if (!tids.length) return
      Axios.post(urls.delData, { tids }).then(data => commit('removeDone'))
    }
  },
  mutations: {
    loadTodo (state, list) {
      state.todoList = list
    },
    addTodo (state, row) {
      state.todoList.unshift(row)
    },
    removeTodo (state, tid) {
      state.todoList = state.todoList.filter(item => item.tid !== tid)
    },
    removeDone (state) {
      state.todoList = state.todoList.filter(item => item.active !== true)
    },
    changeActive (state, id, active) {
      state.todoList.map(item => {
        if (item.tid === id) {
          item.active = active
        }
      })
    },
    activeAll (state, active) {
      state.todoList.map(item => { item.active = active })
    }
  }
}
