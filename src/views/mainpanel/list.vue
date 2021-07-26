<template>
  <div id="list">
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="api" name="apis">
      </el-tab-pane>
      <el-tab-pane label="timeline" name="timeline">
      </el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'apis'
    }
  },
  beforeMount () {
    this.activeName = this.$route.name
    this.$router.push('/mainpanel/list/' + this.activeName).catch(err => err)
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push('/mainpanel/list/' + this.activeName).catch(err => err)
    }
  }
}
</script>
