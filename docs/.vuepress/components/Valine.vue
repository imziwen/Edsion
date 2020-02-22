<template>
  <div>
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  name: "Valine",
  mounted: function() {
    // require window
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      this.window = window;
      window.AV = require("leancloud-storage");
    }
    new Valine({
      el: "#vcomments",
      appId: "i8TvBJNEW9QHt5FoWRMwgjzt-gzGzoHsz", // your appId
      appKey: "3dBEGx4eFPrWLM60rLWYrRXE", // your appKey
      notify: false,
      verify: false,
      avatar: "retro",
      placeholder: "大佬请上座：)",
      visitor: "true"
    });
  }
};
</script>

<style></style>
