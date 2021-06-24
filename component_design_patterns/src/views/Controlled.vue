<template>
  <div>
    <Check-box v-model="checked"></Check-box>
  </div>
</template>

<script>
import CheckBox from "../components/CheckBox.vue";
export default {
  components: {
    CheckBox,
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>

<style></style>
