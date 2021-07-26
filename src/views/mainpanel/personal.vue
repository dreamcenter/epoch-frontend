<template>
  <div id="personal" v-loading="load" element-loading-text="拼命加载中">
    <el-card class="upper" shadow="always">
         <div style="margin:90px auto 10px auto;width:80px;height:80px;background-color:gray;overflow:hidden;border-radius:40px">
           <img :src="avatarPath" width="80px">
         </div>
         <p style="text-align:center;color:white">{{$store.state.nickname}}</p>
    </el-card>
    <el-card class="middle" shadow="always">
      <el-row :gutter="20">
        <el-col :span="6">
          <i class="el-icon-notebook-1"></i>
        </el-col>
        <el-col :span="6">
          <i class="el-icon-odometer"></i>
        </el-col>
        <el-col :span="6">
          <i class="el-icon-cold-drink"></i>
        </el-col>
        <el-col :span="6">
          <el-badge :value="mailClock" class="item"><i class="el-icon-message" @click="addClock"></i></el-badge>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="bottom box-card">
      <!-- <div v-for="o in 5" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div> -->
      <div class="tm" @click="jump('/manage')">API管理</div>
      <div class="tm" @click="jump('/setting')">设置</div>
      <div class="tm">帮助</div>
      <div class="tm" @click="jump('/about')">关于</div>
    </el-card>
    <el-button type="primary" v-if="!$store.state.authorized" @click="login">前往登录</el-button>
    <el-button type="danger" v-else @click="exit">退出登录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mailClock: 3,
      load: true,
      avatarPath: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      axios.post('/epoch/api/account/info').then(res => {
        var data = res.data
        if (data.code === 401) {
          this.$store.commit('authorChange', false)
          this.$store.commit('setNickName', '未登录')
        } else {
          this.$store.commit('authorChange', true)
          this.$store.commit('setNickName', data.account.nickname)
          if (!(data.account.avatar == null || data.account.avatar === '')) {
            this.avatarPath = 'http://81.70.80.152/data/epoch/avatar/' + data.account.avatar
          }
        }
        this.load = false
      }).catch(err => err)
    },
    addClock () {
      this.mailClock += 5
    },
    dealAvatar () {
      // this.$router.push('/mainpanel/login').catch(err => err)
    },
    exit () {
      this.$cookie.delete('token')
      this.$store.commit('authorChange', false)
      this.$store.commit('setNickName', '未登录')
      alert('退出成功')
      this.$router.push('/mainpanel/login').catch(err => err)
    },
    login () {
      this.$router.push('/mainpanel/login').catch(err => err)
    },
    jump (uri) {
      this.$router.push(uri)
    }
  }
}
</script>

<style lang="scss">
#personal{
  .upper{
    background-color: cornflowerblue;
    margin: 0;
    .el-avatar{
      display: block;
      margin: 100px auto 10px auto;
      font-size: 24px;
      width: 80px;
      height: 80px;
      line-height: 80px;
      .av{
        animation: colorChange 4s linear 0s infinite backwards;
      }
      @keyframes colorChange {
        0%{
          background-color: #C0C4CC;
        }
        50%{
          background-color: #c2c2a6;
        }
        100%{
          background-color: #C0C4CC;
        }
      }
    }
  }
  .middle{
    margin-top: 10px;
    .el-row{
      text-align: center;
    }
  }
  .bottom{
    margin-top: 10px;
  }
  .el-button{
    width: 80%;
    display: block;
    margin: 10px auto;
  }
  i{
    font-size: 25px;
  }
  .tm{
    // border: 1px solid red;
    padding: 5px 5px;
    margin: 2px;
    background-color: rgba(232, 232, 235, 0.767);
  }
  .tm:last-child{
    color: coral;
    font-weight: bold;
  }
}
</style>
