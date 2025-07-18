<template>
  <div class="product-card">
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

      <div class="product-info">
        <div class="sub-product-info">
          <h4>
            {{ productData.title | initalCaps }}
          </h4>
          <p class="price">${{ productData.price }}</p>
        </div>
        <div></div>
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
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },

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
<style scoped src="@/styles/components/product-card.css"></style>
<style scoped src="@/styles/components/button.css"></style>
<style scoped src="@/styles/abstracts/root.css"></style>
