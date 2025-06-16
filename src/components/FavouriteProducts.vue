<template>
  <div class="favourites">
    <div>
      <h2 v-if="!Object.keys(favourites).length">NO FAVOURITES ADDED!!</h2>
      <div class="products">
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
      favourites: (state) => state.products.favourites,
    }),
  },
};
</script>

<style src="@/assets/styles/components/favourites.css"></style>
<style src="@/assets/styles/layout/base-products.css"></style>
