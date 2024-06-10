<template>
  <div class="illness-detail" ref="scroll">
    <button class="illness-detail-back" @click="goBack">返回</button>
    <button class="illness-detail-bottom bottom" @click="goBottom">
      点击达到底部
    </button>
    <h2 class="illness-detail-title">{{ active.name }}</h2>
    <IllnessItem
      v-for="(item, key, index) in data"
      :key="key"
      :index="index"
      :item="item"
      :name="key"
      class="illness-detail-item"
    />
    <div class="illness-detail-footer">
      <router-link
        :to="{
          name: 'IllnessDetail',
          params: {
            illnessId: before.id,
          },
        }"
        class="illness-detail-footer-link"
        replace
        >上一个疾病：{{ before.name }}</router-link
      >
      <router-link
        :to="{
          name: 'IllnessDetail',
          params: {
            illnessId: after.id,
          },
        }"
        class="illness-detail-footer-link"
        replace
        >下一个疾病：{{ after.name }}</router-link
      >
      <a @click="goBack" class="illness-detail-footer-link back">返回上一页</a>
    </div>
    <CardItem
      v-if="isShow"
      class="warn"
      :item="introduction"
      @mask="handleShow"
    />
  </div>
</template>

<script>
import IllnessItem from "@/components/IllnessItem";
import CardItem from "@/components/CardItem";
import { mapGetters } from "vuex";
export default {
  name: "IllnessDetail",
  components: {
    IllnessItem,
    CardItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goBottom() {
      window.scrollTo({
        top: this.$refs.scroll.offsetHeight,
        behavior: "smooth",
      });
    },
    async getItem() {
      if (this.illnessList.length === 0)
        await this.$store.dispatch("getIllnessList");

      const index = this.illnessList.findIndex(
        (item) => item.id === this.$route.params.illnessId
      );
      this.active = this.illnessList[index];
      this.before =
        this.illnessList[
          index - 1 < 0 ? this.illnessList.length - 1 : index - 1
        ];
      this.after = this.illnessList[(index + 1) % this.illnessList.length];
      const historyList = JSON.parse(localStorage.getItem("historyList")) || [];
      if (historyList.find((item) => item.id === this.active.id)) {
        const index = historyList.findIndex(
          (item) => item.id === this.active.id
        );
        historyList.splice(index, 1);
      }
      if (historyList.length > 5) {
        historyList.pop();
      }
      const newHistory = {
        id: this.active.id,
        name: this.active.name,
        introduction: this.active["基本定义"],
      };
      localStorage.setItem(
        "historyList",
        JSON.stringify([newHistory, ...historyList])
      );
    },
    handleShow() {
      this.isShow = false;
    },
  },
  data() {
    return {
      active: {},
      before: {},
      after: {},
      introduction: {
        title: "注意",
        content: [
          "请滑动左侧或点击页面回退返回上一页！",
          "返回上一页按钮在页面底部！",
        ],
      },
      isShow: true,
    };
  },

  mounted() {
    this.getItem();
  },
  computed: {
    data() {
      const { name, id, ...params } = this.active;
      return params;
    },
    ...mapGetters({
      illnessList: "illnessList",
    }),
  },
};
</script>

<style lang="less" scoped>
.illness-detail {
  padding: 20px;
  position: relative;
  top: 0;
  width: 80%;
  margin: auto;
  &-title {
    width: fit-content;
    padding: 0 20px;
    font-size: 30px;
    line-height: 2;
    font-weight: bold;
    color: @font-color-dark;
    font-family: "楷体";
    border: 2px dashed @color;
    margin: 40px auto 60px;
    border-radius: 10px;
    user-select: none;
  }
  &-item:not(:last-child) {
    border-bottom: 1px solid @grey;
  }
  &-back {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 40px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    background-color: @color;
    color: @white;
    border-radius: 10px;
    border: none;
  }
  &-bottom {
    color: @color;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 20px;
    opacity: 0.5;
    border: none;
    background-color: @color-light;

    &:hover {
      background-color: @color-light;
      color: @font-color;
    }
    &:active {
      background-color: @color;
      color: @white;
    }
  }
  &-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-link {
      color: @color;
      font-size: 16px;
      border-radius: 10px;
      padding: 10px 20px;
      background-color: @color-light;

      &.back {
        display: none;
      }

      &:hover {
        background-color: @color-light;
        color: @font-color;
      }
      &:active {
        background-color: @color;
        color: @white;
      }
    }
  }
  @media screen and (max-width: 618px) {
    margin-top: calc(10px + constant(safe-area-inset-top));
    margin-top: calc(10px + env(safe-area-inset-top));
    width: 100%;
    &-back {
      display: none;
    }
    &-footer {
      flex-direction: column;
      margin-top: 0;
      &-link {
        width: 80%;
        margin-bottom: 20px;

        &.back {
          display: block;
        }
      }
    }
  }
  @media screen and (min-width: 618px) {
    .bottom,
    .warn {
      display: none;
    }
  }
}
</style>