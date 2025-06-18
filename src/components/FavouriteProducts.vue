<template>
  <div class="productList">
    <div>
      <h2 class="message" v-if="!Object.keys(favourites).length">
        NO FAVOURITES ADDED!!
      </h2>
      <div v-else class="products">
        <ProductCards
          v-for="(product, key) in favourites"
          :key="key"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCards from './ProductCards.vue';
import { mapState } from 'vuex';

export default {
  components: { ProductCards },

  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
  },
};
</script>

<style src="@/assets/styles/layout/products.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
