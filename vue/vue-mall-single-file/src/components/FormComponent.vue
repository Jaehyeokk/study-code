<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" @keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus>
    <button v-show="inputValue.length" @click="onReset" type="reset" class="btn-reset"></button>
  </form>
</template>

<script>
export default {
  props: [ 'value' ],
  data() {
    return {
      inputValue: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    onSubmit() {
      this.$emit('@submit', this.inputValue.trim())
    },
    onKeyup() {
      if(!this.inputValue.length) this.onReset()
    },
    onReset() {
      this.$emit('@reset')
    },
  }
}
</script>