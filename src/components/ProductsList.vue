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
        v-if="showFilters || hasActiveFilters"
        class="filters-panel modal"
      >
        <div class="filters-panel-header">
          <h2>PRODUCT FILTERS</h2>
          <button
            @click="showFilters = !showFilters"
            class="close-filter"
          >
            x
          </button>
        </div>
        <hr />
        <div class="category-section">
          <div><h3>CATEGORY</h3></div>
          <div class="categories">
            <div
              v-for="(category, index) in categoryList"
              :key="index"
              class="selectable-item"
            >
              <el-checkbox
                v-model="selectedCategories"
                :label="category"
                :id="'category-' + index"
                class="custom"
              >
                {{ category | initalCaps }}
              </el-checkbox>
            </div>
          </div>
          <div class="filter-fixed-button-container">
            <button
              v-if="hasActiveFilters"
              @click="clearAllFilters"
            >
              Clear All ×
            </button>
            <button
              @click="filteredProducts()"
              class="apply-filter"
            >
              Apply
            </button>
          </div>
        </div>
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
            v-if="hasActiveFilters"
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
import { mapState, mapActions } from 'vuex';
// Component
import ProductCards from './ProductCards.vue';
// Mixins
import filterMixin from '@/mixins/filterMixin';
//api
import { products } from '../api/products';

export default {
  name: 'ProductListing',
  components: {
    ProductCards,
  },

  mixins: [filterMixin],
  data() {
    return {
      selectedCategories: [],
      getData: [],
      isLoading: true,
      showFilters: false,
      showModal: false,
      categoryList: [],
    };
  },

  computed: {
    ...mapState({
      productData: (state) => state.storeProducts.productData,
    }),

    listProducts() {
      return this.productData;
    },
    hasActiveFilters() {
      return this.selectedCategories.length > 0;
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
    ...mapActions(['getAllProducts']),

    async filteredProducts() {
      try {
        const data = await products.fetchProductCategories(
          this.selectedCategories
        );
        this.getData = data;
        console.log(this.getData);
      } catch (err) {
        alert('err');
      }
    },

    clearAllFilters() {
      this.selectedCategories = [];
    },

    removeCategory(category) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
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
