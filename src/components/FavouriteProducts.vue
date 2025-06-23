<template>
  <div class="product-list">
    <div>
      <h2
        class="product-status-message"
        v-if="!hasFavourites"
      >
        No Favourites Added!!
      </h2>
      <div
        v-else
        class="products"
      >
        <product-cards
          v-for="(product, index) in favouritesList"
          :key="product.id || index"
          :productData="product"
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
      favouritesList: (state) => state.storeProducts.favouritesList,
    }),
    hasFavourites() {
      return Object.keys(this.favouritesList).length > 0;
    },
  },
};
</script>
<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
