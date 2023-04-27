import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { Tabbar, TabbarItem } from 'vant'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(Tabbar)
// app.use(TabbarItem)

const rootValue = 10
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = deviceWidth / rootValue + 'px'

app.mount('#app')
