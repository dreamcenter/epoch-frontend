<template>
  <el-alert
    :title="title"
    :type="type"
    show-icon :closable="false">
  </el-alert>
</template>

<script>
export default {
  data () {
    return {
      type: 'error',
      title: 'default',
      timeout: 3500
    }
  },
  props: ['mytitle', 'mytype'],
  beforeMount () {
    this.type = this.mytype
    this.title = this.mytitle
    setTimeout(() => {
      this.$emit('closeMessage')
    }, this.timeout)
  }
}
</script>

<style>
.el-alert{
  animation: frms 5s ease-in-out 0s 1 forwards;
}
@keyframes frms {
  0%{
    opacity: 0;
    margin-top: 0;
  }
  10%{
    opacity: 1;
    margin-top: 10px;
  }
  100%{
    opacity: 1;
    margin-top: 10px;
  }
}
</style>
