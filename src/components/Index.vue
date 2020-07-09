<template>
    <div>
        <vue-echartsTime></vue-echartsTime>
        <vue-blacklist></vue-blacklist>
    </div>
</template>
<style lang="less">

</style>
<script>
// 第一步：引入组件
import EchartsTime from '../components/child/echartsTime'
import Blacklist from '../components/child/blacklist'
export default {
  components: {
    'vue-echartsTime': EchartsTime,
    'vue-blacklist': Blacklist
  }
}
</script>
