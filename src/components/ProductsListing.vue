<template>
  <div>
    <div v-if="datas.length" class="container">
      <div class="products">
        <ProductCards
          :data="data"
          v-for="(data, index) in datas"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { products } from "../api/products";
import ProductCards from "./ProductCards.vue";
export default {
  data() {
    return {
      datas: "",
    };
  },
  components: {
    ProductCards,
  },
  async created() {
    this.datas = await products.fetchAllProducts();
  },
};
</script>
<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
  display: flex;
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 2.8rem;
  flex: 2;
}
</style>
