<template>
  <div class="product-card display-flex justify-content-center">
    <div
      class="product"
      @click="goToProductDetail(productData.id)"
    >
      <div class="image-container">
        <button
          class="fav-icon"
          @click.stop="updateFavList(productData)"
        >
          <i :class="[isFavourite ? 'ri-heart-fill' : 'ri-heart-line']"></i>
        </button>
        <img
          class="product-image"
          :src="productData.images[0]"
          alt="Product image"
        />
      </div>

      <div class="product-info display-flex align-items-start justify-content-center" >
        <div class="sub-product-info display-flex align-items-start justify-content-space-between">
          <p class="product-card-title">
            {{ productData.title }}
          </p>
          <p class="card-price">${{ productData.price }}</p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { ROUTE_NAMES } from '../constants/Routes';
export default {
  name: 'ProductCard',
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
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
<style lang="scss" scoped src="@/styles/components/product-card.scss"></style>
<style lang="scss" scoped src="@/styles/components/button.scss"></style>
<style lang="scss" scoped src="@/styles/abstracts/root.scss"></style>
