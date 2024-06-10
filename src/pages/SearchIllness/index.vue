<template>
  <div class="search-illness">
    <div class="search-illness-header">
      <div class="search-illness-header-image"></div>
      <div class="search-illness-header-search">
        <div class="search-illness-header-search-input">
          <i class="search-illness-header-search-input-icon"></i>
          <input
            type="text"
            v-model="keyword"
            class="search-illness-header-search-input-key"
            placeholder="请输入疾病名称"
            @keydown.enter="handleSearch"
          />
        </div>

        <button
          @click="handleSearch"
          class="search-illness-header-search-button"
        >
          搜索
        </button>
      </div>

      <div class="search-illness-header-maybe" v-if="maybeList.length">
        <div class="search-illness-header-maybe-title"><b>您可能想搜</b></div>
        <ul class="search-illness-header-maybe-list">
          <li
            class="search-illness-header-maybe-list-item"
            v-for="(item, index) in maybeList"
          >
            <router-link
              :to="{
                name: 'IllnessDetail',
                params: {
                  illnessId: item.id,
                },
              }"
              class="search-illness-header-maybe-list-item-link"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
      </div>
      <hr
        v-if="historyList.length && maybeList.length"
        class="search-illness-header-hr"
      />
      <div class="search-illness-header-history" v-if="historyList.length">
        <div class="search-illness-header-history-title"><b>历史搜索</b></div>
        <ul
          class="search-illness-header-history-list"
          v-if="historyList.length"
        >
          <li
            class="search-illness-header-history-list-item"
            v-for="(item, index) in historyList"
            :key="index"
          >
            <router-link
              :to="{
                name: 'IllnessDetail',
                params: {
                  illnessId: item.id,
                },
              }"
              class="search-illness-header-history-list-item-link"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="search-illness-content" v-if="historyList.length !== 0">
      <div class="search-illness-content-visit">
        <ul class="search-illness-content-visit-list">
          <VisitItem
            v-for="(item, index) in historyList"
            :item="item"
            :index="index"
            :key="item.id"
          ></VisitItem>
        </ul>
        <!-- <button
          class="search-illness-content-visit-clearall"
          @click="clearAll"
        >
          点击清空所有历史记录
        </button> -->
      </div>
    </div>

    <div class="search-illness-chart" ref="searchChart"></div>
  </div>
</template>

<script>
import VisitItem from "@/components/VisitItem";
import { mapGetters } from "vuex";
export default {
  name: "SearchIllness",
  data() {
    return {
      keyword: "",
      maybeList: [],
      historyList:
        (localStorage.getItem("historyList") &&
          JSON.parse(localStorage.getItem("historyList"))) ||
        [],
      isSearch: true,
    };
  },
  computed: {
    ...mapGetters({
      illnessList: "illnessList",
    }),
  },
  components: {
    VisitItem,
  },
  methods: {
    handleSearch() {
      const illnessList = JSON.parse(JSON.stringify(this.illnessList));
      if (this.isSearch) {
        this.isSearch = false;
        setTimeout(() => {
          this.isSearch = true;
        }, 300);
      } else {
        return;
      }
      let illnessId = illnessList.find(
        (item) => item.name === this.keyword
      )?.id;
      illnessId &&
        this.$router.push({
          name: "IllnessDetail",
          params: {
            illnessId,
          },
        });
      const reg = new RegExp(
        `^.*${this.keyword
          .split("")
          .map((item) => `(?=.*${item}.*)`)
          .join("")}.*$`
      );
      this.maybeList = illnessList
        .sort(() => Math.random() - 0.5)
        .filter((item) => item.name.match(reg))
        .splice(0, 5);
      if (this.maybeList.length === 0) {
        this.maybeList = illnessList.splice(0, 5);
      }
    },
    clearAll() {
      this.historyList = [];
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
    formatTime(time) {
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },
  },
  mounted() {
    this.$bus.$on("clearHistoryItem", (index) => {
      this.historyList.splice(index, 1);
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    });
    this.handleSearch();

    let options = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
      title: {
        text: "近日搜索趋势",
        left: "center",
        top: "0",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["焦虑症", "自闭症", "抑郁症", "双向情感障碍", "神经性厌食症"],
        right: "5%",
        top: "10%",
      },

      grid: {
        left: "3%",
        right: "4%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: [
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000 * 6)),
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000 * 5)),
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000 * 4)),
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000 * 3)),
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000 * 2)),
            this.formatTime(new Date(new Date() - 60 * 60 * 24 * 1000)),
            this.formatTime(new Date()),
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "焦虑症",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [391, 382, 383, 400, 369, 379, 382],
        },
        {
          name: "自闭症",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgb(77, 119, 255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 213, 232, 258, 256, 275, 259],
        },
        {
          name: "抑郁症",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgb(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [758, 577, 780, 640, 705, 951, 758],
        },
        {
          name: "双向情感障碍",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 0, 135)",
              },
              {
                offset: 1,
                color: "rgb(135, 0, 157)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [207, 166, 155, 304, 170, 170, 157],
        },
        {
          name: "神经性厌食症",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 191, 0)",
              },
              {
                offset: 1,
                color: "rgb(224, 62, 76)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 167, 231, 225, 228, 167, 240],
        },
      ],
    };
    const chart = this.$echarts.init(this.$refs.searchChart);
    chart.setOption(options);

    window.addEventListener("resize", () => {
      chart.resize();
    })
  },
};
</script>

