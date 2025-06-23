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
      <div class="filters-panel">
        <div class="category-section">
          <h1>Category</h1>
          <div
            v-for="(category, index) in availableCategories"
            :key="index"
            class="selectable-item"
          >
            <el-checkbox
              :id="'category-' + index"
              v-model="selectedCategories"
              :label="category"
            >
              {{ category | initalCaps }}
            </el-checkbox>
          </div>
        </div>

        <div class="brands">
          <h1>Brand</h1>
          <div class="product-brand">
            <div
              v-for="(brand, index) in allBrandsForSelectedCategories"
              :key="index"
              class="selectable-item"
            >
              <el-checkbox
                :id="'brand-' + index"
                :label="brand"
                v-model="selectedBrands"
                >{{ brand || 'All Groceries' | initalCaps }}</el-checkbox
              >
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          v-if="hasActiveFilters"
          class="filters"
        >
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

            <span
              v-for="(brand, index) in selectedBrands"
              :key="'Brand-' + index"
              class="filter-pill"
            >
              <span>{{ (brand || 'All Groceries') | initalCaps }}</span>
              <button
                class="remove-filter"
                @click="removeBrand(brand)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </span>
          </div>

          <div
            class="clear-filters"
            @click="clearAllFilters"
          >
            Clear All
          </div>
        </div>
        <div
          v-if="filteredProducts.length > 0"
          class="products"
        >
          <product-cards
            v-for="(product, index) in filteredProducts"
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
import { mapMutations, mapState, mapActions } from 'vuex';
// Component
import ProductCards from './ProductCards.vue';
// Mixins
import filterMixin from '@/mixins/filterMixin';

export default {
  name: 'ProductListing',
  components: {
    ProductCards,
  },

  mixins: [filterMixin],
  data() {
    return {
      availableCategories: [],
      selectedCategories: [],
      selectedBrands: [],
      brandsByCategory: {},
      isLoading: true,
    };
  },

  computed: {
    ...mapState({
      productData: (state) => state.storeProducts.productData,
    }),
    hasActiveFilters() {
      return (
        this.selectedCategories.length > 0 || this.selectedBrands.length > 0
      );
    },
    filteredProducts() {
      return this.productData.filter((product) => {
        const categoryMatch =
          !this.selectedCategories.length > 0 ||
          this.selectedCategories.includes(product.category);
        const brandMatch =
          !this.selectedBrands.length > 0 ||
          this.selectedBrands.includes(product.brand);
        return categoryMatch && brandMatch;
      });
    },

    allBrandsForSelectedCategories() {
      const brandSet = new Set();
      Object.values(this.brandsByCategory).forEach((brandList) => {
        brandList.forEach((brand) => brandSet.add(brand));
      });
      return [...brandSet];
    },
  },
  async created() {
    try {
      this.isLoading = true;
      const data = await this.getAllProducts();
      this.allCategoryandBrand(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(['getAllProducts']),
    ...mapMutations(['setproductData']),
    clearAllFilters() {
      this.selectedCategories = [];
      this.selectedBrands = [];
    },
    allCategoryandBrand(products) {
      const categories = new Set();
      const brandMap = {};

      products.forEach(({ category, brand }) => {
        categories.add(category);

        if (!brandMap[category]) {
          brandMap[category] = new Set();
        }
        brandMap[category].add(brand);
      });

      this.availableCategories = [...categories];

      for (const category in brandMap) {
        brandMap[category] = [...brandMap[category]];
      }

      this.brandsByCategory = brandMap;
    },
    removeCategory(category) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    },
    removeBrand(brand) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
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
