<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showChoice = !showChoice">&#xe6eb;</span>
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div class="select-item" v-for="item in selectTypes" :key="item.key" @click="handleSelect(item.key)">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="allocation_ref"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
export default {
  data() {
    return {
      chartInstane: null,
      allData: null,
      showChoice: false,
      choiceType: "map",
      titleFontSize: 0,
    };
  },
  created() {
  },
  mounted() {
    this.initChart();
    this.$http.get('/allocation.json').then(res => {
      this.getData(res.data);
    })
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  computed: {
    selectTypes() {
      if (!this.allData) {
        return [];
      } else {
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType;
        });
      }
    },
    showTitle() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.choiceType].title;
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + "px",
        color: getThemeValue(this.theme).titleColor,
      };
    },
    marginStyle() {
      return {
        marginLeft: this.titleFontSize + "px",
      };
    },
    ...mapGetters({
      theme: "theme",
    }),
  },
  methods: {
    initChart() {
      this.chartInstane = this.$echarts.init(
        this.$refs.allocation_ref,
        this.theme
      );
      const initOption = {
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
      };
      this.chartInstane.setOption(initOption);
    },
    getData(ret) {
      this.allData = ret;
      this.updateChart();
    },
    updateChart() {
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
        "rgba(210,187,225, 0.5)",
        "rgba(75,181,136, 0.5)",
      ];
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
        "rgba(210,187,225, 0)",
        "rgba(75,181,136, 0)",
      ];
      const catArr = [
        "抑郁症",
        "双向情感障碍",
        "自闭症",
        "创伤后应激障碍",
        "广泛性焦虑障碍",
        "强迫症",
        "神经认知障碍",
        "自闭症",
        "神经性厌食症",
        "神经性贪食症",
        "反社会型人格障碍",
        "精神分裂症",
      ];
      const valueArr = this.allData[this.choiceType].data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          smooth: true,
          data: item.data,
          stack: this.choiceType === "map" ? "map" : "",
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              },
              {
                offset: 1,
                color: colorArr2[index],
              },
            ]),
          },
        };
      });
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const dataOption = {
        grid: {
          left: "3%",
          top: "25%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: catArr,
          boundaryGap: false,
        },
        legend: {
          data: legendArr,
          left: "center",
          top: "13%",
        },
        series: seriesArr,
      };
      this.chartInstane.setOption(dataOption, true);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.allocation_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
        },
      };
      this.chartInstane.setOption(adapterOption);
      this.chartInstane.resize();
    },
    handleSelect(currentType) {
      this.choiceType = currentType;
      this.updateChart();
      this.showChoice = false;
    },
  },
  watch: {
    theme() {
      this.chartInstane.dispose();
      this.initChart();
      this.screenAdapter();
      this.updateChart();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  font-weight: bold;

  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }

  .select-con {
    background-color: #fff;
    box-shadow: 0px 0px 10px -5px #000;
    color: #000 !important;
    margin: 10px 0 !important;
    border-radius: 10px;
    user-select: none;

    .select-item {
      height: 30px;
      line-height: 30px;
      user-select: none;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
