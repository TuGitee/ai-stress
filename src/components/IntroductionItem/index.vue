<template>
  <div class="introduction-item">
    <div class="introduction-item-left">
      <img
        class="introduction-item-left-image"
        :src="require('@/' + item.meta.imgURL)"
        alt=""
      />
    </div>
    <div class="introduction-item-right">
      <h3 class="introduction-item-right-title">{{ item.meta.title }}</h3>
      <p class="introduction-item-right-content">
        {{ item.meta.introduction }}
      </p>
      <router-link :to="item.path" class="introduction-item-right-link" replace>查看详情</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroductionItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.introduction-item {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 20px;
  box-shadow: 0px 2px 20px -10px @color-dark;
  transition: all 0.5s;
  min-width: fit-content;
  background-color: white;

  &:hover {
    transform: scale(1.03);
  }

  &-left {
    &-image {
      width: 200px;
      background-color: @grey;
      border-radius: 15px;
      object-fit: cover;
    }
  }
  &-right {
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    &-title {
      font-size: 16px;
      font-weight: 600;
      color: @font-color;
      margin-bottom: 10px;
    }
    &-content {
      font-size: 14px;
      color: @font-color-light;
      margin-bottom: 10px;
    }
    &-link {
      display: block;
      margin-top: 10px;
      width: fit-content;
      background-color: @color;
      padding: 10px 20px;
      border-radius: 16px;
      color: @white;
      white-space: nowrap;
      &:active {
        background-color: @color-dark;
      }
    }
  }
  @media screen and (max-width: 618px) {
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
    &-left {
      margin: 0 20px 20px;
      &-image {
        width: 100%;
      }
    }
    &-right {
      margin: 0 30px;
      align-items: center;
      &-content {
        text-indent: 2em;
      }
    }
  }
}
</style>