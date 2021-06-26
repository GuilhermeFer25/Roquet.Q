const express = require('express');
const router = require('./route')
const server = express()
const path = require('path')


server.set('view engine', 'ejs')

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

server.use(router)

server.set('views', path.join(__dirname, 'views'))



server.listen(3000, () => console.log('Rodando'))