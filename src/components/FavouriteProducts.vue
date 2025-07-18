<template>
  <div v-if="!hasFavourites">
    <h2 class="product-status-message">No Favourites Added!!</h2>
  </div>

  <div
    v-else
    class="product-list"
  >
    <product-specifications
      :totalProducts="Object.keys(favouritesList).length"
    />
    <div :class="['products', `grid-${gridColumns}`]">
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
import ProductSpecifications from './ProductSpecifications.vue';

export default {
  name: 'FavouriteProducts',
  components: {
    ProductCards,
    ProductSpecifications,
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
<style scoped src="@/styles/layout/products.scss"></style>
<style scoped src="@/styles/abstracts/root.scss"></style>
<style scoped src="@/styles/layout/base-products.scss"></style>
<style scoped src="@/styles/components/button.scss"></style>
<style scoped src="@/styles/components/visualSize.scss"></style>
