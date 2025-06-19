<template>
  <div class="product-list">
    <div>
      <h2 class="product-status-message" v-if="!hasFavourites">
        No Favourites Added!!
      </h2>
      <div v-else class="products">
        <product-cards
          v-for="(product, index) in favourites"
          :key="product.id || index"
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
  name: 'FavouriteProducts',
  components: {
    ProductCards,
  },
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
    hasFavourites() {
      return Object.keys(this.favourites).length > 0;
    },
  },
};
</script>
<style src="@/assets/styles/layout/products.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
