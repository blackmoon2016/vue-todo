<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="active" @change="activeAll(active)">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-if="todos.length >0">
      <li v-for="todo in todos" :key="todo.tid" :class="{completed:todo.active}">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.active" @click="changeActive({tid:todo.tid, active:!todo.active})">
          <label>{{todo.context}}</label>
          <button class="destroy" @click="removeTodo(todo.tid)"></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['todos'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    ...mapActions(['removeTodo', 'activeAll', 'changeActive'])
  }
}
</script>

<style>
.todo-list {
  max-height: 400px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
