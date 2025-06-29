<template>
  <div class="cart-container">
    <div class="cart-wrapper-container"></div>
  </div>
</template>
<style scoped>
.cart-container {
  width: 100vw;
  height: 100vh;
  border: 1px solid rgb(216, 37, 37);
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-wrapper-container {
  min-width: 1600px;
  border: 1px solid black;
}
</style>
<script>
export default {
  name: 'ProductCart',
};
</script>
