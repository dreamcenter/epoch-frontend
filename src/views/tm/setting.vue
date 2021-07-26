<template>
  <el-card class="box-card" id="setting">
    <el-page-header @back="goBack" content="设置页面"/>
    <div class="myavatar">
      <el-image :src="'http://81.70.80.152/data/epoch/avatar/'+account.avatar">
      <div slot="error" class="image-slot">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
      </div>
    </el-image>
    </div>
    <el-link type="primary" @click="show=true">更改头像</el-link>
    <br/><br/>
    <!-- <p>用户可被发现?</p>
    <el-switch
      v-model="account.visible"
      active-text="公开"
      inactive-text="隐藏">
    </el-switch> -->
    <!-- <br/><br/>
    <p>
      <label>邮箱:</label>
      <el-link type="info">{{account.mail}}</el-link>
      <el-link type="primary">修改</el-link>
    </p> -->
    <mydialog v-if="show">
      <div class="dialog">
        <div class="preview">
          <img :src="image">
        </div>
        <input type="file" ref="file" style="display:none" @change="toLeft"/>
        <el-button class="choose" type="primary" @click="choose">选择<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button class="upload" type="primary" @click="upload">上传<i class="el-icon-check el-icon--right"></i></el-button>
        <el-button class="exit" @click="exit">取消</el-button>
     </div>
    </mydialog>
  </el-card>
</template>

<script>
import axios from 'axios'
import mydialog from '../../components/dialog.vue'
export default {
  data () {
    return {
      account: {},
      show: false,
      image: ''
    }
  },
  components: {
    mydialog
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      axios.post('/epoch/api/account/info').then(res => {
        this.account = res.data.account
      }).catch(err => err)
    },
    goBack () {
      this.$router.push('/mainpanel/personal').catch(err => err)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    choose () {
      this.$refs.file.click()
    },
    toLeft () {
      var reader = new FileReader()
      reader.readAsDataURL(this.$refs.file.files[0])
      reader.onloadend = (e) => {
        this.image = e.target.result
      }
    },
    upload () {
      var formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      axios.post('/epoch/api/account/avatar', formData, {
        'content-type': 'multipart/form-data'
      }).then(res => {
        if (res.data.code === 200) {
          this.init()
          alert('更改成功!')
          this.show = false
        } else {
          alert('更改失败!')
        }
      }).catch(err => err)
    },
    exit () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
#setting{
  height: 100%;
  .myavatar{
    overflow: hidden;
    width: 100px;
    height: 100px;
    .el-image{
      width: 100%;
    }
    img{
      width: 100%;
    }
  }
  .dialog{
    .preview{
      width: 150px;
      height: 150px;
      border: 2px solid rgba(128, 128, 128, 0.609);
      float: left;
      img{
        width: 100%;
      }
    }
    .choose{
      margin-left: 10px;
      margin-top: 10px;
    }
    .upload{
      margin-top: 10px;
    }
    .exit{
      margin-top: 10px;
      width: 90px;
    }
  }
}
</style>
