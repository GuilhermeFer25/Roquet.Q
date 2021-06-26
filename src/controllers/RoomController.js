const Database = require('../db/config')
module.exports = {
  async create(req, res) {
    const db = await Database()
    let roomId
    const pass = req.body.password

    let isRoom = true
    while (isRoom) {
      /* Gera O Numero da sala*/
      for (var i = 0; i < 6; i++) {
        i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
          roomId += Math.floor(Math.random() * 10).toString()
      }
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId)

      if (!isRoom) {
        /*Inseri a sala no banco*/
        await db.run(`INSERT INTO rooms (
        id,
        pass
      )VALUES (
        ${parseInt(roomId)},
        ${pass}
      ) `)
      }

    }

    /*Verificar se esse numero ja existi*/


    await db.close()

    res.redirect(`/room/${roomId}`)

  },
  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room

    const question = await db.all(`SELECT * FROM  questions WHERE room = ${roomId} and read = 0`)
    const questionRead = await db.all(`SELECT * FROM  questions WHERE room = ${roomId} and read = 1`)
    let isNoQuestions

    if (question.length == 0) {
      if (questionRead.length == 0) {
        isNoQuestions = true
      }
    }


    res.render('room', { roomId: roomId, question: question, questionRead: questionRead, isNoQuestions: isNoQuestions })
  },

  enter(req, res) {
    const roomId = req.body.roomId
    res.redirect(`/room/${roomId}`)
  }
}