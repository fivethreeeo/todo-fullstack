const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  res.send('Task created')
})

router.get('/', (req, res) => {
  res.send('Task list')
})

router.put('/:id', (req, res) => {
  res.send('Task updated')
})

router.delete('/:id', (req, res) => {
  res.send('Task deleted')
})

module.exports = router
