<template>
  <div class="illness-analysis">
    <div class="illness-analysis__header">
      <div class="illness-analysis__header__title">
        <span>相关心理诊断或测试链接</span>
      </div>
      <div class="illness-analysis__header__tip">
        <span
          >注意：本站所提供的所有诊断或测试均为可信度较高的外部链接，本站不对诊断或测试结果负责，如需更为精确的诊断，请及时前往医院或相关诊疗机构。</span
        >
      </div>
      <div class="illness-analysis__header__content">
        <div
          class="illness-analysis__header__content__item"
          v-for="(link, index) in analysisListRandom"
          :key="index"
        >
          <a :href="link.url" target="_blank" :title="link.content">
            <div class="illness-analysis__header__content__item__header">
              <img
                class="illness-analysis__header__content__item__header__icon"
                alt=""
                :src="require(`@/assets/image/illness/illness_41.png`)"
              />
            </div>
            <div class="illness-analysis__header__content__item__footer">
              <span
                class="illness-analysis__header__content__item__footer__title"
                >{{ link.title }}</span
              >
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="illness-analysis__hr">
      <p class="illness-analysis__hr__left"></p>
      <h4 class="illness-analysis__hr__content">最新相关链接</h4>
      <p class="illness-analysis__hr__right"></p>
    </div>
    <div class="illness-analysis__footer">
      <div
        class="illness-analysis__footer__item"
        v-for="item in analysisList"
        :key="item.name"
      >
        <div class="illness-analysis__footer__item__title">
          <div class="illness-analysis__footer__item__title__left">
            {{ item.name }}
          </div>
        </div>
        <div class="illness-analysis__footer__item__tips">
          tips: {{ item.tips }}
        </div>
        <div class="illness-analysis__footer__item__content">
          <div
            class="illness-analysis__footer__item__content__item"
            v-for="link in item.links"
            :key="link.url"
          >
            <div class="illness-analysis__footer__item__content__item__left">
              <img
                class="illness-analysis__footer__item__content__item__left__image"
                :src="require(`@/assets/image/illness/illness_41.png`)"
                alt=""
              />
            </div>
            <div class="illness-analysis__footer__item__content__item__middle">
              <div
                class="illness-analysis__footer__item__content__item__middle__title"
                :title="link.title"
              >
                {{ link.title }}
              </div>
              <div
                class="illness-analysis__footer__item__content__item__middle__tip"
                :title="link.intro"
              >
                {{ link.intro }}
              </div>
            </div>
            <div class="illness-analysis__footer__item__content__item__right">
              <a
                class="illness-analysis__footer__item__content__item__right__button"
                :href="link.url"
                target="_blank"
                >前往</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="illness-analysis__chart" ref="chart"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    formatTime(time) {
      return `${time.getMonth() + 1}-${time.getDate()}`;
    },
  },
  computed: {
    ...mapGetters({
      analysisList: "analysisList",
      analysisListRandom: "analysisListRandom",
    }),
  },
  mounted() {
    this.$store.state.analysis.analysisList.length === 0 &&
      this.$store.dispatch("getAnalysisList");
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push(
        this.formatTime(new Date(new Date() - (99 - i) * 24 * 3600 * 1000))
      );
      data1.push(
        parseInt(Math.abs((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5))
      );
      data2.push(
        parseInt(Math.abs((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5))
      );
      data3.push(parseInt((Math.sin(i / 5) + Math.cos(i / 5) + i / 6) * 5));
    }
    let option = {
      title: {
        text: "测试热度趋势",
        bottom: "5%",
        left: "center",
      },
      legend: {
        data: ["抑郁症", "焦虑症", "综合测试"],
      },
      toolbox: {
        feature: {
          magicType: {
            type: ["stack"],
          },
          saveAsImage: {
            pixelRatio: 3,
          },
        },
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: "抑郁症",
          type: "bar",
          data: data1,
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        },
        {
          name: "焦虑症",
          type: "bar",
          data: data2,
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
        {
          name: "综合测试",
          type: "bar",
          data: data3,
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          },
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: function (idx) {
        return idx * 5;
      },
    };
    const chart = this.$echarts.init(this.$refs.chart);
    chart.setOption(option);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  },
};
</script>

<style lang="less" scoped>
.illness-analysis {
  width: 100%;
  &__header {
    width: 90%;
    padding: 0 20px;
    margin: auto;
    &__title {
      width: fit-content;
      padding: 0 20px;
      font-size: 26px;
      line-height: 2;
      font-weight: bold;
      color: @font-color-dark;
      font-family: "楷体";
      border: 2px dashed @color;
      margin: 10px auto 20px;
      border-radius: 10px;
      user-select: none;
    }
    &__tip {
      width: 100%;
      line-height: 1.6;
      font-size: 16px;
      color: @font-color-light;
    }
    &__content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      &__item {
        height: 100%;
        width: 12%;
        min-width: 200px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 20px 10px;
        transition: 0.5s all;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        background-color: white;
        box-shadow: 0px 2px 15px -10px @color;

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        &:hover {
          box-shadow: 0px 2px 20px -5px @color;
        }

        &__header {
          width: 100%;
          line-height: 30px;
          font-size: 16px;
          font-weight: bold;
          color: @font-color;
          &__icon {
            width: 60px;
            height: 60px;
            display: block;
            margin: auto;
            background-color: @grey;
            border-radius: 10px;
            object-fit: cover;
          }
        }

        &__footer {
          width: 100%;
          font-size: 14px;
          padding: 10px 0;
          box-sizing: content-box;
          height: 2em;
          color: @font-color-light;
          overflow: hidden;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          &__title {
            width: 100%;
            height: 100%;
            text-align: center;
            transition: 0.3s all;
          }
        }
      }
    }
  }

  &__hr {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: @font-color;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    &__left {
      width: 30%;
      max-width: 150px;
      height: 1px;
      background-color: @color-light;
    }
    &__content {
      width: 100px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: bold;
      color: @font-color;
      text-align: center;
      margin: 10px 20px;
      white-space: nowrap;
    }
    &__right {
      width: 30%;
      max-width: 150px;
      height: 1px;
      background-color: @color-light;
    }
  }

  &__footer {
    width: 80%;
    margin: auto;
    padding: 0 20px;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 0;
    }
    &__item {
      width: 100%;
      height: 100%;
      padding: 20px 15px;
      text-align: left;

      &__title {
        width: 100%;
        color: @font-color;
        display: flex;
        justify-content: space-between;
        &__left {
          height: 100%;
          line-height: 30px;
          font-size: 20px;
          font-weight: bold;
          color: @font-color;
        }
        &__right {
          height: 100%;
          line-height: 20px;
          font-size: 16px;
          color: @color;
        }
      }
      &__tips {
        font-size: 14px;
        line-height: 2;
        color: @font-color-light;
      }
      &__content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: center;

        &__item {
          flex: 40%;
          margin: 10px;
          min-width: 400px;
          @media screen and (max-width: 768px) {
            width: 90%;
            min-width: 90%;
          }
          width: 40%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0px 0px 15px -10px @color;
          &__left {
            &__image {
              width: 50px;
              height: 50px;
              object-fit: cover;
              display: block;
              margin: auto;
              background-color: @grey;
              border-radius: 10px;
            }
          }
          &__middle {
            width: 100%;
            height: 100%;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 10px;
            &__title {
              width: 100%;
              line-height: 20px;
              font-size: 16px;
              font-weight: bold;
              color: @font-color;
              overflow: hidden;
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            &__tip {
              margin-top: 5px;
              width: 100%;
              line-height: 20px;
              height: 20px;
              font-size: 14px;
              color: @font-color-light;
              overflow: hidden;
              word-break: break-all;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          &__right {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &__button {
              width: 60px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              color: @white;
              text-align: center;
              background-color: @color;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }

  &__chart {
    width: 70%;
    height: 500px;
    margin: 20px auto;
    padding-bottom: 20px;

    @media screen and (max-width: 768px) {
      width: 90%;
      height: 300px;
    }
    /deep/ & > svg {
      & > g {
        & > text {
          padding-top: 20px;
        }
      }
    }
  }
}
</style>