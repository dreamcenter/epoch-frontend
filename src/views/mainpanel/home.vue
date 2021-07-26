<template>
  <div id="home">
    <el-input placeholder="暂未开放搜索" v-model="input" :disabled="true">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in banner" :key="item">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <img class="banner" :src="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>公告</span>
      </div>
      <div v-for="(o,index) in notice" :key="o.title" class="text item">
        <el-link :underline="false" @click="dialogVisible=true,whichnotice=index">{{o.title}}</el-link>
      </div>
      <mydialog v-show="dialogVisible" @closeDialog="closeDialog">
        <span>{{notice[whichnotice].content}}</span>
      </mydialog>
    </el-card>
    <el-card class="box-card">
      <el-progress :percentage="pcent" :stroke-width="26" :format="show" :text-inside="true"></el-progress>
      <el-progress :percentage="17" :stroke-width="26" :format="show2" :text-inside="true" status="success"></el-progress>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import dialog from '../../components/dialog.vue'
import axios from 'axios'

Vue.component('mydialog', dialog)
export default {
  data () {
    return {
      input: '',
      banner: [
        'https://s-sh-2133-epoch.oss.dogecdn.com/banner/banner-1.png',
        'https://s-sh-2133-epoch.oss.dogecdn.com/banner/banner-2.png',
        'https://s-sh-2133-epoch.oss.dogecdn.com/banner/banner-3.png'
      ],
      notice: [
        {
          title: '这是什么网站?',
          content: '由小戴倾情提供给前端工程师调用的部分API。此外能够实现或即将实现功能:1.隐藏api源地址[比如某个免费题库接口不想被用户调查到是来源于谁的,添加到我们仓库后可以返回我们域下的地址，请求参数装入方式完全一致，只有请求地址改变]. 2.跨域处理[让前端初学者可以肆无忌惮的调用接口而不用设置代理或者解决跨域问题]. 3.隐藏部分不便暴露的请求参数(后续支持)[比如某些网站提供的api需要apikey作为参数，而不想暴露这个参数给前端，可以添加到仓库即可隐蔽]'
        },
        {
          title: '为什么要限制人数?',
          content: '穷啊！要是有钱，肯定买个好点的服务器，带宽就会大，那样服务质量肯定会好。但是就目前的带宽来说，还是限制一下比较的稳妥。'
        },
        {
          title: '网站有付费内容吗?',
          content: '目前开发阶段不会拥有付费内容。后续大概率也不会，用爱发电！当然可能会贴出来我的支付宝收款码的，你懂的§(*￣▽￣*)§'
        }
      ],
      whichnotice: 0,
      pcent: 0,
      dialogVisible: false
    }
  },
  created () {
    axios.get('/epoch/api/account/quantity').then(res => {
      this.pcent = res.data.quantity
    }).catch(err => err)
  },
  methods: {
    show (percentage) {
      return '限免注册 [' + 100 * percentage / 100 + '/' + 100 + ']'
    },
    show2 (percentage) {
      return '工作进度 [' + percentage + '%]'
    },
    closeDialog () {
      this.dialogVisible = false
      // console.log(this.dialogVisible)
    }
  }
}
</script>

<style lang="scss">
#home{
  .block{
    background-color: rgba(128, 128, 128, 0.726);
    margin-top: 10px;
  }
  .box-card{
    margin-top: 10px;
  }
  .banner{
    // width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  .el-progress-bar{
    margin-bottom: 10px;
  }
  .el-progress-bar__innerText{
    color: rgb(241, 148, 93);
  }
}
</style>
