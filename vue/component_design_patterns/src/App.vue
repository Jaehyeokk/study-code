<template>
  <div>
    <div class="nav">
      <router-link to="/common">Common</router-link>
      <router-link to="/slot">Slot</router-link>
      <router-link to="/controlled">Controlled</router-link>
      <router-link to="/renderless">Renderless</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  margin-bottom: 40px;
}

a {
  color: #222;
  padding: 5px;
}
</style>
