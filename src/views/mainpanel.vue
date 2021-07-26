<template>
  <div id="mainpanel">
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer v-if="$store.state.showBottom">
        <el-row>
          <el-col :span="8">
            <router-link to="/mainpanel/home" class="el-icon-s-home" active-class="active" tag="i"></router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/mainpanel/list" class="el-icon-s-promotion" active-class="active" tag="i"></router-link>
          </el-col>
          <el-col :span="8">
            <router-link to="/mainpanel/personal" class="el-icon-user-solid" active-class="active" tag="i"></router-link>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
#mainpanel{
  height: 100%;
  .el-container{
    height: calc(100% - 60px);
    .el-footer{
      min-width: 200px;
      position: fixed;
      width: 100%;
      bottom: 0;
      padding: 0;
      line-height: 60px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .14);
      .el-col{
        height: 60px;
        vertical-align: middle;
        // border: 1px solid coral;
        font-size: 30px;
        color: gray;
      }
      .active{
        color: rgba(0, 0, 255, 0.555);
      }
    }
  }
}
</style>
