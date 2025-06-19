<template>
  <div>
    <div class="product" @click="goToProductDetail(productData.id)">
      <div class="image-container">
        <button class="fav-icon" @click.stop="setFavList(productData)">
          <i
            class="fa-solid fa-heart"
            :style="{ color: isFavourite ? 'red' : 'gray' }"
          ></i>
        </button>
        <img :src="productData.images[0]" alt="Product image" />
      </div>

      <div class="product-info">
        <h3 class="product-title">
          {{ productData.title | initalCaps }}
        </h3>

        <div class="flex">
          <p class="price">${{ productData.price }}</p>

          <button @click.stop type="button" class="add-cart-button">
            + Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';

export default {
  name: 'ProductCard',
  props: ['productData'],
  mixins: [filterMixin],
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
    isFavourite() {
      return !!this.favourites[this.productData.id];
    },
  },
  methods: {
    ...mapMutations(['setFavList']),
    goToProductDetail(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
<style src="@/assets/styles/components/product-card.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
