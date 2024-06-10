<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="identity_ref"></div>
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
      currentPage: 1,
      totalPage: 0,
      timerId: null,
    };
  },
  mounted() {
    this.initChart();

    this.$http.get('/identity.json').then(res => {
      this.getData(res.data);
    })
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    clearInterval(this.timerId);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.identity_ref, this.theme);

      const initOption = {
        title: {
          text: "不同身份抑郁风险检出率",
          left: 20,
          top: 0,
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
          subtext: "注：数据来自心理健康蓝皮书等权威资料",
        },
        grid: {
          top: "25%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            z: 0,
          },
          formatter: (params) => {
            return `<span style='margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${params[0].color.colorStops[0].color};'></span>${params[0].name}: ${params[0].value}%`;
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: getThemeValue(this.theme).titleColor,
              },
            },

            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  formatter: "{c}%", //百分比显示
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#5052EE",
                  },

                  {
                    offset: 1,
                    color: "#AB6EE5",
                  },
                ]),
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);

      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },

    getData(ret) {
      this.allData = ret;
      this.allData.sort((a, b) => {
        return a.value - b.value;
      });
      this.totalPage =
        this.allData.length % 4 === 0
          ? this.allData.length / 4
          : this.allData.length / 4 + 1;
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const start = (this.currentPage - 1) * 4;
      const end = this.currentPage * 4;
      const showData = this.allData.slice(start, end);
      const identityNames = showData.map((item) => {
        return item.name;
      });
      const identityValues = showData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: identityNames,
        },
        series: [
          {
            data: identityValues,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 3000);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.identity_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
  computed: {
    ...mapGetters({
      theme: "theme",
    }),
  },
  watch: {
    theme() {
      this.chartInstance.dispose();
      this.initChart();
      this.screenAdapter();
      this.updateChart();
    },
  },
};
</script>

<style lang="less" scoped></style>
