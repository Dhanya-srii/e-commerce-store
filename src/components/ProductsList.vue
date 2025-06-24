<template>
  <div class="product-list">
    <div
      v-if="isLoading"
      class="loading-container"
    >
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
    <div
      v-else
      class="container"
    >
      <div
        v-if="showFilters"
        class="category-section"
      >
        <category-filter :categoryList="categoryList" />
      </div>

      <div>
        <div class="user-control-button">
          <button @click="showFilters = !showFilters">FILTERS</button
          ><button>SORT BY</button>
        </div>
        <div class="filters">
          <div class="filter-container">
            <span
              v-for="(category, index) in selectedCategories"
              :key="'Cat-' + index"
              class="filter-pill"
            >
              <span>{{ category | initalCaps }}</span>
              <button
                class="remove-filter"
                @click="removeCategory(category)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </span>
          </div>

          <div
            v-if="check"
            class="clear-filters"
            @click="clearAllFilters()"
          >
            Clear All
          </div>
        </div>
        <div
          v-if="listProducts.length > 0"
          class="products"
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
    </div>
  </div>
</template>

<script>
//store
import { mapState, mapMutations, mapActions } from 'vuex';
// Component
import ProductCards from './ProductCards.vue';
import CategoryFilter from './CategoryFilter.vue';
// Mixins
import filterMixin from '@/mixins/filterMixin';
//api
import { products } from '../api/products';

export default {
  name: 'ProductListing',
  components: {
    ProductCards,
    CategoryFilter,
  },

  mixins: [filterMixin],
  data() {
    return {
      isLoading: true,
      showFilters: false,
      showModal: false,
      categoryList: [],
    };
  },

  computed: {
    ...mapState({
      productData: (state) => state.storeProducts.productData,
      selectedCategories: (state) => state.storeProducts.selectedCategories,
    }),

    listProducts() {
      return this.productData;
    },
    check() {
      return this.hasActiveFilters;
    },
  },

  async created() {
    try {
      this.isLoading = true;
      await this.getAllProducts();
      const categoryData = await products.fetchProductCategoriesList();
      this.categoryList = categoryData;
    } catch (error) {
      alert('Error loading products:', error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(['getAllProducts', 'getAllProductsByCategories',]),
    ...mapMutations([
      'clearSelectedCategories',
      'setSelectedCategories',
      'removeOneSelectedCategory',
      'hasActiveFilters',
    ]),

    clearAllFilters() {
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    removeCategory(category) {
      console.log(this.hasActiveFilters());

      this.removeOneSelectedCategory(category);
      this.getAllProductsByCategories();
    },
  },
};
</script>

<style scoped src="@/assets/styles/vendors/ratings.css"></style>
<style scoped src="@/assets/styles/base/scrollbar.css"></style>
<style scoped src="@/assets/styles/layout/base-products.css"></style>
<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/components/filter.css"></style>
<style scoped src="@/assets/styles/components/selectable-item.css"></style>
<style scoped src="@/assets/styles/components/loading.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/components/elementsVariable.css"></style>
