<template>
  <div>
    <fetch-data url="https://jsonplaceholder.typicode.com/todos/1">
      <template v-slot="{ response, loading }">
        <div v-if="loading">loading...</div>
        <div v-if="!loading">{{ response }}</div>
      </template>
    </fetch-data>
  </div>
</template>

<script>
import FetchData from "../components/FetchData.vue";
export default {
  components: {
    FetchData,
  },
};
</script>

<style></style>
