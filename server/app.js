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

import index from './routes/index'

const RedisStore = connectRedis(session)
const app = express()

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

module.exports = app
