<template>
  <div id="app">
    <Background />
    <audio
      src="@/components/NavBar/music/toki.mp3"
      loop
      controls
      controlslist="nomute noplaybackrate nodownload"
      type="audio/ogg"
      class="music"
      autoplay
    ></audio>
    <NavBar class="nav" v-if="$route.meta.isNavShow" />
    <keep-alive> <router-view class="main" :key="$route.path" /></keep-alive>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Background from "./components/Background";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    NavBar,
    Background,
  },
  created() {
    this.getIllnessList();
  },
  methods: {
    async getIllnessList() {
      await this.$store.dispatch("getIllnessList");
      await this.$store.dispatch("getCategoryDetail");
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  outline: none;
  text-decoration: none;
  transition: all 0.5s;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  text-size-adjust: none;

  &::-moz-selection {
    background: transparent;
    color: @color;
  }

  &::selection {
    background: transparent;
    color: @color;
  }

  body {
    overflow: overlay;
  }
  img {
    -webkit-user-drag: none;
    user-select: none;
  }
  a {
    -webkit-user-drag: none;
    user-select: none;
  }

  .main {
    position: relative;
    width: 90%;
    @media screen and (min-width: 731.56px) {
      top: calc(60px + constant(safe-area-inset-top));
      top: calc(60px + env(safe-area-inset-top));
    }
    @media screen and (max-width: 731.56px) {
      top: calc(120px + constant(safe-area-inset-top));
      top: calc(120px + env(safe-area-inset-top));
    }
    @media screen and (max-width: 511.11px) {
      top: calc(180px + constant(safe-area-inset-top));
      top: calc(180px + env(safe-area-inset-top));
    }
    @media screen and (max-width: 271.11px) {
      top: calc(240px + constant(safe-area-inset-top));
      top: calc(240px + env(safe-area-inset-top));
    }

    padding: 20px constant(safe-area-inset-left)
      constant(safe-area-inset-bottom) constant(safe-area-inset-right);
    padding: 20px env(safe-area-inset-left) env(safe-area-inset-bottom)
      env(safe-area-inset-right);
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 0;

    &-thumb {
      background-color: @color;
      border-radius: 10px;
    }
    &-track {
      background-color: @color-light;
      color: transparent;
      border-radius: 10px;
    }
  }
}
body {
  overflow: overlay;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Arial",
    "Microsoft YaHei", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @font-color;

  .nav {
    user-select: none;
    .active:is(.nav-bar-right-item a):not(.nav-bar-right-item:last-child a) {
      color: @color-dark;
      position: relative;
      &::after {
        content: "";
        opacity: 0;
        display: block;
        height: 2px;
        background-color: @color;
        border-radius: 10px;
        position: absolute;
        animation: nav-active 0.5s forwards ease;
      }
    }
    .active:is(.nav-bar-right-item:last-child a) {
      background-color: @color-dark;
      position: relative;
    }
    @keyframes nav-active {
      0% {
        width: 0;
        left: 50%;
        bottom: 36%;
      }
      100% {
        width: 100%;
        left: 0;
        bottom: 0;
        opacity: 1;
      }
    }
  }
  .music {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    &::-webkit-media-controls {
      display: none !important;
    }
    &::-webkit-media-controls-play-button {
      display: -webkit-box !important;
    }
  }
}
</style>
