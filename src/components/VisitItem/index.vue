<template>
  <li class="visit-item">
    <div class="visit-item-left">
      <img
        class="visit-item-left-image"
        :src="require(`@/assets/image/illness/illness_${fileNumber}.png`)"
        alt=""
      />
    </div>

    <div class="visit-item-content">
      <router-link
        :to="{
          name: 'IllnessDetail',
          params: {
            illnessId: item.id,
          },
        }"
      >
        <div class="visit-item-content-header">
          <span class="visit-item-content-header-title">{{ item.name }}</span>
          <button
            class="visit-item-content-header-delete"
            @click.stop.prevent="clear"
          >
            清除此项
          </button>
        </div>
      </router-link>
      <div class="visit-item-content-content" v-html="introduction"></div>
    </div>
  </li>
</template>

<script>
import random from "@/utils/random";
export default {
  name: "VisitItem",
  data() {
    return {};
  },
  methods: {
    clear() {
      this.$bus.$emit("clearHistoryItem", this.index);
    },
  },
  mounted() {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
    },
  },
  computed: {
    fileNumber() {
      return random();
    },
    introduction() {
      return typeof this.item.introduction === "string"
        ? this.item.introduction
        : this.item.introduction.join("<br>");
    },
  },
};
</script>

<style lang="less" scoped>
.visit-item {
  display: flex;
  padding: 20px;
  padding-right: 0;
  text-align: left;
  &-left {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background-color: @grey;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
  &-content {
    flex: 1;
    padding-left: 10px;
    &-header {
      font-size: 16px;
      color: #333;
      &-title {
        margin-right: 10px;
      }
      &-delete {
        padding: 3px 7px;
        margin: 8px 0 0 8px;
        border: 1px solid @color;
        border-radius: 10px;
        background-color: @white;
        color: @color;
        outline: none;

        &:hover {
          background-color: @color;
          color: @white;
        }

        &:active {
          filter: brightness(1.1);
        }
      }
    }
    &-content {
      font-size: 14px;
      color: #666;
      margin-top: 10px;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>