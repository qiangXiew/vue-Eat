'use strict'
const path = require('path')
const golb = require('glob')
const entry_list = golb.sync("src/pages/*/main.js")
let entrys = {}
entry_list.forEach((e, index) => {
  entrys[`${e.split('/', 3)[2]}`] = path.resolve(__dirname, `../${e}`)  
})
// console.log(entrys)

module.exports = entrys