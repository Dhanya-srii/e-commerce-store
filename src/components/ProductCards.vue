<template>
  <div>
    <div class="product" @click="handleProductDetailRoute(data.id)">
      <div class="imageContainer">
        <button class="fav-icon" @click.stop="setFavList(data)">
          <i
            class="fa-solid fa-heart"
            :style="{ color: isFav ? 'red' : 'gray' }"
          ></i>
        </button>
        <img :src="data.images[0]" alt="Product image" />
      </div>

      <div>
        <h3 class="productTitle">
          {{ data.title | initalCaps }}
        </h3>

        <div class="flex">
          <p class="price">${{ data.price }}</p>

          <button @click.stop type="button" class="addCart">+ Add</button>
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
  props: ['data'],
  mixins: [filterMixin],
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),

    isFav() {
      return !!this.favourites[this.data.id];
    },
  },
  methods: {
    ...mapMutations(['setFavList']),
    handleProductDetailRoute(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
<style src="@/assets/styles/components/product-card.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
