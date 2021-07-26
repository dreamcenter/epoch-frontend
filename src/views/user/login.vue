<template>
  <div id="login">
    <el-link :underline="false" @click="back">&lt;返回</el-link>
    <message class="message" :mytitle="err.content" :mytype="err.type" v-if="err.show" @closeMessage="messageClose"></message>
    <el-card shadow="always">
      <h1>登录</h1>
      <el-divider></el-divider>
      <el-form label-position="right" label-width="80px" :model="account">
        <el-form-item label="账户" label-width="50px">
          <el-input v-model="account.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="50px">
          <el-input type="password" v-model="account.password"></el-input>
        </el-form-item>
        <el-checkbox v-model="account.checked">7天免登录</el-checkbox>
        <el-link type="primary" @click="toRegister">没有账号?前往注册</el-link>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import message from '../../components/message.vue'
import axios from 'axios'
Vue.component('message', message)
export default {
  data () {
    return {
      err: {
        show: false,
        content: '',
        type: 'error'
      },
      account: {
        nickname: '',
        password: '',
        checked: false
      }
    }
  },
  mounted () {
    this.$store.commit('setBottom', false)
  },
  beforeDestroy () {
    this.$store.commit('setBottom', true)
  },
  methods: {
    login () {
      var acc = this.account
      if (acc.nickname.trim() === '' || acc.password.trim() === '') this.errChange(true, '账户和密码不能为空')
      else {
        var newODStr = JSON.stringify(acc)
        var newOD = JSON.parse(newODStr)
        newOD.password = this.$md5(newOD.password)
        axios.post('/epoch/api/account/check', JSON.stringify(newOD), {
          headers: {
            'Content-Type': 'application/json;charset=utf8'
          }
        }).then(res => {
          switch (res.data.data) {
            case -1:
              this.errChange(true, '用户不存在')
              break
            case 0:
              this.errChange(true, '密码错误')
              break
            case 1:
              this.errChange(true, '登录成功!即将跳转', 'success')
              var expire = '0'
              if (this.account.checked) expire = 7
              this.$cookie.set('token', res.data.token, expire)
              // this.$store.commit('authorChange', true)
              setTimeout(() => {
                this.back()
              }, 3000)
              break
          }
        }).catch(err => err)
      }
    },
    back () {
      this.$router.push('/mainpanel/personal')
    },
    toRegister () {
      this.$router.push('/mainpanel/register')
    },
    errChange (open, content, type) {
      this.err.type = type
      if (type === undefined) this.err.type = 'error'
      this.err.content = content
      this.err.show = open
    },
    messageClose () {
      this.errChange(false)
    }
  }
}
</script>

<style lang="scss">
#login{
  .el-card{
    margin-top: 100px;
  }
  h1{
    text-align: center;
    font-size: 20px Extra large;
  }
  .el-form{
    .el-checkbox{
      margin-left: 20px;
      .el-checkbox__label{
        font-size: 14px;
      }
    }
    .el-link{
      float: right;
      right: 20px;
    }
    .el-button{
      width: 80%;
      display: block;
      margin: 10px auto;
    }
  }
  .message{
    position: absolute;
    width: 90%;
  }
}
</style>
