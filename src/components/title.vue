<template>
  <div id="mytitle">
    <h1 :style="{'letter-spacing':styles.titleLS+'px','text-indent':styles.titleLS+'px','font-size':styles.titleLS+'px'}">EPOCH</h1>
    <p>{{flatterer}}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
export default {
  data () {
    return {
      styles: {
        titleLS: 50,
        docSize: 0
      },
      flatterer: '', // 舔狗
      key: 'd9b8d7f6cbb6f42b2d3b9501ca21fb06'
    }
  },
  beforeMount () {
    axios.get('/epoch/api/third/rainbow').then(res => {
      var resData = res.data
      switch (resData.code) {
        case 200:
          this.flatterer = resData.newslist[0].content
          break
        case 150:
          this.flatterer = '今天的彩虹已经全部发放完啦!明天再来吧!'
          break
        default:
          this.flatterer = '服务翻车了!'
      }
    }).catch(err => err)
  },
  mounted () {
    this.docSize = document.body.clientWidth
    this.styles.titleLS = document.body.clientWidth / 25
    window.onresize = () => {
      this.docSize = document.body.clientWidth
      this.styles.titleLS = document.body.clientWidth / 25
    }
  }
}
</script>

<style lang="scss">
#mytitle{
  h1{
    // width: px;
    color: white;
    font-weight: 200;
    font-size: 70px;
    // letter-spacing: 50px;
    // text-indent: 50px;
    text-align: center;
    margin-top: 200px;
    padding-bottom: 0;
    // border: 1px solid coral;
  }
  p{
    color: white;
    text-align: center;
    padding: 0 100px 0 100px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
}
</style>
