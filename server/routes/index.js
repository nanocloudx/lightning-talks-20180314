import express from 'express'

const router = express.Router()

// router.get('/api/events', fetchEventList)

router.get(['/', '/about'], (req, res) => {
  res.render('index', {
    user: req.user,
    token: req.csrfToken()
  })
})

export default router
