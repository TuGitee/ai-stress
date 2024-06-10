<template>
  <div class="start-page">
    <div class="start-page-header">
      <div class="start-page-header-left">
        <h1 class="start-page-header-left-title">
          <img src="@/assets/logo.png" alt="" />
        </h1>
        <div class="start-page-header-left-btns">
          <button class="start-page-header-left-btns-start" @click="go">
            数据可视化
          </button>
        </div>
      </div>
      <div class="start-page-header-right">
        <img src="./images/s.png" alt="" />
        <router-link
          class="start-page-header-right-link"
          :to="nav.path"
          v-for="(nav, index) in navRoutes"
          :key="nav.name"
          :style="{ top: nav.meta.top + '%', left: nav.meta.left + '%' }"
        >
          <h3 class="start-page-header-right-link-intro">
            {{ nav.meta.introduction }}
          </h3>
          <img
            src="./images/location.png"
            class="start-page-header-right-link-location"
            alt=""
          />
          <p class="start-page-header-right-link-title">{{ nav.meta.title }}</p>
        </router-link>
      </div>
    </div>
    <div class="start-page-footer">
      <div class="start-page-footer-scroll">
        <img
          :src="require(`./images/start${index}_pc.png`)"
          v-for="index in 3"
          :key="Math.random()"
          v-if="!isMobile"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavRoutes from "@/router/NavRoutes";
export default {
  data() {
    return {
      navRoutes: NavRoutes.filter((item) => item.meta.title),
      isMobile: false,
    };
  },
  methods: {
    go() {
      this.$router.push({
        path: "/screen-data",
      });
    },
    screenAdapter() {
      if (window.innerWidth < 768) {
        this.isMobile = true;
      }else {
        this.isMobile = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
};
</script>

<style lang="less" scoped>
.start-page {
  height: 100%;
  margin: auto;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 50px;
    padding-bottom: 30px;
    &-left {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
      &-title {
        text-align: center;
        & > img {
          width: 30vh;
        }
      }
      &-btns {
        display: flex;
        justify-content: center;
        &-start {
          height: 60px;
          padding: 10px 30px;
          border-radius: 9999px;
          border: none;
          background: @color;
          color: #fff;
          font-size: 20px;
          font-weight: bold;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
          &:hover {
            cursor: pointer;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2),
              5px 5px 10px rgba(0, 0, 0, 0.2) inset;
          }
        }
      }
    }

    &-right {
      height: 100%;
      width: fit-content;
      position: relative;
      & > img {
        height: 100%;
        max-height: 90vh;
        max-width: 100%;
      }
      &-link {
        position: absolute;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
          transition: all 0.1s;
          & > .start-page-header-right-link-intro {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
        }

        &-intro {
          position: absolute;
          top: -20px;
          left: 50%;
          width: 400px;
          background-color: #fffd;
          border-radius: 20px;
          padding: 20px;
          transform: translate(-50%, -100%) scale(0);
          z-index: 99;
          opacity: 0;
          box-shadow: 0 0 20px -10px #000a;
        }

        &-location {
          width: 50px;
          filter: drop-shadow(0px 0px 5px @color-dark)
            drop-shadow(0px 0px 5px @black);
          animation: jump 2s ease infinite;

          @keyframes jump {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        }

        &-title {
          color: @white;
          text-shadow: 1px 1px 2px @black;
          white-space: nowrap;
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
  }

  &-footer {
    height: calc(100% - 40px);
    overflow: hidden;
    padding: 20px;

    &-scroll {
      position: relative;
      overflow: scroll;
      height: 100%;
      border-radius: 20px;
      &::-webkit-scrollbar {
        display: none;
      }
      & > img {
        width: 100%;
        height: 100%;
        position: sticky;
        display: block;
        top: 0;
        object-fit: cover;
      }
    }
  }

  @media screen and (max-width: 768px) {
    &-header {
      flex-direction: column;
      gap: 20px;
      height: fit-content;
      &-left {
        width: 100%;
        &-title {
          & > img {
            width: 50vw;
          }
        }
        &-btns {
          &-start {
            width: 100%;
          }
        }
      }
      &-right {
        width: 100%;
        & > img {
          width: 100%;
        }
        &-link {
          &-intro {
            font-size: 16px;
            width: 200px;
            font-weight: normal;
            padding: 10px;
          }
          &-location {
            width: 30px;
          }
          &-title {
            font-size: 16px;
            white-space: pre-line;
          }
        }
      }
    }
    &-footer {
      display: none;
    }
  }
}
</style>