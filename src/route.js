const express = require('express');
const router = express.Router()
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

router.get('/', (req, res) => { res.render('index', { page: 'enter-room' }) })
router.get('/createpass', (req, res) => { res.render('index', { page: 'createpass' }) })
router.post('/enterroom', RoomController.enter)

router.get('/room/:room', RoomController.open)
router.post('/create-room', RoomController.create)

//formato que o formulario de dentro da modal passa a informaçcao
router.post('/question/create/:room', QuestionController.create)
router.post('/question/:room/:question/:action', QuestionController.index)


module.exports = router