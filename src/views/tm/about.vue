<template>
  <el-card class="box-card" id="about">
    <el-page-header @back="goBack" content="关于页面"/>
    <el-divider/>
    <span>
      <pre style="font-size:16px">
        天若有情天亦老
        人间正道是沧桑

        寂しい

        你的支持
        是我最大的动力

        热爱着生活中的点点滴滴
        从不放弃
        尽管前路坎坷
        都可以踏平
      </pre>
        <el-link type="primary" style="font-size:16px;margin-left:20px">QQ : 1981669259</el-link><br/>
        <el-link type="danger" style="font-size:16px;margin-left:20px">WX : I_love_you_dyh</el-link>
    </span>
    <img :src="getPJP('/imgs/pay.jpg')">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      pjn: ''
    }
  },
  beforeMount () {
    this.pjn = this.$store.state.projectName
  },
  methods: {
    goBack () {
      this.$router.push('/mainpanel/personal').catch(err => err)
    },
    getPJP (target) {
      console.log(target)
      return '/' + this.pjn + target
    }
  }
}
</script>

<style lang="scss">
#about{
  margin: 10px;
  img{
    width: 80%;
    display: block;
    margin: 0 auto;
  }
}
</style>
