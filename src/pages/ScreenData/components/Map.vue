<!-- 商家分布图表 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import { getProvinceMapInfo } from "@/utils/map_utils";
import { getThemeValue } from "@/utils/theme_utils";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {},
    };
  },
  mounted() {
    this.initChart();
    this.$http.get('/map.json').then(res => {
      this.getData(res.data);
    })
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      const ret = await axios.get("/map/china.json");

      this.$echarts.registerMap("china", ret.data);
      const initOption = {
        title: {
          text: "心理疾病患者分布图",
          left: 20,
          top: 0,
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
          subtext: "审图号：GS(2020)4632号",
        },
        color: ["#EE6666", "#FAC858", "#A96EE5", "#73C0DE", "#91CC75"],
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          zoom: 1,
          bottom: "5%",
          itemStyle: {
            areaColor: "#a47aff55",
            borderColor: "#eee",
          },
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
          textStyle: {
            color: getThemeValue(this.theme).titleColor,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            return `<div>${params.name}</div><i>${params.seriesName} </i> : <b style="color: ${params.color}">${params.data.count}<b>`;
          },
        },
        emphasis: {
          label: {
            show: false,
            color: "#fff",
          },
          itemStyle: {
            areaColor: "#a47affcc",
          },
          tooltip: {
            show: true,
          },
        },
        series: [],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("click", async (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name);
        if (!provinceInfo.key) return;
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get(
            provinceInfo.path
          );
          this.mapData[provinceInfo.key] = ret.data;
          this.$echarts.registerMap(provinceInfo.key, ret.data);
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key,
          },
        };
        this.chartInstance.setOption(changeOption);
      });
    },
    getData(ret) {
      this.allData = ret;
      this.updateChart();
    },
    updateChart() {
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      const seriesArr = this.allData.map((item) => {
        return {
          type: "effectScatter",
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
        };
      });
      const dataOption = {
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    revertMap() {
      const revertOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(revertOption);
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

<style lang='less' scoped></style>
