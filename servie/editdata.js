const fs = require('fs')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

async function loadData () {
  let data = await readFileAsync('./data/data.json').then(data => JSON.parse(data.toString()))
  return data
}

async function getData () {
  return loadData().then(data => data.todoList)
}

async function editData (data) {
  if (data) {
    writeFileAsync('./data/data.json', JSON.stringify(data))
  }
}

async function addData (row) {
  let json = await loadData()
  json.todoList.unshift(row)
  editData(json)
}

async function removeData (ids) {
  let json = await loadData()
  ids.map(id => {
    json.todoList = json.todoList.filter(row => row.tid !== id)
  })
  editData(json)
}

async function activeTodo (ids, activetype) {
  let json = await loadData()
  ids.map(id => {
    console.log(id)
    json.todoList.map(row => {
      if (row.tid === id) {
        row.active = activetype
      }
    })
  })
  editData(json)
}

module.exports = {
  getData,
  addData,
  removeData,
  activeTodo
}
