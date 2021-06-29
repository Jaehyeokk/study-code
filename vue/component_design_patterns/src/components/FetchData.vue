<template>
  <div>
    <slot :response="response" :loading="loading"></slot>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["url"],
  data() {
    return {
      response: null,
      loading: true,
    };
  },
  created() {
    axios
      .get(this.url)
      .then((response) => {
        this.response = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