<style lang="less" scoped>
.search-illness {
  margin: 0 auto;
  &-header {
    width: 80%;
    margin: 0 auto;
    min-width: min-content;
    &-image {
      width: 200px;
      height: 200px;
      margin: 60px auto;
      background: url(@/assets/logo.png) no-repeat 0 0;
      background-size: contain;
    }
    &-search {
      display: flex;
      width: 90%;
      margin: 40px auto;
      &-input {
        flex: 1;
        position: relative;

        &-icon {
          height: 26px;
          width: 26px;
          color: @color;
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          background: url(@/assets/logo.png) no-repeat 0 0;
          background-size: 26px 26px;
        }
        &-key {
          width: 100%;
          height: 40px;
          border: 1px solid @color;
          border-radius: 10px;
          padding: 0 20px 0 44px;
          line-height: 1;
        }
      }
      &-button {
        width: fit-content;
        padding: 10px 20px;
        border: 1px solid @color;
        outline: none;
        border-radius: 10px;
        margin-left: 10px;
        background-color: @white;
        color: @color;
        white-space: nowrap;

        &:hover {
          background-color: @color;
          color: @white;
        }

        &:active {
          filter: brightness(1.1);
        }
      }
    }
    &-history,
    &-maybe {
      display: flex;
      line-height: 20px;
      margin-top: 10px;
      width: fit-content;
      white-space: nowrap;
      &-title {
        font-size: 16px;
        color: #333;
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-list {
        margin-left: 10px;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        line-height: 2;
        &-item {
          flex: 1;
          margin: 5px;
          font-size: 14px;
          color: #666;
          padding: 6px 16px;
          border-radius: 10px;
          background-color: @color-light;
          &-link {
            color: #666;
            &:hover {
              color: @color;
            }
            &:active {
              color: @color-dark;
            }
          }
        }
      }
    }
    &-hr {
      margin: 20px 0;
      border: 1px solid #eee;
    }
  }
  &-content {
    padding: 10px;
    width: 80%;
    margin: auto;
    &-visit {
      &-title {
        position: relative;
        font-size: 16px;
        line-height: 1;
        text-align: left;
        width: fit-content;
        padding: 16px 20px;
        background-color: @color-light;
        color: @color-dark;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: @color;
        }
      }
      &-clearall {
        display: block;
        width: 90%;
        min-width: fit-content;
        padding: 10px;
        border: 1px solid @color;
        outline: none;
        border-radius: 10px;
        margin: 26px auto;
        background-color: @white;
        color: @color;
        white-space: nowrap;

        &:hover {
          background-color: @color;
          color: @white;
        }

        &:active {
          filter: brightness(1.1);
        }
      }
      &-list {
        margin-top: 10px;
        border-left: 2px solid @color;

        &-warning {
          padding: 10px;
          color: @color-dark;
        }
      }
    }
  }

  &-chart {
    height: 400px;
    width: 80%;
    margin: 30px auto;
    padding-bottom: 30px;
  }

  @media screen and(max-width: 618px) {
    &-header,
    &-content {
      width: 100%;
    }

    &-header {
      &-maybe,
      &-history {
        flex-direction: column;
        margin: auto;
        &-title {
          width: 100%;
          padding: 20px;
        }
      }
    }

    &-chart {
      width: 100%;
      height: 350px;
      
    }
  }
}
</style>