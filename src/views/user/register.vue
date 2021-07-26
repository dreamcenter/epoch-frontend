<template>
  <div id="register">
    <el-link :underline="false" @click="back">&lt;返回</el-link>
    <message class="message" :mytitle="err.content" :mytype="err.type" v-if="err.show" @closeMessage="messageClose"></message>
    <el-card class="reg" shadow="always">
      <h1>注册</h1>
      <el-divider></el-divider>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input class="kaptcha" v-model="ruleForm.kaptcha"></el-input>
            <img src="http://81.70.80.152/epoch/api/kaptcha" :key="kapindex" @click="addIndex">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('昵称不能为空!'))
      } else {
        axios.get(`/epoch/api/account/has?nickname=${value}`).then(res => {
          if (res.data.data === 1) {
            callback(new Error('昵称太抢手啦!'))
          } else if (res.data.data === -1) {
            callback(new Error('昵称不能为空!'))
          } else {
            callback()
          }
        }).catch(err => err)
      }
    }
    return {
      ruleForm: {
        nickname: '',
        password: '',
        checkPass: '',
        kaptcha: ''
      },
      kapindex: 1,
      err: {
        show: false,
        content: '',
        type: 'error'
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$store.commit('setBottom', false)
  },
  methods: {
    back () {
      this.$router.push('/mainpanel/login')
    },
    addIndex () {
      this.kapindex++
    },
    resetForm () {
      this.ruleForm.name = ''
      this.ruleForm.pass = ''
      this.ruleForm.checkPass = ''
      this.ruleForm.kaptcha = ''
      this.addIndex()
    },
    errChange (open, content, type) {
      this.err.type = type
      if (type === undefined) this.err.type = 'error'
      this.err.content = content
      this.err.show = open
    },
    messageClose () {
      this.errChange(false)
    },
    submit () {
      var newODStr = JSON.stringify(this.ruleForm)
      var newOD = JSON.parse(newODStr)
      newOD.password = this.$md5(newOD.password)
      if (newOD.nickname === '') this.errChange(true, '昵称不能为空')
      else if (this.ruleForm.password === '') this.errChange(true, '密码不能为空')
      else if (this.ruleForm.checkPass === '') this.errChange(true, '确认密码不能为空')
      else if (this.ruleForm.checkPass !== this.ruleForm.password) {
        this.errChange(true, '两次输入密码不一致')
      } else if (newOD.kaptcha === '') this.errChange(true, '验证码不能为空不能为空')
      else {
        axios.post('/epoch/api/account/add', JSON.stringify(newOD), {
          headers: {
            'Content-Type': 'application/json;charset=utf8'
          }
        }).then(res => {
          var result = res.data.data
          console.log(result)
          switch (result) {
            case -1:
              this.errChange(true, '错误的请求头')
              break
            case 0:
              this.errChange(true, '注册失败')
              break
            case 1:
              this.errChange(true, '注册成功,3s后跳转登录', 'success')
              setTimeout(() => {
                this.back()
              }, 3000)
              break
            case 2:
              this.errChange(true, '验证码错误')
              break
          }
          this.addIndex()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss">
#register{
  .reg{
    margin-top: 50px;
    .kaptcha{
      width: 40%;
    }
    img{
      display: inline-block;
      width: 55%;
      height: 40px;
      overflow: hidden;
      margin-left: 5px;
      vertical-align: middle;
    }
  }
  .message{
    position: absolute;
    width: 90%;
  }
}
</style>
