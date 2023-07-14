module.exports = () => {
    return {
        goods: [
            {
              id: 1,
              name: '【果切】红柚+芒果 约 350g 芒果拼拼',
              imgUrl: '/imgs/shop_page/1/goods-1.png',
              sellCount: 587,
              rating: 4.2,
              price: 9.9,
              oldPrice: 22.9,
              tips: '',
              discount: {
                // 百亿补贴
                type: 1,
                limitCount: 1,
              },
              cartCount: 1,
              checked: true,
            },
            {
              id: 2,
              name: '【果切】随机拼 约 250g 阳光果切',
              imgUrl: '/imgs/shop_page/1/goods-2.png',
              sellCount: 345,
              rating: 4.2,
              price: 0.99,
              oldPrice: 16.9,
              tips: '现切鲜果请于2小时内食用',
              discount: {
                // 特价4选1
                type: 2,
                limitCount: 1,
              },
              cartCount: 0,
              checked: false,
            },
            {
              id: 3,
              name: '【果切】哈密瓜 约 250g 阳光果切',
              imgUrl: '/imgs/shop_page/1/goods-3.png',
              sellCount: 345,
              rating: 4.2,
              price: 0.99,
              oldPrice: 16.9,
              tips: '与爆品同享，四选一选一份哦，价格低至 ￥0.99',
              discount: {
                // 特价4选1
                type: 2,
                limitCount: 1,
              },
              cartCount: 0,
              checked: false,
            },
        ],
    }
}
