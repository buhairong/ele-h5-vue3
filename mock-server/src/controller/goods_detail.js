const getGoodsListData = require('../../data/goods')

module.exports = (req, res, next) => {
  const { goods } = getGoodsListData()
  const data = goods[0]
  setTimeout(() => {
    res.success(data)
  }, 0)
}
