<template>
  <div id="manage">
    <div class="cover"></div>
    <el-card class="box-card topcard">
      <el-page-header @back="goBack" content="API管理[开发中...]"/>
      <span class="top">
        <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
        </el-select>
        <el-button icon="el-icon-plus" circle @click="showDialog"></el-button>
      </span>
    </el-card>
    <div class="griditms">
      <el-card class="box-card itms" v-for="item in list" :key="item.id">
        <div class="tipround" :style="{'background-color':(item.permission?'#40ff2f':'#0000ff')}"></div>
        <span class="title">{{item.name}}</span>
        <el-switch
          v-model='item.permission'
          inactive-color="#0000ff"
          active-color="#40ff2f" @change="test(item.id)">
        </el-switch><br/>
        <el-link type="info">http://81.70.80.152/epoch/api/third/z/{{item.id}}</el-link>
        <el-divider></el-divider>
        <div class="bc">
          <el-link type="info" class="bcL" @click="fillAll(item.id)">详情</el-link>
          <el-link type="info" class="bcM">|</el-link>
          <el-link type="info" class="bcR" @click="delItem(item.id)">删除</el-link>
        </div>
      </el-card>
    </div>
    <mydialog v-show="dialogVisible">
      <div  v-loading="loading" element-loading-text="提交中...">
        <p v-if="createMode">新建API接口</p>
        <p v-else>修改API接口</p>
        <el-divider/>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="接口名称" :required="true">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="公开">
            <el-switch v-model="form.permission"></el-switch>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-select v-model="form.method">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="访问地址">
            <el-input type="url" v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="类型描述">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="参数描述">
            <el-input type="textarea" v-model="form.param"></el-input>
          </el-form-item>
          <el-form-item label="功能描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <div class="btm">
            <el-button type="primary" @click="create" v-if="createMode">立即创建</el-button>
            <el-button type="primary" @click="change" v-else>确认修改</el-button>
            <el-button type="warning" @click="clearAll">清空</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </el-form>
        <message class="mymsg" v-if="message.show" :mytitle="message.title" :mytype="message.type" @closeMessage="closeMessage"></message>
      </div>
    </mydialog>
  </div>
</template>

