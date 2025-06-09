<template>
  <div>
    <div v-if="productList.length" class="container">
      <div>
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
          <SelectableCheckbox
            v-for="(brand, index) in allBrandsForSelectedCategories"
            :key="index"
            :item="brand"
            v-model="selectedBrands"
          />
        </div>
      </div>
      <div>
        <div class="products">
          <ProductCards
            v-for="(product, index) in filteredProducts"
            :key="index"
            :data="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '../api/products';
import ProductCards from './ProductCards.vue';
import SelectableCheckbox from './SelectableCheckBox.vue';
export default {
  components: {
    ProductCards,
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

      if (!this.selectedCategories.length) {
        Object.values(this.brandsByCategory).forEach((brandList) => {
          brandList.forEach((b) => allBrands.add(b));
        });
      } else {
        this.selectedCategories.forEach((category) => {
          const brands = this.brandsByCategory[category] || [];
          console.log(brands);

          brands.forEach((b) => allBrands.add(b));
        });
      }

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
};
</script>
<style>
.container {
  max-width: 1400px;
  margin: 5rem auto;
  margin-top: 5rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* gap: 10rem; */
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
