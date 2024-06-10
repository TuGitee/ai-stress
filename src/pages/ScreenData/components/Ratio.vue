<!-- 热销商品图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="ratio_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
    <span class="cat-name" :style="comStyle">{{ catName }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0,
      titleFontSize: 0,
    };
  },
  computed: {
    catName() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.currentIndex].name;
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + "px",
        color: getThemeValue(this.theme).titleColor,
      };
    },
    ...mapGetters({
      theme: "theme",
    }),
  },
  mounted() {
    this.initChart();

    this.$http.get('/ratio.json').then(res => {
      this.getData(res.data);
    })
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.ratio_ref, this.theme);
      const initOption = {
        title: {
          text: "心理疾病比例与年龄分布",
          left: 20,
          top: 20,
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
        },

        legend: {
          top: "18%",
          icon: "circle",
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
        },
        tooltip: {
          show: true,
          formatter: (arg) => {
            const thirdCategory = arg.data.children;
            let retStr = "";
            retStr += `<span style='margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${arg.color};'></span>${arg.name}<br/>`;
            thirdCategory.forEach((item) => {
              retStr += `
              ${item.name} : ${item.value}%
              <br/>
              `;
            });
            return retStr;
          },
        },
        series: [
          {
            type: "pie",
            label: {
              fontSize: 14,
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                show: true,
              },
            },
          },
          {
            type: "pie",
            label: {
              fontSize: 14,
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                show: true,
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getData(ret) {
      this.allData = ret;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      const ageData = ["<=19", "20~29", "30~39", ">=40"];
      const legendData = [
        ...this.allData[this.currentIndex].children.map((item) => item.name),
        ...ageData,
      ];
      const obj = {};
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          item.children.forEach((_item) => {
            if (!obj[_item.name]) {
              obj[_item.name] = {
                name: _item.name,
                value: Number(_item.value),
                children: [
                  {
                    name: item.name,
                    value:
                      item.children[
                        ageData.findIndex((age) => age == _item.name)
                      ].value,
                  },
                ],
              };
            } else {
              obj[_item.name].value += Number(_item.value);
              obj[_item.name].children.push({
                name: item.name,
                value:
                  item.children[ageData.findIndex((age) => age == _item.name)]
                    .value,
              });
            }
          });
          return {
            name: item.name,
            value: item.value,
            children: item.children,
          };
        }
      );
      for (const key in obj) {
        let sum = 0;
        obj[key].children.forEach((item) => {
          sum += parseInt(item.value);
        });
        obj[key].children.forEach((item) => {
          item.value = ((item.value / sum) * 100).toFixed(2);
        });
      }
      const dataOption = {
        legend: {
          data: legendData,
        },
        series: [
          {
            data: seriesData,
          },
          {
            data: Object.values(obj),
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.ratio_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
        },
        series: [
          {
            radius: [this.titleFontSize * 0, this.titleFontSize * 3.5],
            center: ["50%", "65%"],
          },
          {
            radius: [this.titleFontSize * 4.5, this.titleFontSize * 6.5],
            center: ["50%", "65%"],
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    toLeft() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1;
      }
      this.updateChart();
    },
    toRight() {
      this.currentIndex++;
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0;
      }
      this.updateChart();
    },
  },
  watch: {
    theme() {
      console.log("主题切换了");
      this.chartInstance.dispose();
      this.initChart();
      this.screenAdapter();
      this.updateChart();
    },
  },
};
</script>

<style lang='less' scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}

.arr-right {
  position: absolute;
  right: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}

.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
