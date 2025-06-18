<template>
  <div>
    <div class="product" @click="handleSingleProduct(data.id)">
      <div class="imageContainer">
        <button class="fav" @click.stop="setFavList(data)">
          <i
            class="fa-solid fa-heart"
            :style="{ color: isFav() ? 'red' : 'gray' }"
          ></i>
        </button>
        <img :src="data.images[0]" alt="product image" />
      </div>
      <div>
        <h3>{{ data.title |firstLetterUpperCase }}</h3>
        <div class="flex">
          <p class="price">${{ data.price }}</p>
          <button @click.stop class="addCart">+ Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';

export default {
  props: ['data'],
  mixins: [filterMixin],
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
  },
  methods: {
    ...mapMutations(['setFavList']),
    handleSingleProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    isFav() {
      return this.favourites[this.data.id] !== undefined;
    },
  },
};
</script>
<style src="@/assets/styles/components/product-card.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
