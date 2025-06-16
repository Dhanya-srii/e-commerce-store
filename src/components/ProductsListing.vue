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
          <span>{{ brand || 'All Groceries' | firstLetterUpperCase }}</span>
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
          <SelectableCheckbox
            v-for="(category, index) in uniqueCategories"
            :key="index"
            v-model="selectedCategories"
            :item="category"
          />
        </div>

        <div class="brands">
          <h1>Brand</h1>
          <div class="brand">
            <SelectableCheckbox
              v-for="(brand, index) in allBrandsForSelectedCategories"
              :key="index"
              :item="brand"
              v-model="selectedBrands"
            />
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
import { mapGetters } from 'vuex';
import { products } from '../api/products';
import ProductCards from './ProductCards.vue';
import SelectableCheckbox from './SelectableCheckBox.vue';
export default {
  components: {
    ProductCards,
    SelectableCheckbox,
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
    ...mapGetters(['getSearchedProduct']),

    filteredProducts() {
      if (this.getSearchedProduct) {
        return [this.getSearchedProduct];
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
    this.productList = await products.fetchAllProducts();
    // console.log(this.productList);

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
      // console.log(brandMap[category]);
    }

    this.brandsByCategory = brandMap;
  },
  methods: {
    clearAll() {
      (this.selectedCategories = []), (this.selectedBrands = []);
      this.$store.commit('getSearchedProduct', null);
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
<style src="@/assets/styles/base/typography.css"></style>
<style src="@/assets/styles/base/scrollbar.css"></style>
<style src="@/assets/styles/layout/base-products.css"></style>

<style src="@/assets/styles/layout/products.css"></style>
<style src="@/assets/styles/components/filter.css"></style>
