<template>
  <div class="illness-item" :class="index % 2 ? 'even' : 'odd'">
    <div class="illness-item-left">
      <img
        class="illness-item-left-image"
        :src="require(`@/assets/image/illness/illness_${random}.png`)"
        alt=""
      />
    </div>
    <div class="illness-item-right">
      <div class="illness-item-right-title">{{ name }}</div>
      <div class="illness-item-right-content" v-html="msg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: "undefined",
    },
    index: {
      type: Number,
    },
    item: {
      type: Object | String | Array,
      default: {},
    },
  },
  computed: {
    msg() {
      const { item, name } = this;
      switch (typeof item) {
        case "object":
          if (Array.isArray(item)) {
            return (
              `<ul class="illness-item-right-content-list ${
                name.indexOf("诊断") !== -1 ? "analysis" : ""
              }">` +
              item
                .map((item) => {
                  if (typeof item === "string")
                    return `<li class="illness-item-right-content-list-item array">${item.replaceAll(
                      "\n",
                      "<br/>"
                    )}</li>`;
                  else if (Array.isArray(item))
                    return `<div>${
                      `<ul class="illness-item-right-content-list-children">` +
                      item
                        .map(
                          (item) =>
                            `<li class="illness-item-right-content-list-children-item">${item}</li>`
                        )
                        .join("") +
                      `</ul>`
                    }</div>`;
                })
                .join("") +
              `</ul>`
            );
          }
          return (
            `<ul class="illness-item-right-content-list">` +
            Object.keys(item)
              .map(
                (key) =>
                  `<li class="illness-item-right-content-list-item object"><b class="illness-item-right-content-list-item-title">${key}</b>&nbsp;&nbsp;${item[key]}</li>`
              )
              .join("") +
            `</ul>`
          );
        case "string":
          return item;
        default:
          return "暂无数据";
      }
    },
    random() {
      return Math.floor(Math.random() * this.getLength()) + 1;
    },
  },
  methods: {
    getLength() {
      try {
        const files = require.context(
          "@/assets/image/illness",
          false,
          /\.png$/
        );
        return files.keys().length;
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.illness-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  &.odd {
    flex-direction: row;
    .illness-item-left {
      margin-right: 20px;
    }
  }
  &.even {
    flex-direction: row-reverse;
    .illness-item-left {
      margin-left: 20px;
    }
  }

  &-left {
    display: flex;
    align-items: center;
    border-radius: 10px;
    width: 30%;
    &-image {
      width: 100%;
      height: fit-content;
      border-radius: 10px;
      object-fit: cover;
      background-color: @color-light;
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    flex: 1;
    &-title {
      font-size: 20px;
      font-weight: 600;
      width: 100%;
    }
    &-content {
      min-width: 200px;
      margin-top: 16px;
      font-size: 16px;
      text-indent: 2em;
      color: @font-color;
      background-color: @color-light;
      border-radius: 10px;
      padding: 15px 20px;
      width: 100%;
      line-height: 1.5;
      /deep/ &-list {
        margin: 0;
        padding: 0;
        & > li:not(:first-child) {
          margin-top: 20px;
          padding: 0;
        }
        & > div:not(:first-child) {
          margin-top: 20px;
          padding: 0;
        }
        &-item {
          margin: 0;
          padding: 0;
          text-indent: 2em;
          &-title {
            font-weight: 600;
          }
        }
        &-children {
          padding: 0;
          margin-left: 70px;
          font-size: 16px;
          color: @font-color-light;
          text-indent: 0;

          &-item {
            line-height: 1.3;
            list-style: decimal;
            &:not(:first-child) {
              margin-top: 6px;
            }
          }
        }

        &.analysis .array {
          text-indent: 0;
          margin-left: 20px;
          list-style: upper-alpha;
          &:last-child {
            text-align: center;
            list-style: none;
            margin: 20px auto 10px;
            font-size: 14px;
            color: @font-color-light;
          }
        }
      }
    }
  }
  @media screen and (max-width: 618px) {
    flex-direction: column !important;
    &-left {
      margin: 0 !important;
      width: 90% !important;
      &-image {
        max-height: 200px;
      }
    }
    &-right {
      &-title {
        margin: 10px auto;
        text-align: center;
      }
    }
  }
}
</style>