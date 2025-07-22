<template>
  <loading-data v-if="isLoading" />
  <div
    v-else
    v-lazy:30="getAllProducts"
    class="product-list display-flex align-items-center flex-direction-column"
  >
    <div
      v-if="listProducts.length"
      class="filter-sort-panel display-flex align-items-center justify-content-center"
    >
      <div
        class="sub-filter-sort-panel display-flex align-items-center justify-content-space-between"
      >
        <button
          @click="toggleFilter()"
          class="filter-sort-panel-button"
        >
          <span>FILTERS</span><i class="ri-equalizer-3-line"></i></button
        ><select
          class="select-product"
          v-model="selectedOption"
          @change="handleOptionChange"
        >
          <option
            value=""
            disabled
          >
            SORT BY
          </option>
          <option value="asc">Price Low To High</option>
          <option value="desc">Price High To Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>
    </div>
    <product-specifications
      v-if="listProducts.length"
      :totalProducts="listProducts.length"
    />

    <div
      v-if="selectedCategories.length"
      class="filters display-flex justify-content-center"
    >
      <div class="filter-container display-flex">
        <button
          v-for="(category, index) in selectedCategories"
          :key="'Cat-' + index"
          class="filter-pill display-flex align-items-center justify-content-space-between"
        >
          <span>{{ category }}</span>
          <button
            class="remove-filter"
            @click="removeCategory(category)"
          >
            <i class="ri-close-line"></i>
          </button>
        </button>
      </div>

      <button
        class="clear-filters display-flex align-items-center justify-content-space-between"
        v-if="selectedCategories.length > 0"
        @click="clearAllFilters()"
      >
        <span>Clear All</span> <i class="ri-close-circle-line"></i>
      </button>
    </div>

    <div
      v-if="listProducts.length > 0"
      :class="[
        'products display-flex justify-content-start',
        `grid-${gridColumns}`,
      ]"
    >
      <product-cards
        v-for="(product, index) in listProducts"
        :key="index"
        :productData="product"
      />
    </div>

    <div v-else>
      <p
        class="product-status-message display-flex justify-content-center align-items-center"
      >
        Product Not Listed!
      </p>
    </div>
  </div>
</template>

<script>
//store
import { mapState, mapMutations, mapActions } from 'vuex';
// Component
import ProductCards from './ProductCards.vue';
import LoadingData from './LoadingData.vue';
import ProductSpecifications from './ProductSpecifications.vue';
// api
import { products } from '/src/api/products.js';
// directives
import { lazy } from '/src/directives/lazy.js';

export default {
  name: 'ProductListing',
  components: {
    ProductCards,
    ProductSpecifications,
    LoadingData,
  },
  directives: {
    lazy: lazy,
  },
  data() {
    return {
      isLoading: true,
      categoryList: [],
      selectedOption: '',
      isClicked: false,
    };
  },

  computed: {
    ...mapState({
      productData: (state) => state.storeProducts.productData,
      selectedCategories: (state) => state.storeProducts.selectedCategories,
      showFilter: (state) => state.storeProducts.showFilter,
      gridColumns: (state) => state.storeProducts.gridColumns,
    }),

    listProducts() {
      return this.productData;
    },
  },

  async created() {
    try {
      this.isLoading = true;
      await this.getAllProducts();
    } catch (error) {
      alert('Error loading products:', error);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    ...mapActions(['getAllProducts', 'getAllProductsByCategories']),
    ...mapMutations([
      'setProductData',
      'clearSelectedCategories',
      'removeOneSelectedCategory',
      'toggleFilter',
      'setTotalProducts',
    ]),
    clearAllFilters() {
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    removeCategory(category) {
      this.removeOneSelectedCategory(category);
      this.getAllProductsByCategories();
    },
    async handleOptionChange() {
      try {
        if (!this.selectedOption) return;
        if (this.selectedOption === 'latest') {
          return this.clearAllFilters();
        }
        const sortedProducts = await products.fetchProductsByPrice(
          this.selectedOption
        );
        this.setTotalProducts(sortedProducts.length);
        this.setProductData(sortedProducts.data);
      } catch (err) {
        alert('Error fetching sorted products:', err.message);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.filter-sort-panel {
  padding: 1rem 2rem;
  width: 100vw;
  border-bottom: 1px solid rgb(194, 192, 192);

  option {
    font-size: 14px;
  }
}

.sub-filter-sort-panel {
  min-width: 1600px;
}
</style>