<script>
import Vue from 'vue'
import dialog from '../../components/dialog.vue'
import message from '../../components/message.vue'
import axios from 'axios'
Vue.component('mydialog', dialog)
export default {
  components: { message },
  data () {
    return {
      options: [{
        value: 'my',
        label: '我的API'
      }, {
        value: 'star',
        label: '收藏的API'
      }, {
        value: 'all',
        label: '全部的API'
      }],
      value: 'my',
      switchval: 100,
      dialogVisible: false,
      form: {
        id: null,
        master: '',
        name: '',
        permission: true, // x
        method: 'GET', // x
        url: '',
        description: '',
        type: '',
        param: ''
      },
      message: {
        show: false,
        title: 'default',
        type: 'error'
      },
      loading: false,
      createMode: true,
      changeIndex: -1,
      list: [],
      timer: null,
      timers: []
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/epoch/api/account/authored').then(() => {
      next()
    }).catch(err => err)
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('initAPIList')
    next()
  },
  created () {
    axios.post('/epoch/api/account/info').then(res => {
      var data = res.data
      if (data.code === 401) {
        this.$store.commit('authorChange', false)
        this.$store.commit('setNickName', '未登录')
        this.$router.push('/mainpanel/login').catch(err => err)
      } else {
        this.$store.commit('authorChange', true)
        this.$store.commit('setNickName', data.account.nickname)
        this.form.master = this.$store.state.nickname
      }
    }).catch(err => err)
    this.getList()
  },
  methods: {
    debounceForChange (funcName, index, time) {
      return () => {
        if (this.timers[index]) clearTimeout(this.timers[index])
        this.timers[index] = setTimeout(() => {
          this[funcName](index)
        }, time)
      }
    },
    debounceForListAgain (time) {
      return () => {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          alert('更改失败')
          this.getList()
        }, time)
      }
    },
    getList () {
      axios.get('/epoch/api/apis/own').then(res => {
        var data = res.data
        if (data.code === 200) {
          this.list = data.result
          for (const item of this.list) {
            item.permission = item.permission === 1
          }
          this.timers = new Array(this.list.length)
        }
      }).catch(err => err)
    },
    getIndexOfList (id) {
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].id === id) return i
      }
      return -1
    },
    test (id) {
      var index = this.getIndexOfList(id)
      return this.debounceForChange('changeItem', index, 1000)()
    },
    changeItem (index) {
      var OD = this.list[index]
      var ODStr = JSON.stringify(OD)
      var ODAft = JSON.parse(ODStr)
      ODAft.permission = (OD.permission || (OD.permission === 1)) ? 1 : 0
      ODAft.method = ((OD.method === 'POST') || (OD.method === 1)) ? 1 : 0
      axios.post('/epoch/api/apis/change', JSON.stringify(ODAft), {
        headers: {
          'content-type': 'application/json;charset=utf-8'
        }
      }).then(res => {
        var code = res.data.code
        if (code !== 200) {
          this.debounceForListAgain(500)()()
        }
      }).catch(err => err)
    },
    delItem (id) {
      axios.get(`/epoch/api/apis/delete?id=${id}`).then(res => {
        var data = res.data
        if (data.code === 200) {
          alert('删除成功!')
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
              this.list.splice(i, 1)
              break
            }
          }
        } else {
          alert('删除失败!')
        }
      }).catch(err => {
        console.log(err)
        alert('删除失败!')
      })
    },
    goBack () {
      this.$router.push('/mainpanel/personal').catch(err => err)
    },
    showDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
      this.clearAll()
    },
    closeMessage () {
      this.message.show = false
    },
    errChange (open, content, type) {
      this.message.type = type
      if (type === undefined) this.message.type = 'error'
      console.log(this.message.type)
      this.message.title = content
      this.message.show = open
    },
    clearAll () {
      this.form.id = null
      this.form.name = ''
      this.form.permission = true
      this.form.method = 'GET'
      this.form.url = ''
      this.form.description = ''
      this.form.type = ''
      this.form.param = ''
      this.changeIndex = -1
      this.createMode = true
    },
    fillAll (id) {
      var index = this.getIndexOfList(id)
      var itm = this.list[index]
      this.form.id = itm.id
      this.form.name = itm.name
      this.form.permission = (itm.permission === 1) || itm.permission
      this.form.method = ((itm.method === 'POST') || (itm.method === 1)) ? 'POST' : 'GET'
      this.form.url = itm.url
      this.form.description = itm.description
      this.form.type = itm.type
      this.form.param = itm.param
      this.changeIndex = index
      this.createMode = false
      this.dialogVisible = true
    },
    check () {
      if (this.form.nickname === '') {
        this.$router.push('/mainpanel/login').catch(err => err)
        return false
      } else if (this.form.name === '') {
        this.errChange(true, '请填写接口名称')
        return false
      } else {
        var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/]|\.)+$/
        var str = this.form.url.match(reg)
        if (str === null) {
          this.errChange(true, 'url地址不符合格式')
          return false
        }
        return true
      }
    },
    change () {
      if (this.check()) {
        this.loading = true
        var formODStr = JSON.stringify(this.form)
        var newOD = JSON.parse(formODStr)
        newOD.permission = this.form.permission ? 1 : 0
        newOD.method = this.form.method === 'POST' ? 1 : 0
        axios.post('/epoch/api/apis/change', JSON.stringify(newOD), {
          headers: {
            'content-type': 'application/json;charset=utf-8'
          }
        }).then(res => {
          this.loading = false
          setTimeout(() => {
            if (res.data.code === 200) {
              this.errChange(true, '修改成功!', 'success')
              this.getList()
            } else {
              this.errChange(true, '修改异常!')
            }
          }, 500)
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    create () {
      if (this.check()) {
        this.loading = true
        var formODStr = JSON.stringify(this.form)
        var newOD = JSON.parse(formODStr)
        newOD.permission = this.form.permission ? 1 : 0
        newOD.method = this.form.method === 'POST' ? 1 : 0
        axios.post('/epoch/api/apis/add', JSON.stringify(newOD), {
          headers: {
            'content-type': 'application/json;charset=utf-8'
          }
        }).then(res => {
          this.loading = false
          setTimeout(() => {
            if (res.data.result === 1) {
              this.errChange(true, '添加成功!', 'success')
              this.getList()
            } else {
              this.errChange(true, '添加异常!')
            }
          }, 500)
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss">
#manage{
  padding: 10px;
  .top{
    margin-top: 10px;
    display: inline-block;
    border-radius: 10px;
    text-align: center;
    width: 100%;
    .el-select{
      margin-right: 10px;
      .el-input__inner{
        text-align: center;
      }
    }
  }
  .box-card{
    margin: 10px 10px;
  }
  .topcard{
    position: fixed;
    width: calc(100% - 45px);
    height: 114px;
    top: 10px;
    z-index: 2;
  }
  .itms{
    position: relative;
    top: 150px;
    overflow: hidden;
    display: inline-grid;
    .el-card__body{
      padding-bottom: 0px;
    }
    .tipround{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-color: rgb(64, 255, 47);
      box-shadow: 0 0 10px rgb(29, 230, 46);
      border-radius: 8px;
    }
    .title{
      margin-left: 10px;
      font-weight: bold;
    }
    .el-switch{
      float:right
    }
    .el-divider{
      margin: 12px 0 0 0;
    }
    .bc{
      padding: 5px 0 8px 0;
      text-align: center;
      .bcL{
        margin-right: calc(25% - 5px);
      }
      .bcR{
        margin-left: calc(25% - 5px);
      }
    }
  }
  .cover{
    width:100%;height:140px;
    background-color: white;
    margin-top: -10px;
    position: fixed;
    z-index:1;
  }
  #dialog{
    p{
      text-align: center;
    }
    .el-divider{
      margin: 8px 0;
    }
    .el-form-item{
      margin-bottom: 6px;
    }
    .btm{
      width: 100%;
      display: table;
      .el-button{
        display: table-col;
      }
    }
    .mymsg{
      position: absolute;
      top: 100px;
    }
  }
  @media screen and (max-width:500px) {
    .itms{
      width: calc(100% - 26px);
    }
    .mymsg{
      width: calc(100% - 120px);
    }
  }
  @media screen and (min-width:500px) {
    .mymsg{
      width: 480px;
    }
  }
}
</style>
