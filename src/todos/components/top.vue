<template>
    <header class="header">
        <h1><img src="../../assets/logo.png">ue Todos...</h1>
        <input class="new-todo" placeholder="接下来你要做什么？" v-model.trim="context" autofocus @keydown.enter="addTodo">
    </header>
</template>

<script>
export default {
  data () {
    return {
      context: ''
    }
  },
  methods: {
    addTodo () {
      this.$store.dispatch('addTodo', this.context)
      this.context = ''
    }
  }
}
</script>

<style scoped>
h1{
    font-size: 80px;
    top:-140px;
}
img{
    width:56px;
    margin-right:-5px;
}
</style>
