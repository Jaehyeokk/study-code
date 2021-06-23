<template>
  <div>
    <ul>
      <Slot-item>item 1</Slot-item>
      <Slot-item>item 2 <button>button</button></Slot-item>
      <Slot-item>item 3 <img src="../assets/logo.png" alt="logo"/></Slot-item>
      <Slot-item style="color: blue;">item 4</Slot-item>
    </ul>
  </div>
</template>

<script>
import SlotItem from "../components/SlotItem.vue";
export default {
  components: {
    SlotItem,
  },
};
</script>

<style></style>
