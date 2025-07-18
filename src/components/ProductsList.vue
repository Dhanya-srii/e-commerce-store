<template>
  <loading-data v-if="isLoading" />
  <div
    v-else
    v-lazy:30="getAllProducts"
    class="product-list"
  >
    <div
      v-if="listProducts.length"
      class="filter-sort-panel"
    >
      <div class="sub-filter-sort-panel">
        <button @click="toggleFilter">
          <span>FILTERS</span><i class="ri-equalizer-3-line"></i></button
        ><select
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
      class="filters"
    >
      <div class="filter-container">
        <button
          v-for="(category, index) in selectedCategories"
          :key="'Cat-' + index"
          class="filter-pill"
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
        class="clear-filters"
        v-if="selectedCategories.length > 0"
        @click="clearAllFilters()"
      >
        <span>Clear All</span> <i class="ri-close-circle-line"></i>
      </button>
    </div>

    <div
      v-if="listProducts.length > 0"
      :class="['products', `grid-${gridColumns}`]"
    >
      <product-cards
        v-for="(product, index) in listProducts"
        :key="index"
        :productData="product"
      />
    </div>

    <div v-else>
      <h2 class="product-status-message">Product Not Listed!</h2>
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
      obj: {
        a: 1,
        b: 2,
      },
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
        this.setProductData(sortedProducts.data);
      } catch (err) {
        alert('Error fetching sorted products:', err.message);
      }
    },
  },
};
</script>

<style scoped src="@/styles/vendors/ratings.css"></style>
<style scoped src="@/styles/base/scrollbar.css"></style>
<style scoped src="@/styles/layout/base-products.css"></style>
<style scoped src="@/styles/layout/products.css"></style>
<style scoped src="@/styles/components/filter.css"></style>
<style scoped src="@/styles/components/selectable-item.css"></style>
<style scoped src="@/styles/components/button.css"></style>
<style scoped src="@/styles/components/elementsVariable.css"></style>
<style scoped>
.load {
  padding: 16px;
  margin: 16px;
  height: 16px;
  width: 50px;
}
</style>
