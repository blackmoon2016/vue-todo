<template>
  <div id="todo">
    <section class="todoapp">
      <top />
      <todolist :todos=todos />
      <footer class="footer" v-if="size >0">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count">还剩 <strong>{{size}}</strong></span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a :class="{selected:active === 'All'}" @click="Active('All')">全部</a>
          </li>
          <li>
            <a :class="{selected:active === 'Active'}" @click="Active('Active')">进行</a>
          </li>
          <li>
            <a :class="{selected:active === 'Done'}" @click="Active('Done')">完成</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clearDone">清空完成</button>
      </footer>
    </section>
    <bottom />
    <div class="cover" />
  </div>
</template>

<script>
import bottom from './components/bottom'
import todolist from './components/todolist'
import top from './components/top'
import { mapActions } from 'vuex'

export default {
  name: 'todos',
  components: {
    top,
    todolist,
    bottom
  },
  created () {
    this.$store.dispatch('initTodo')
  },
  data () {
    return {
      active: 'All'
    }
  },
  computed: {
    todos () {
      return this.$store.getters[this.active]
    },
    size () {
      return this.$store.getters.size
    }
  },
  methods: {
    ...mapActions({clearDone: 'removeDone'}),
    Active (active) {
      this.active = active
    }
  }
}
</script>

<style src="../assets/css/base.css"></style>
<style src="../assets/css/index.css"></style>
<style>
html,
body {
  height: 100%;
  position: relative;
}
body {
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
<style scoped>
#todo {
  padding-top: 16%;
  width: 100%;
}
.todoapp {
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
}
.hide:before {
  display: none;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.5;
  z-index: -99;
}
</style>
