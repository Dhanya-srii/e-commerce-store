


<template>
  <div class="favourites">
    <h2 v-if="!favourites.length">No Favourites listed</h2>
    <div class="products">
      <ProductCards v-for="product in favourites" :key="product.id" :data="product" />
    </div>
  </div>
</template>

<script>
import ProductCards from "./ProductCards.vue";

export default {
  components: { ProductCards },
  computed: {
    favourites() {
      return this.$store.getters.allFavourites;
    },
  },
};
</script>

<style scoped>
.favourites{
margin-top:8rem;
}
</style>