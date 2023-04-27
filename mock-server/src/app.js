const path = require('path')
const jsonServer = require('json-server')
const router = require('./router')
const db = require('./db')()

const server = jsonServer.create()

const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../public')
})

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  const json = res.json.bind(res)
  res.success = (data) => {
    return json({
      code: 0,
      msg: '请求成功',
      data
    })
  }

  res.fail = (msg, code = -1) => {
    return json({
      code,
      msg
    })
  }
  next()
})

router(server)
const jsonRouter = jsonServer.router(db)
server.use('/api', jsonRouter)

server.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('服务已启动...')
})
