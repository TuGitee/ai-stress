<template>
  <div class="error">
    <div class="error-image">
    <img src="./404.png" alt=""></div>
    <h4 class="error-msg">{{msg}}</h4>
    <router-link to="/" class="error-router">返回首页</router-link>
  </h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: `Error! Can't find the page of ${this.$route.path} !`,
    };
  },
};
</script>

<style lang="less" scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &-image {
    width: 100%;
    height: 100%;
    img {
      width: 200px;
      height: 200px;
    }
  }
  &-msg {
    margin: 30px auto;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  &-router {
    display: block;
    width: 100px;
    padding: 5px 10px;
    line-height: 30px;
    text-align: center;
    background-color: @color;
    color: @white;
    border-radius: 5px;
    text-decoration: none;
  }
}
</style>