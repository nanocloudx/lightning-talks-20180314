import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import {} from 'dotenv/config'
import helmet from 'helmet'
import compression from 'compression'
import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import csrf from 'csurf'
import socketIO from 'socket.io'

import index from './routes/index'

const RedisStore = connectRedis(session)
const app = express()

const io = socketIO()
app.io = io

// view engine setup
const dirname = __dirname.match(/server/) ? path.join(__dirname, '..', 'dist') : __dirname
app.set('views', path.join(dirname, 'views'))
app.set('view engine', 'hjs')
app.enable('trust proxy')
app.disable('x-powered-by')
app.use(helmet())
app.use(compression())
app.use(favicon(path.join(dirname, 'public', 'favicon.png')))
app.use(express.static(path.join(dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

// --------------------------------------------------
// Session
// --------------------------------------------------
const sessionRedisClient = new Redis(process.env.REDIS_URL)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: sessionRedisClient,
    prefix: 'session::',
    ttl: 60 * 60 * 24 * 3 // 3日間アクセスがない場合は Redis からセッション削除
  })
}))

// --------------------------------------------------
// Routing
// --------------------------------------------------
app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

// --------------------------------------------------
// Socket
// --------------------------------------------------

let connectionNum = 0
let slideId = 0

let sticker = [0, 0, 0, 0]


io.on('connection', (socket) => {
  // 接続が開始したらログ＋現在のスライドを伝える
  console.log('serverInfo::connected')
  socket.emit('initialize', {slideId})
  connectionNum++

  // 接続が終了したらログ
  socket.on('disconnect', () => {
    console.log('serverInfo::disconnected')
    connectionNum--
  })

  // [管理者]接続数確認
  socket.on('connectionNum', () => {
    socket.emit('connectionNum', {connectionNum})
    socket.broadcast.emit('connectionNum', {connectionNum})
  })

  // [管理者]次のスライド
  socket.on('adminNextSlide', () => {
    if (slideId >= 42) {
      return
    }
    slideId++
    socket.emit('changeSlide', {slideId})
    socket.broadcast.emit('changeSlide', {slideId})
  })

  // [管理者]前のスライド
  socket.on('adminPrevSlide', () => {
    if (slideId <= 0) {
      return
    }
    slideId--
    socket.emit('changeSlide', {slideId})
    socket.broadcast.emit('changeSlide', {slideId})
  })

  // ステッカー
  socket.on('sticker', (stickerId) => {
    sticker[stickerId]++
    socket.emit('sticker', {sticker})
    socket.broadcast.emit('sticker', {sticker})
  })
})

module.exports = app
