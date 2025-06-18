<template>
  <div class="ProductList">
    <div
      v-if="selectedCategories.length || selectedBrands.length"
      class="filters"
    >
      <div class="filterContainer">
        <span
          v-for="(category, Cindex) in selectedCategories"
          :key="'C' + Cindex"
          class="filter-pill"
        >
          <span>{{ category | firstLetterUpperCase }}</span>
          <button class="removeFilter" @click="removeCategory(category)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </span>

        <span
          v-for="(brand, Bindex) in selectedBrands"
          :key="'B' + Bindex"
          class="filter-pill"
        >
          <span>{{ (brand || 'All Groceries') | firstLetterUpperCase }}</span>
          <button class="removeFilter" @click="removeBrand(brand)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </span>
      </div>

      <div class="fixed-clear" @click="clearAll">Clear All</div>
    </div>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
    <div v-else class="container">
      <div class="categoryAndBrandContainer">
        <div class="categories">
          <h1>Category</h1>
          <div
            v-for="(category, index) in uniqueCategories"
            :key="index"
            class="selectable-item"
          >
            <el-checkbox
              :id="'category-' + index"
              v-model="selectedCategories"
              :label="category"
            >
              {{ category | firstLetterUpperCase }}
            </el-checkbox>
          </div>
        </div>

        <div class="brands">
          <h1>Brand</h1>
          <div class="productBrand">
            <div
              v-for="(brand, index) in allBrandsForSelectedCategories"
              :key="index"
              class="selectable-item"
            >
              <el-checkbox
                :id="'brand-' + index"
                :label="brand"
                v-model="selectedBrands"
                >{{
                  brand || 'All Groceries' | firstLetterUpperCase
                }}</el-checkbox
              >
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="filteredProducts.length" class="products">
          <ProductCards
            v-for="(product, index) in filteredProducts"
            :key="index"
            :data="product"
          />
        </div>
        <div v-else>
          <h2 class="message">Product Not Listed!</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCards from './ProductCards.vue';
import filterMixin from '@/mixins/filterMixin';
export default {
  components: {
    ProductCards,
  },

  mixins: [filterMixin],
  data() {
    return {
      productList: [],
      uniqueCategories: [],
      selectedCategories: [],
      selectedBrands: [],
      brandsByCategory: {},
      loading: true,
    };
  },

  computed: {
    ...mapState({
      searchProduct: (state) => state.storeProducts.searchProduct,
    }),
    filteredProducts() {
      if (this.searchProduct && this.searchProduct.length) {
        return this.searchProduct;
      }
      return this.productList.filter((p) => {
        const categoryMatch =
          !this.selectedCategories.length ||
          this.selectedCategories.includes(p.category);
        const brandMatch =
          !this.selectedBrands.length || this.selectedBrands.includes(p.brand);
        return categoryMatch && brandMatch;
      });
    },

    allBrandsForSelectedCategories() {
      const allBrands = new Set();
      Object.values(this.brandsByCategory).forEach((brandList) => {
        brandList.forEach((b) => allBrands.add(b));
      });
      return [...allBrands];
    },
  },

  async created() {
    try {
      this.loading = true;
      this.productList = await this.fetchData();
      const allCategories = this.productList.map((p) => p.category);
      this.uniqueCategories = [...new Set(allCategories)];
      const brandMap = {};
      this.productList.forEach(({ category, brand }) => {
        if (!brandMap[category]) {
          brandMap[category] = new Set();
        }
        brandMap[category].add(brand);
      });

      for (const category in brandMap) {
        brandMap[category] = [...brandMap[category]];
      }
      this.brandsByCategory = brandMap;
    } catch (e) {
      console.error('Error loading products:', e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(['fetchData']),

    clearAll() {
      (this.selectedCategories = []), (this.selectedBrands = []);
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
<style src="@/assets/styles/vendors/ratings.css"></style>
<style src="@/assets/styles/base/scrollbar.css"></style>
<style src="@/assets/styles/layout/base-products.css"></style>
<style src="@/assets/styles/layout/products.css"></style>
<style src="@/assets/styles/components/filter.css"></style>
<style src="@/assets/styles/components/selectable-item.css"></style>
<style src="@/assets/styles/components/loading.css"></style>
