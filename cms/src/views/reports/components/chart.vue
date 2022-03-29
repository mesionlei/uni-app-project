<template>
  <div class="main">
    <div>
      <span>本周卖出货物数量</span>
      <div id="zxt"></div>
    </div>
    <div>
      <span>各分类所占比例</span>
      <div id="ybt"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue-demi'

onMounted(() => {
  getzxtdata()
  getybtdata()
})
const getzxtdata = () => {
  //   console.log('111')
  var chartDom = document.getElementById('zxt')
  var myChart = echarts.init(chartDom)
  var option

  option = {
    xAxis: {
      type: 'category',
      data: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }

  option && myChart.setOption(option)
}
const getybtdata = () => {
  var chartDom = document.getElementById('ybt')
  var myChart = echarts.init(chartDom)
  var option

  option = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: '瓜果蔬菜' },
          { value: 38, name: '药材' },
          { value: 32, name: '毛茶' },
          { value: 30, name: '食用菌' },
          { value: 28, name: '粮油作物' },
          { value: 26, name: '花卉' },
          { value: 22, name: '水产品' },
          { value: 18, name: '家禽牲畜' }
        ]
      }
    ]
  }

  option && myChart.setOption(option)
}
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  div {
    flex: 1;
    height: 550px;
  }
  #zxt {
    height: 600px;
  }
}
</style>
