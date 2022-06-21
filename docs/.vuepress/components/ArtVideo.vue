<template>
  <div ref="artRef" :style="style"></div>
</template>
<script>
import Artplayer from "artplayer";
export default {
  data() {
    return {
      instance: null,
      option: {
        url: "https://artplayer.org/assets/sample/video.mp4",
        isLive: false,
        muted: false,
        autoplay: false,
        pip: true,
        autoSize: true,
        autoMini: true,
        screenshot: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        theme: "#23ade5",
        lang: navigator.language.toLowerCase(),
        whitelist: ["*"],
        moreVideoAttr: {
          crossOrigin: "anonymous",
        },
      },
      style: {
        width: "60rem",
        height: "30rem",
        margin: "60px auto 0",
      },
    };
  },

  mounted() {
    this.instance = new Artplayer({
      ...this.option,
      container: this.$refs.artRef,
    });
    this.$nextTick(() => {
      this.$emit("get-instance", this.instance);
    });
  },
  beforeUnmount() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy(false);
    }
  },
};
</script>
