<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div class="screen-header-title">
        <hr />
        <span class="title">心理健康监测大屏</span>
        <hr />
      </div>

      <div class="title-right">
        <el-switch
          style="display: block"
          v-model="isDay"
          active-color="#000"
          inactive-color="#fff"
          active-icon-class="el-icon-moon-night"
          inactive-icon-class="el-icon-sunrise"
          @change="handleChangeTheme"
        >
        </el-switch>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div
          id="left-top"
          :class="[fullScreenStatus.allocation ? 'fullscreen' : '']"
        >
          <!-- 销量趋势图表 -->
          <Allocation ref="allocation"></Allocation>
        </div>
        <div
          id="left-bottom"
          :class="[fullScreenStatus.identity ? 'fullscreen' : '']"
        >
          <!-- 商家销售金额图表 -->
          <Identity ref="identity"></Identity>
        </div>
      </section>
      <section class="screen-middle">
        <div
          id="middle-top"
          :class="[fullScreenStatus.map ? 'fullscreen' : '']"
        >
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
        </div>
        <div
          id="middle-bottom"
          :class="[fullScreenStatus.around ? 'fullscreen' : '']"
        >
          <!-- 地区销量排行图表 -->
          <Around ref="around"></Around>
        </div>
      </section>
      <section class="screen-right">
        <div
          id="right-top"
          :class="[fullScreenStatus.ratio ? 'fullscreen' : '']"
        >
          <!-- 热销商品占比图表 -->
          <Ratio ref="ratio"></Ratio>
        </div>
        <div
          id="right-bottom"
          :class="[fullScreenStatus.scale ? 'fullscreen' : '']"
        >
          <!-- 库存销量分析图表 -->
          <Scale ref="scale"></Scale>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Ratio from "./components/Ratio.vue";
import Map from "./components/Map.vue";
import Around from "./components/Around.vue";
import Identity from "./components/Identity.vue";
import Scale from "./components/Scale.vue";
import Allocation from "./components/Allocation.vue";
import { mapGetters } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
export default {
  created() {
    setInterval(() => {
      this.rawTime = new Date();
    }, 1000);
  },
  data() {
    return {
      rawTime: new Date(),
      fullScreenStatus: {
        allocation: false,
        identity: false,
        map: false,
        around: false,
        ratio: false,
        scale: false,
      },
      isDay: false
    };
  },
  methods: {
    handleChangeTheme() {
      this.$store.commit("changeTheme");
    },
  },
  components: {
    Ratio,
    Map,
    Around,
    Identity,
    Scale,
    Allocation,
  },
  computed: {
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor,
      };
    },
    ...mapGetters({
      theme: "theme",
    }),
  },
};
</script>
<style lang="less" scoped>
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

.screen-container {
  width: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;

  @media screen and (min-width: 948px) {
    height: calc(100vh - 60px) !important;
    overflow: hidden;
  }
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 60%;
    margin: auto;
    gap: 40px;
    hr {
      flex: 1;
      color: @color;
    }
  }

  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;

  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      position: relative;
    }
  }

  @media screen and (max-width: 946.4px) {
    flex-direction: column;

    .screen-right,
    .screen-left,
    .screen-middle {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .screen-left {
      height: 100vh;
      #left-top {
        flex: 2;
      }
      #left-bottom {
        flex: 1;
      }
    }
    .screen-middle {
      margin-top: 30px;
      height: 80vh;
      #middle-top {
        flex: 3;
      }
      #middle-bottom {
        flex: 2;
      }
    }
    .screen-right {
      height: 80vh;
      #right-top {
        flex: 1.5;
      }
      #right-bottom {
        flex: 1;
      }
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
