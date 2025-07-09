<template>
  <div v-if="!hasFavourites">
    <h2 class="product-status-message">No Favourites Added!!</h2>
  </div>

  <div
    v-else
    class="product-list"
  >
    <visual-size :totalProducts="Object.keys(favouritesList).length" />
    <div :class="['fav-products', `grid-${gridColumns}`]">
      <product-cards
        v-for="(product, index) in favouritesList"
        :key="product.id || index"
        :productData="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCards from './ProductCards.vue';
import { mapGetters, mapState } from 'vuex';
import VisualSize from './VisualSize.vue';

export default {
  name: 'FavouriteProducts',
  components: {
    ProductCards,
    VisualSize,
  },
  computed: {
    ...mapState({
      gridColumns: (state) => state.storeProducts.gridColumns,
      favouritesList: (state) => state.storeProducts.favouritesList,
    }),

    ...mapGetters(['hasFavourites']),
  },
};
</script>
<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
<style scoped src="@/assets/styles/layout/base-products.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/visualSize.css"></style>
