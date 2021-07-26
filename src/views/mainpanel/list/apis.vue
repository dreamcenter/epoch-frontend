<template>
  <el-collapse id="apis" v-model="activeName" accordion>
    <el-collapse-item v-for="item in $store.state.apiList" :key="item.id" :title="'['+item.master+'] '+item.name" :name="'b'+item.id">
      <div>
        <el-tag type="danger" size="mini">GET</el-tag>
        <el-tag type="info" size="mini">HOST</el-tag>

        <el-link type="info" v-if="item.master==='root'">{{item.url|urlHost}}</el-link>
        <el-link type="info" v-else>http://81.70.80.152</el-link><br/>

        <el-tag type="success" size="mini" >URI</el-tag>

        <el-link type="success" :href="item.url" target="_blank" v-if="item.master==='root'">{{item.url|urlPath}}</el-link>
        <el-link type="success" :href="'http://81.70.80.152/epoch/api/third/z/'+item.id" target="_blank" v-else>/epoch/api/third/z/{{item.id}}</el-link><br/>
      </div>
      <div>{{item.description}}</div>
      <div><el-tag size="mini">content-type</el-tag>{{item.type}}</div>
      <div><el-tag type="warning" size="mini">params</el-tag>{{item.param}}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'b1'
    }
  },
  beforeMount () {
    // axios.get('/epoch/api/apis/list').then(res => {
    //   this.apilist = res.data
    //   console.log(res.data)
    // }).catch(err => err)
    if (this.$store.state.apiList.length === 0) {
      this.$store.dispatch('initAPIList')
    }
  },
  filters: {
    urlHost (url) {
      // http://81.70.80.152/epoch/api/third/date
      return url.split('/', 3).join('/')
    },
    urlPath (url) {
      var hostLen = url.split('/', 3).join('/').length
      return url.substring(hostLen, url.length)
    }
  }
}
</script>

<style lang="scss">
#apis{
  .el-tag{
    margin-right: 2px;
  }
}
</style>
