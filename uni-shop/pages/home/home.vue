<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator
          class="swiper-item"
          :url="
            '/subpkg/goods_detail/goods_detail?goods_icon=' +
            item.image_src +
            '&goods_name=' +
            item.cat_name +
            '&goods_price=' +
            item.cat_price
          "
        >
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!--    分类导航区域
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view> -->
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <view class="floor-title">{{ item.product_title }}</view>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <navigator
              :url="
                '/subpkg/goods_detail/goods_detail?goods_icon=' +
                item.image_src +
                '&goods_name=' +
                item.cat_name +
                '&goods_price=' +
                item.cat_price
              "
            >
              <image
                :src="item.product_list[0].image_src"
                :style="{ width: item.product_list[0].image_width + 'rpx' }"
              >
              </image>
            </navigator>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view
              class="right-img-item"
              v-for="(item2, i2) in item.product_list"
              :key="i2"
              :v-if="i2 !== 0"
            >
              <navigator
                :url="
                  '/subpkg/goods_detail/goods_detail?goods_icon=' +
                  item2.image_src +
                  '&goods_name=' +
                  item2.cat_name +
                  '&goods_price=' +
                  item2.cat_price
                "
              >
                <image
                  :src="item2.image_src"
                  :style="{ width: item2.image_width + 'rpx' }"
                ></image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 导入自己封装的 mixin 模块
import badgeMix from "@/mixins/tabbar-badge.js";
export default {
  data() {
    return {
      // 1. 轮播图的数据列表，默认为空数组
      swiperList: [],
      // 1. 分类导航的数据列表
      navList: [],
      // 1. 楼层的数据列表
      floorList: [],
    };
  },
  onLoad() {
    // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
    this.getSwiperList(),
      // 2. 在 onLoad 中调用获取数据的方法
      this.getNavList(),
      // 2. 在 onLoad 中调用获取楼层数据的方法
      this.getFloorList();
  },
  methods: {
    // 3. 获取轮播图数据的方法
    async getSwiperList() {
      // 3.1 发起请求
      const res = await uni.$http.get("/home/swiperdata");
      // console.log(res)
      // 3.2 请求失败
      if (res.statusCode !== 200) {
        return uni.$showMsg();
      }
      // 3.3 请求成功，为 data 中的数据赋值
      this.swiperList = res.data;
    },
    // 3. 在 methods 中定义获取数据的方法
    async getNavList() {
      const res = await uni.$http.get("/home/cate");
      if (res.statusCode !== 200) return uni.$showMsg();
      this.navList = res.data;
    },
    // nav-item 项被点击时候的事件处理函数
    navClickHandler(item) {
      // 判断点击的是哪个 nav
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/cate",
        });
      }
    },
    // 3. 定义获取楼层列表数据的方法
    async getFloorList() {
      const res = await uni.$http.get("/home/floordata");
      if (res.statusCode !== 200) return uni.$showMsg();
      this.floorList = res.data;
      // console.log(res.data[0].product_list[0].image_src)
    },
    gotoSearch() {
      uni.navigateTo({
        url: "/subpkg/search/search",
      });
    },
  },
  // 将 badgeMix 混入到当前的页面中进行使用
  mixins: [badgeMix],
};
</script>

<style lang="scss">
.search-box {
  // 设置定位效果为“吸顶”
  position: sticky;
  // 吸顶的“位置”
  top: 0;
  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}

swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  height: 60rpx;
  display: flex;
  padding-left: 10rpx;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.right-img-box image {
  height: 236rpx;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}

.left-img-box {
  height: 480rpx;
}

.floor-item {
  height: 540rpx;
}
</style>
