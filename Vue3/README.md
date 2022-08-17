`npm install -g @vue/cli`

`sudo npm install -g @vue/cli`

- 부가 기능 설치 :  Vetur, HTML CSS Support, Vue 3 Snippets

------

#### vue3 bootstrap

`npm install vue bootstrap bootstrap-vue-3`

```js
// main.js

import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(BootstrapVue3)
```



------

#### vue snippet

```json
"Generate Other Vue Code" : {
		"prefix": "vue-start",
		"body": ["<template>\n\t<div>\n\n\t</div>\n</template>\n<script>\nexport default {\n\tcomponents: {},\n\tdata() {\n\t\treturn {\n\t\t\texample: '',\n\t\t}\n\t},\n\tsetup() {},\n\tcreated() {},\n\tmounted() {},\n\tunmounted() {},\n\tmethods: {}\n}\n</script>"],
		"description": "Generate Basic Vue Code"
			}
```

## 프로젝트 생성

`vue create [프로젝트명]`

`vue add router`

`vue add vuex`

