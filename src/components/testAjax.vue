<template>
  <div class="hello">
    <button @click="upload">add Ajax</button>
    <button @click="remove">del Ajax</button>
  </div>
</template>

<script>
import Axios from 'axios'
import uuid from 'uuid/v4'
export default {
  methods: {
    upload () {
      Axios.post('/api/setTodo', {tid: uuid(), context: 'test', active: false}).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    remove () {
      Axios.post('/api/delTodo', {tids: ['123123123123', '32123123123123']}).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .hello button {
   width:120px;
   height:40px;
   background-color: blanchedalmond;
 }
</style>
