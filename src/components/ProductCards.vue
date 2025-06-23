<template>
  <div
    class="product"
    @click="goToProductDetail(productData.id)"
  >
    <div class="image-container">
      <button
        class="fav-icon"
        @click.stop="updateFavList(productData)"
      >
        <i
          class="fa-solid fa-heart"
          :style="{ color: isFavourite ? 'red' : 'gray' }"
        ></i>
      </button>
      <img
        :src="productData.images[0]"
        alt="Product image"
      />
    </div>

    <div class="product-info">
      <h3 class="product-title">
        {{ productData.title | initalCaps }}
      </h3>

      <div class="flex">
        <p class="price">${{ productData.price }}</p>

        <button
          @click.stop
          type="button"
          class="add-cart-button"
        >
          + Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  name: 'ProductCard',
  props: ['productData'],
  mixins: [filterMixin],

  computed: {
    ...mapState({
      favouritesList: (state) => state.storeProducts.favouritesList,
    }),

    isFavourite() {
      return !!this.favouritesList[this.productData.id];
    },
  },
  methods: {
    ...mapMutations(['updateFavList']),
    goToProductDetail(id) {
      this.$router.push({
        name: ROUTE_NAMES.PRODUCT_DETAIL,
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style scoped src="@/assets/styles/components/product-card.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
