<template>
  <div class="illness-router" :class="index % 2 ? 'odd' : 'even'">
    <div class="illness-router-left">
      <div class="illness-router-left-image">
        <img
          :src="require(`@/assets/image/illness/illness_${fileNumber}.png`)"
          alt=""
        />
      </div>
      <div class="illness-router-left-tips">
        {{ item.introduction[0] }}
      </div>
      <div class="illness-router-left-title">
        <h6 class="illness-router-left-title-cn">{{ title }}</h6>
        <p class="illness-router-left-title-en">{{ item.trans }}</p>
      </div>
      <button class="illness-router-left-more" @click="handleMore">
        点击了解更多<i>→</i>
      </button>
      <CardItem v-if="isMore" :item="introduction" @mask="handleMore" />
    </div>
    <div class="illness-router-right">
      <BubbleItem
        :index="index"
        v-for="(child, index2) in item.children"
        :child="child"
        :key="index2"
        class="illness-router-right-item"
      />
    </div>
  </div>
</template>

<script>
import random from "@/utils/random";
import BubbleItem from "@/components/BubbleItem";
import CardItem from "@/components/CardItem";
export default {
  name: "IllnessRouter",
  data() {
    return {
      isMore: false,
    };
  },
  methods: {
    handleMore() {
      this.isMore = !this.isMore;
      document.body.style.overflow = this.isMore ? "hidden" : "overlay";
    },
  },
  props: {
    title: {
      type: String,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    BubbleItem,
    CardItem,
  },
  computed: {
    fileNumber() {
      return random();
    },
    introduction() {
      return {
        title: this.title,
        content: this.item.introduction,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.illness-router {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 40px 0;
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
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-image {
      width: 100%;
      height: 100%;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        padding: 16px;
        box-sizing: content-box;
        background-color: white;
        border: 2px dashed @color;
        animation: rotate 30s linear infinite;
        object-fit: cover;

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
    &-tips {
      margin: 30px auto;
      height: 100%;
      text-align: center;
    }
    &-title {
      width: 100%;
      height: 100%;
      text-align: center;
      &-cn {
        font-size: 20px;
        font-weight: 600;
        color: @font-color;
      }
      &-en {
        font-size: 14px;
        font-weight: 400;
        color: @font-color-light;
      }
    }
    &-more {
      margin: 30px auto;
      width: fit-content;
      height: 100%;
      border: none;
      outline: none;
      background-color: @color-light;
      border-radius: 10px;
      line-height: 1;
      font-size: 14px;
      font-weight: 400;
      color: @font-color;
      padding: 10px 15px;
      cursor: pointer;
      transition: 0s;
      i {
        margin-left: 10px;
        font-size: 12px;
        transition: 0s;
      }
      &:hover {
        background-color: @color;
        color: @white;
      }

      &:active {
        background-color: @color-dark;
        color: @white;
      }
    }
  }
  &-right {
    width: 50%;
    min-width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    &-item {
      margin: 10px 0;
    }
  }
  @media (max-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0;
    &-left {
      width: 90%;
    }
    &-right {
      width: 90%;
    }
  }
}
</style>