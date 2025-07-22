<template>
  <div v-if="!hasFavourites">
    <p
      class="product-status-message display-flex justify-content-center align-items-center"
    >
      No Favourites Added!!
    </p>
  </div>

  <div
    v-else
    class="product-list display-flex align-items-center flex-direction-column"
  >
    <product-specifications
      :totalProducts="Object.keys(favouritesList).length"
    />
    <div
      :class="[
        'products display-flex justify-content-start',
        `grid-${gridColumns}`,
      ]"
    >
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

