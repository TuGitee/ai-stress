<template>
  <div class="psychology-item">
    <div class="psychology-item-header">
      <div class="psychology-item-header-title">{{ item.title }}</div>
      <div class="psychology-item-header-info">
        <div class="psychology-item-header-info-author">{{ item.author }}</div>
        <div class="psychology-item-header-info-time">{{ item.time }}</div>
      </div>
    </div>
    <div class="psychology-item-content" v-html="msg"></div>
    <div class="psychology-item-footer">
      <img
        :src="require(`@/assets/image/illness/illness_${fileNumber}.png`)"
        alt=""
        class="psychology-item-footer-img"
      />
    </div>
  </div>
</template>

<script>
import random from "@/utils/random.js";
export default {
  name: "PsychologyItem",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  computed: {
    msg() {
      return this.item.psychology
        .map((item) => {
          return `<p class="psychology-item-content-item">${item}</p><br/>`;
        })
        .join("");
    },
    fileNumber() {
      return random();
    },
  },
};
</script>

<style lang="less" scoped>
.psychology-item {
  padding: 16px 32px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0px 2px 20px -10px @color-dark;
  transition: all 0.5s;
  background-color: white;
  &-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    &-title {
      font-size: 20px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 500px;
    }
    &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
      &-author {
        font-size: 14px;
        color: @font-color-light;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-time {
        margin-left: 10px;
        font-size: 14px;
        color: @font-color-light;
        max-width: 200px;
      }
    }
  }
  &-content {
    height: calc(100% - 50px);
    width: 100%;
    overflow: auto;
    margin-top: 10px;

    /deep/ &-item {
      text-align: left;
      text-indent: 2em;
      line-height: 1.5;
      font-size: 16px;
      color: @font-color;
      margin-bottom: 14px;
    }
  }
  &-footer {
    max-width: 500px;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 20px;
    &-img {
      width: 100%;
      border-radius: 10px;
    }
  }
  @media screen and (max-width: 680px) {
    &-header {
      flex-direction: column;
      &-info {
        margin-top: 10px;
      }
    }
  }
}
</style>