<template>
  <div
    v-if="isLoading"
    class="loading-container"
  >
    <div class="spinner"></div>
    <p>Loading products...</p>
  </div>

  <div
    v-else
    class="product-list"
  >
    <div
      v-if="listProducts.length"
      class="user-control-button"
    >
      <div class="sub-user-control-button">
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
    <visual-size
      v-if="listProducts.length"
      :totalProducts="listProducts.length"
    />

    <div
      v-if="listProducts.length"
      class="filters"
    >
      <div class="filter-container">
        <button
          v-for="(category, index) in selectedCategories"
          :key="'Cat-' + index"
          class="filter-pill"
        >
          <span>{{ category | initalCaps }}</span>
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
      <button
        class="load"
        @click="getAllProducts()"
      >
        load
      </button>
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
// Mixins
import filterMixin from '@/mixins/filterMixin';
import VisualSize from './VisualSize.vue';
// api
import { products } from '/src/api/products.js';
export default {
  name: 'ProductListing',
  components: {
    ProductCards,
    VisualSize,
  },

  mixins: [filterMixin],
  data() {
    return {
      isLoading: true,
      categoryList: [],
      selectedOption: '',
    };
  },
  watch: {
    $route(to, from) {
      console.log('Route changed from:', from.path, 'to:', to.path);
    },
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
        this.setProductData(sortedProducts);
      } catch (err) {
        alert('Error fetching sorted products:', err.message);
      }
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
<style scoped>
.load {
  padding: 16px;
  margin: 16px;
  height: 16px;
  width: 50px;
}
</style>
