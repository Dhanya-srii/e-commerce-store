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

    <div class="container">
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
        <div v-else class="noProducts">
          <p class="message">Product Not Listed!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProductCards from './ProductCards.vue';
export default {
  components: {
    ProductCards,
  },
  filters: {
    firstLetterUpperCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
  data() {
    return {
      productList: [],
      uniqueCategories: [],
      selectedCategories: [],
      selectedBrands: [],
      brandsByCategory: {},
    };
  },

  computed: {
    filteredProducts() {
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
    this.productList = await this.fetchData();
    console.log(this.productList);

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
  },
  methods: {
    ...mapActions(['fetchData']),

    clearAll() {
      (this.selectedCategories = []), (this.selectedBrands = []);
    },
    removeCategory(cat) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== cat
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
