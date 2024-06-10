<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audCtx: null,
      source: null,
      analyser: null,
      bufferLength: null,
      dataArray: null,
      music: null,
      canvas: null,
      isInit: false,
    };
  },
  computed: {
    ctx() {
      return this.canvas.getContext("2d");
    },
  },
  methods: {
    draw() {
      requestAnimationFrame(this.draw);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const bufferLength = this.analyser.frequencyBinCount / 2.5;
      const dataArray = new Uint8Array(bufferLength);

      const barWidth = (this.canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      let y = 0;

      this.analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        this.ctx.fillStyle = "#C7B0F7";
        this.ctx.fillRect(
          x + this.canvas.width / 2,
          this.canvas.height - barHeight,
          barWidth,
          barHeight
        );
        this.ctx.fillRect(
          this.canvas.width / 2 - x,
          this.canvas.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth + 1;
      }
    },
  },
  mounted() {
    this.music = document.querySelector(".music");
    this.music.muted = false;
    this.canvas = document.querySelector("canvas");
    this.music.addEventListener("play", () => {
      if (!this.isInit) {
        this.audCtx = new AudioContext();
        this.source = this.audCtx.createMediaElementSource(this.music);
        this.analyser = this.audCtx.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.audCtx.destination);
        this.analyser.fftSize = 2048;
        this.isInit = true;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
      this.draw();
    });
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
  div {
    display: block;
    &::after {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff6;
      background-size: 200% 200%;
      z-index: -999;
    }
    canvas {
      display: block;
      height: 100%;
      width: 100%;
      background-color: white;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -9999;
    }
  }
}
</style>