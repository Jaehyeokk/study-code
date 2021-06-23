<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.index">{{ item }}</li>
    </ul>
    <button @click="$emit('renewItems')">renew</button>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
