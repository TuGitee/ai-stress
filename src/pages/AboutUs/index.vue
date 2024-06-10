<template>
  <div class="about-us">
    <div class="about-us__header">
      <div class="about-us__header__title">
        <span>关于我们</span>
      </div>
      <div class="about-us__header__content">
        <span
          >AI Stress项目以心理疾病患者的亲友作为目标群体，综合心理疾病相关文献，邀请知名心理咨询师，统筹开展的一个心理相关疾病的服务网站，为患者亲友提供专业、靠谱的心理学帮助，达到为患者及亲友建立网络心理医院的目的，帮助心理疾病患者树立对心理疾病正确的认知。网站向所有想要获得心理疾病相关知识的市民群众开放，在不方便就医、不了解疾病具体情况的时候可以获得最严谨、最专业的帮助。</span
        >
      </div>
    </div>
    <p class="about-us__hr"></p>
    <div class="about-us__content">
      <div
        class="about-us__content__item"
        v-for="(item, index) in contentList"
        :key="index"
      >
        <img
          class="about-us__content__item__icon"
          :src="require(`@/assets/image/illness/illness_${random()}.png`)"
        />
        <div class="about-us__content__item__header">特点 {{ index + 1 }}</div>
        <div class="about-us__content__item__content">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import random from "@/utils/random";
export default {
  name: "AboutUs",
  mixin: [random],
  data() {
    return {
      contentList: [
        "心理疾病不仅是一个人的事，更是一个家庭的事。现在的心理网站大多以心理疾病患者本身作为用户群体，却忽略了心理疾病不同于一般的生理疾病，患者家属朋友的行为也会对病情造成很大的影响，有时不恰当的行为还会造成病情不同程度的恶化。AI Stress项目基于此问题，以心理疾病患者的家属和朋友为目标人群，以网站为依托，为患者亲友提供专业、靠谱的心理学帮助与建议。",
        "AI Stress项目不同于现在网上心理消息的真假参半，遵循实事求是的原则，通过大量阅读收纳文献、编写综述，做到每一句话都有据可循，真正的为需要心理知识的患者及其亲友提供帮助。项目疾病整理编写方面均是查阅众多权威论文并咨询专业心理咨询师得来的。每一疾病分栏大致分为诊断方法、社会背景、影响因素、治疗方法（心理、药物）、亲友陪伴五个板块，提供专业知识的科普之外也从心理和生理的角度减少药物带来的副作用，帮助患者更好更快地恢复。",
        "AI Stress项目是基于现代网络化发展，以及人民群众对于心理知识需求增加，心理疾病趋于年轻化的现状，开展的网络服务平台。在经济不发达或者心理健康重视程度不高的地区也可通过此项目开展的平台进行心理相关问题的查询以及专业心理咨询师的问答。帮助患者和亲友准确客观的了解心理疾病，减少因为不了解、不干预造成的相对严重的后果。",
      ],
    };
  },
  methods: {
    random() {
      return random();
    },
  },
};
</script>

<style lang="less" scoped>
.about-us {
  width: 80%;
  min-width: min-content;
  margin: auto;
  height: 100%;
  &__header {
    width: 100%;
    padding: 0 20px;
    &__title {
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
    &__content {
      width: 100%;
      height: 100%;
      padding: 20px 0;
      span {
        font-size: 16px;
        color: @font-color-light;
      }
    }
  }

  &__hr {
    width: 50%;
    margin: 20px auto;
    height: 2px;
    border-radius: 10px;
    background-color: @color;
  }
  &__content {
    width: 100%;
    padding: 20px;
    margin: auto;
    display: flex;
    &__item {
      width: 100%;
      height: 100%;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__icon {
        width: 100px;
        height: 100px;
        background-color: @grey;
        object-fit: cover;
        border-radius: 5px;
      }
      &__header {
        width: 100%;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
        color: @font-color;
      }
      &__content {
        width: 100%;
        height: 100%;
        padding: 20px 5px;
        font-size: 16px;
        text-indent: 2em;
        line-height: 1.5;
        text-align: left;
      }
      &__link {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        &__text {
          font-size: 14px;
          color: @font-color-light;
        }
        &__icon {
          font-size: 14px;
          color: @font-color-light;
          margin-left: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 668px) {
    &__content {
      flex-direction: column;
      &__item {
        width: 100%;
        height: 100%;
        padding: 20px 0;
      }
    }
  }
}
</style>