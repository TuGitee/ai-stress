<template>
  <div class="card-item">
    <div class="card-item-mask" @click="$emit('mask')"></div>
    <div class="card-item-content">
      <h3 class="card-item-content-title">{{ item.title }}</h3>
      <div class="card-item-content-content">
        <div
          class="card-item-content-content-item"
          v-for="(p, index) in item.content"
          :key="index"
        >
          {{ p }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          title: "标题",
          content: ["内容1", "内容2", "内容3"],
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
.card-item {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-mask {
    width: 100%;
    height: 100%;
    background-color: @black;
    opacity: 0.5;
  }

  &-content {
    width: 50%;
    max-height: 600px;
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 5px;
    text-align: left;
    padding: 5px 10px;
    overflow: overlay;
    animation: 0.3s in ease-in-out 0s 1 forwards running;

    @media screen and (max-width: 718px) {
      width: 80%;
    }

    @keyframes in {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      color: @font-color-dark;
      border-bottom: 1px solid @grey;
      padding: 0 10px;
      position: relative;

      &::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 20%;
        height: 2px;
        border-radius: 10px;
        background-color: @color-dark;
        bottom: -1px;
        left: 0;
      }
    }

    &-content {
      width: 100%;
      padding: 10px;

      &-item {
        width: 100%;
        margin: 10px 0;
        text-indent: 1em;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: @font-color-dark;
      }
    }
  }
}
</style>