<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <!-- 动态渲染三级分类的列表数据 -->
        <view class="cate-lv3-list">
          <!-- 三级分类 Item 项 -->
          <view class="cate-lv3-item" v-for="(item3, i3) in cateLevel2" :key="i3">
            <!-- 图片 -->
            <navigator
              :url="'/subpkg/goods_detail/goods_detail?goods_icon=' + item3.cat_icon+'&goods_name='+item3.cat_name+'&goods_price='+item3.cat_price">
              <image :src="item3.cat_icon"></image>
            </navigator>
            <!-- 文本 -->
            <text>{{item3.cat_name}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        // 分类数据列表
        cateList: [],
        // 当前选中项的索引，默认让第一项被选中
        active: 0,
        // 二级分类列表
        cateLevel2: []
      }
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
      // 调用获取分类列表数据的方法
      this.getCateList()
    },
    methods: {
      async getCateList() {
        // 发起请求
        const res = await uni.$http.get('/cate/categories')
        // 判断是否获取失败
        if (res.statusCode !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.data.message
        // console.log(res.data.message[0])
        // 为二级分类赋值
        this.cateLevel2 = res.data.message[0].children
      },
      // 选中项改变的事件处理函数
      activeChanged(i) {
        this.active = i
        // 为二级分类列表重新赋值
        this.cateLevel2 = this.cateList[i].children
      },
      // 跳转到分包中的搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix]
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
