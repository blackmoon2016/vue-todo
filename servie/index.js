const express = require('express')
const app = express()
const todo = require('./editdata')
const bodyParser = require('body-parser')

let jsonParser = bodyParser.json()
bodyParser.urlencoded({ extended: false })

app.get('/getTodo', async (req, res) => {
  res.json(await todo.getData())
})

app.post('/setTodo', jsonParser, async (req, res) => {
  todo.addData(req.body)
  res.json({code: 'ok'})
})

app.post('/delTodo', jsonParser, async (req, res) => {
  todo.removeData(req.body.tids)
  res.json({code: 'ok'})
})

app.post('/changeActive', jsonParser, async (req, res) => {
  todo.activeTodo(req.body.tids, req.body.active)
  res.send({code: 'ok'})
})

app.listen(4200, () => {
  console.log('server is start at localhost:4200 ...')
})
