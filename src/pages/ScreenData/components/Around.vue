<!-- 地区销售排行 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="around_ref"></div>
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
      startValue: 0,
      endValue: 9,
      timerId: null,
    };
  },
  mounted() {
    this.initChart();

    this.$http.get('/around.json').then(res => {
      this.getData(res.data);
    })
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(
        this.$refs.around_ref,
        this.theme
      );
      const initOption = {
        title: {
          text: "各地抑郁症统计",
          left: 20,
          top: 0,
          subtext: "注：数据来自近期权威论文或官方网站资源",
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
        },
        grid: {
          top: "40%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
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
        return b.value - a.value;
      });
      console.log(this.allData);
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const colorArr = [
        ["#EE6666", "#EE6666AA"],
        ["#FAC858", "#FAC858AA"],
        ["#A96EE5", "#A96EE5AA"],
        ["#73C0DE", "#73C0DEAA"],
        ["#91CC75", "#91CC75AA"],
      ];

      const provinceArr = this.allData.map((item) => {
        return item.name;
      });

      const valueArr = this.allData.map((item) => {
        return item.value;
      });
      const dataOption = {
        xAxis: {
          data: provinceArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = null;
                if (arg.value > 400) {
                  targetColorArr = colorArr[0];
                } else if (arg.value > 300) {
                  targetColorArr = colorArr[1];
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[2];
                } else if (arg.value > 100) {
                  targetColorArr = colorArr[3];
                } else {
                  targetColorArr = colorArr[4];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0],
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1],
                  },
                ]);
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.around_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 2000);
    },
  },
  computed: {
    ...mapGetters({
      theme: "theme",
    }),
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

<style lang='less' scoped></style>
