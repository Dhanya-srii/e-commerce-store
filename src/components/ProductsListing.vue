<template>
  <div>
    <div v-if="productList.length" class="container">
      <div class="categories">
        <SelectableCheckbox
          v-for="(category, index) in uniqueCategories"
          :key="index"
          v-model="selectedCategories"
          :item="category"
        />
      </div>

      <div class="brands">
        <SelectableCheckbox
          v-for="(brand, index) in allBrandsForSelectedCategories"
          :key="index"
          :item="brand"
          v-model="selectedBrands"
        />
      </div>

      <div class="products">
        <ProductCards
          v-for="(product, index) in filteredProducts"
          :key="index"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '../api/products';
import ProductCards from './ProductCards.vue';
// import ProductCategory from './ProductCategory.vue';
// import ProductBrands from './ProductBrands.vue';
import SelectableCheckbox from './SelectableCheckBox.vue';
export default {
  components: {
    ProductCards,
    // ProductCategory,
    // ProductBrands,
    SelectableCheckbox,
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
      if (!this.selectedCategories.length) return this.productList;

      return this.productList.filter((p) => {
        const categoryMatch = this.selectedCategories.includes(p.category);

        if (!this.selectedBrands.length) {
          return categoryMatch;
        }

        const brandMatch = this.selectedBrands.includes(p.brand);
        console.log(this.selectedCategories);

        return categoryMatch && brandMatch;
      });
    },
    allBrandsForSelectedCategories() {
      const allBrands = new Set();

      this.selectedCategories.forEach((category) => {
        const brands = this.brandsByCategory[category] || [];
        // console.log(brands);

        brands.forEach((b) => {
          allBrands.add(b);
          // console.log(allBrands.add(b));
        });
      });

      return [...allBrands];
    },
  },

  async created() {
    this.productList = await products.fetchAllProducts();

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
};
</script>
<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
  display: flex;
  gap: 4rem;
  /* flex-direction: column; */
}

.categories,
.brands {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 2.8rem;
  flex: 2;
}
</style>
