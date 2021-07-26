<template>
  <div id="devtime">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activities: [{
        content: '阶段大目标',
        timestamp: '2021-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '当前状态',
        timestamp: '2021-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '已完成的大目标',
        timestamp: '2021-04-03 20:46',
        size: 'large'
      }, {
        content: '已完成的小目标',
        timestamp: '2021-04-03 20:46'
      }]
    }
  }
}
</script>

<style lang="scss">
#devtime{
  margin: 10px;
}
</style>
