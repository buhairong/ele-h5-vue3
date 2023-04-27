const test = require('../../data/test')

module.exports = (req, res, next) => {
  const testData = test()
  testData.desc = '自定义测试'
  res.json(testData)
}
