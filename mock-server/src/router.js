const test = require('./controller/test')
const home_search = require('./controller/home_search')
const shop_list = require('./controller/shop_list')
const auth = require('./controller/auth')
const goods_detail = require('./controller/goods_detail')

module.exports = (app) => {
    app.use('/api/test', test)
    app.use('/api/home_search', home_search)
    app.use('/api/shop_list', shop_list)
    app.use('/api/auth', auth)
    app.use('/api/goods_detail', goods_detail)
}