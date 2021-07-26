<template>
  <div id="dialog" @click.self="close">
    <el-card shadow="always">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss">
#dialog{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: .5);
  z-index: 2;
  overflow: hidden;
  .el-card{
    width: 80%;
    min-height: 200px;
    word-break: break-all;
    margin: 100px auto;
  }
  animation: myfrm 2s 0s 1 ease-out forwards;
}
@keyframes myfrm {
  0%{
    opacity: 0;
  }
  10%{
    opacity: 1;
  }
}
</style>
