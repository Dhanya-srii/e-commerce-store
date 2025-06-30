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
          <h4 class="product-title">
            {{ productData.title | initalCaps }}
          </h4>
          <p class="price">${{ productData.price }}</p>
        </div>
        <div>
          <button
            @click.stop="getUserCart(productData.id)"
            type="button"
            class="add-cart-button"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';
import { ROUTE_NAMES } from '../constants/Routes';
import addCart from '../api/cart';
export default {
  name: 'ProductCard',
  props: ['productData'],
  mixins: [filterMixin],
  data() {
    return {
      cartProducts: [],
    };
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
    async getUserCart(productId) {
      try {
        const data = {
          userId: 1,
          products: [
            {
              id: productId,
              quantity: 1,
            },
          ],
        };

        const response = await addCart(data);
        console.log('Added to cart:', response.data);
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    },
  },
};
</script>
<style scoped src="@/assets/styles/components/product-card.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
