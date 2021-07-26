<template>
  <div id="cover" :style='{"backgroundImage":"url("+getPJP("/imgs/bk.jpeg")+")"}'>
    <mytitle></mytitle>
    <el-button class="next" type="primary" plain @click="jump">NEXT</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import title from '../components/title.vue'

Vue.component('mytitle', title)
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
    getPJP (target) {
      // console.log(target)
      return '/' + this.pjn + target
    },
    jump () {
      this.$router.push('/mainpanel')
    }
  }
}
</script>

<style lang="scss">
#cover{
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: scroll;
  .next{
    display: block;
    margin: 10px auto;
    background-color: rgba($color: #000000, $alpha: 0.0);
  }
}
</style>
