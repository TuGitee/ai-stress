<template>
  <div class="function-introduction">
    <h2 class="function-introduction-title">功能介绍</h2>
    <div class="function-introduction-content">
      <IntroductionItem
        v-for="(item, index) in NavRoutes"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import IntroductionItem from "@/components/IntroductionItem";
import NavRoutes from "@/router/NavRoutes";
export default {
  name: "FunctionIntroduction",
  components: {
    IntroductionItem,
  },
  data() {
    return {
      NavRoutes: NavRoutes.filter((item) => {
        return item.name !== "FunctionIntroduction";
      }),
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.function-introduction {
  padding: 20px;
  width: 80%;
  margin: auto;

  @media (min-width: 1080px) {
    padding: 20px 60px;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
  &-title {
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
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>