import express from 'express'

const router = express.Router()

router.get(['/'], (req, res) => {
  res.render('index')
})

router.get(['/evergarden'], (req, res) => {
  res.render('admin')
})

export default router
