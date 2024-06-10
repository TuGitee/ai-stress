<template>
  <div class="bubble-item" :class="index % 2 ? 'odd' : 'even'">
    <router-link v-if="child.id !== -1"
      :to="{
        name: 'IllnessDetail',
        params: {
          illnessId: child.id,
        },
      }"
      >{{ child.name }}</router-link
    >
    <a v-else>{{ child.name }}</a>
  </div>
</template>

<script>
export default {
  name: "BubbleItem",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    child: {
      type: Object,
      default: () => {
        return {
          id: -1,
          name: "暂无数据",
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
.bubble-item {
  position: relative;
  width: 80%;
  height: 100%;
  min-height: 36px;
  background-color: @color-light;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid @color-dark;
  padding: 10px 15px;
  a {
    font-size: 14px;
    font-weight: 400;
    color: @font-color-dark;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.odd {
  &:nth-child(2):not(:last-child) {
    transform: translate(25px, 0);
  }
  &:nth-child(3):not(:last-child):not(:nth-last-child(2)) {
    transform: translate(50px, 0);
  }
  &:nth-child(3):not(:last-child) {
    transform: translate(25px, 0);
  }
  &:nth-child(4):not(:last-child) {
    transform: translate(75px, 0);
  }
  &:nth-child(4):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(25px, 0);
  }
  &:nth-child(4):not(:last-child):is(:nth-last-child(3)) {
    transform: translate(50px, 0);
  }
  &:nth-child(5):not(:last-child) {
    transform: translate(75px, 0);
  }
  &:nth-child(5):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(25px, 0);
  }
  &:nth-child(5):not(:last-child):is(:nth-last-child(3)) {
    transform: translate(50px, 0);
  }
  &:nth-child(6):not(:last-child) {
    transform: translate(50px, 0);
  }
  &:nth-child(6):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(25px, 0);
  }
  &:nth-child(7):not(:last-child) {
    transform: translate(25px, 0);
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-95%) translateY(-50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: @color-light;
    z-index: 0;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-100%) translateY(-50%);
    width: 0;
    height: 0;
    border: 11px solid transparent;
    border-right-color: @color-dark;
    z-index: -1;
  }
}
.even {
  &:nth-child(2):not(:last-child) {
    transform: translate(-25px, 0);
  }
  &:nth-child(3):not(:last-child):not(:nth-last-child(2)) {
    transform: translate(-50px, 0);
  }
  &:nth-child(3):not(:last-child) {
    transform: translate(-25px, 0);
  }
  &:nth-child(4):not(:last-child) {
    transform: translate(-75px, 0);
  }
  &:nth-child(4):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(-25px, 0);
  }
  &:nth-child(4):not(:last-child):is(:nth-last-child(3)) {
    transform: translate(-50px, 0);
  }
  &:nth-child(5):not(:last-child) {
    transform: translate(-75px, 0);
  }
  &:nth-child(5):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(-25px, 0);
  }
  &:nth-child(5):not(:last-child):is(:nth-last-child(3)) {
    transform: translate(-50px, 0);
  }
  &:nth-child(6):not(:last-child) {
    transform: translate(-50px, 0);
  }
  &:nth-child(6):not(:last-child):is(:nth-last-child(2)) {
    transform: translate(-25px, 0);
  }
  &:nth-child(7):not(:last-child) {
    transform: translate(-25px, 0);
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(95%) translateY(-50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: @color-light;
    z-index: 0;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(100%) translateY(-50%);
    width: 0;
    height: 0;
    border: 11px solid transparent;
    border-left-color: @color-dark;
    z-index: -1;
  }
}
</style>