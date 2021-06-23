<template>
  <div>
    <Common-header :commonTitle="title"></Common-header>
    <Common-contents @renewItems="renewItems" :items="items"></Common-contents>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import CommonContents from "../components/CommonContents.vue";
export default {
  components: {
    CommonHeader,
    CommonContents,
  },
  data() {
    return {
      title: "Common Title",
      items: ["10", "20", "30"],
    };
  },
  methods: {
    renewItems() {
      this.items = ["40", "50", "60"];
    },
  },
};
</script>

<style></style>
