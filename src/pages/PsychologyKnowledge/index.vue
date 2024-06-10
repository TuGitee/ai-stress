<template>
  <div class="psychology-knowledge">
    <PsychologyItem
      v-for="(item, index) in psychologyList"
      :key="index"
      :item="item"
      class="psychology-knowledge-item"
    />
  </div>
</template>

<script>
import PsychologyItem from "@/components/PsychologyItem";
import { mapState } from "vuex";
export default {
  components: {
    PsychologyItem,
  },
  mounted() {
    this.$store.state.psychology.psychologyList.length ||
      this.$store.dispatch("getPsychologyList");
  },
  computed: {
    ...mapState({
      psychologyList: (state) => state.psychology.psychologyList,
    }),
  },
};
</script>

<style lang="less" scoped>
.psychology-knowledge {
  padding: 30px;
  width: 80%;
  margin: auto;
  @media (max-width: 480px) {
    padding: 30px 20px;
    width: 100%;
  }
}
</style>