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
          class="product-image display-block"
          :src="productData.images[0]"
          alt="Product image"
        />
      </div>

      <div
        class="product-info display-flex align-items-start justify-content-center flex-direction-column"
      >
        <div
          class="sub-product-info display-flex align-items-start justify-content-space-between"
        >
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
<style scoped lang="scss">
.product-card {
  gap: 16px;
  padding-right: 20px;
  padding-left: 12px;
  margin-bottom: 16px;
  cursor: pointer;
}

.image-container {
  background-color: rgb(240, 240, 240);
  overflow: hidden;
  position: relative;
}

.product-image {
  padding: 16px;
  width: 300px;
  height: 320px;
  object-fit: cover;
  margin: 0 auto;
}

.product-info {
  padding: 8px;
}

.sub-product-info {
  min-width: 350px;
  margin-bottom: 8px;
  padding-top: 8px;

  .product-card-title {
    word-wrap: break-word;
    font-weight: 800;
    text-align: left;
    line-height: 24px;
    max-width: 200px;
  }

  .card-price {
    font-weight: 800;
    color: brown;
  }
}

.grid-2 {
  .product-card {
    max-width: 50%;
    flex: 50%;
  }

  .product {
    min-height: 600px;
    min-width: 765px;

    .product-image {
      padding: 16px;
      width: 500px;
      height: 500px;
      object-fit: cover;
    }
  }

  .sub-product-info {
    gap: 16px;
    min-width: 760px;
  }
}
</style>

