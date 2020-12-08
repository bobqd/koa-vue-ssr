<template>
  <div>
    <h1>KOA+MYSQL+VUE SSR  服务端渲染架构</h1>
    <h1>{{info}}</h1>
    <input type="text" v-model="info" />
    <div>请求数据结果：{{item.text}}</div>
  </div>
</template>
<script>
import titleMixin from '../mixins/title.js';

export default {
  name: "home",
  mixins: [titleMixin],
  title() {
    return '这是首页'
  },
  asyncData({ store, route }){
    // 触发action代码，会返回 Promise
    return store.dispatch('fetchItem', 'name');
  },
  data(){
    return{
      info: 'try'
    }
  },
  computed: {
    // 从 store 的 state对象中获取item
    item() {
      return this.$store.state.items['name']
    }
  }
}
</script>