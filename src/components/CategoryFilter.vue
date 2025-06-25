<template>
  <div class="filter-container">
    <div
      v-if="isLoading"
      class="loading-container"
    >
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
    <div v-else>
      <div
        v-if="showFilter"
        class="filters-panel"
      >
        <div class="categories">
          <div class="filters-panel-header">
            <h3>Product Filters</h3>
            <button
              @click="toggleFilter"
              class="close-filter"
            >
              <i
                class="fa-solid fa-xmark fa-lg"
                style="color: #080808"
              ></i>
            </button>
          </div>

          <div>
            <h3 class="custom">Category</h3>
          </div>
          <div
            v-for="(category, index) in categoryList"
            :key="index"
            class="selectable-item"
          >
            <el-checkbox
              :label="category"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category | initalCaps }}
            </el-checkbox>
            <!-- <hr> -->
          </div>
        </div>
        <div class="filter-fixed-button-container">
          <button
            class="clear-all"
            v-if="originalCategories.length > 0"
            @click="clearFilters"
          >
            Clear All x
          </button>
          <button
            class="apply-filter"
            @click="applyFilters"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';
import { products } from '../api/products';

export default {
  mixins: [filterMixin],
  data() {
    return {
      categoryList: [],
      isLoading: true,
      originalCategoriesLocal: [],
    };
  },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
      originalCategories: (state) => state.storeProducts.selectedCategories,
    }),

    // originalCategories: {
    //   get() {
    //     return this.$store.state.storeProducts.selectedCategories;
    //   },
    //   set(value) {
    //     this.setSelectedCategories(value);
    //   },
    // },
  },

  async created() {
    try {
      this.isLoading = true;
      const categoryData = await products.fetchProductCategoriesList();
      this.categoryList = categoryData;
      this.originalCategoriesLocal = [...this.originalCategories];
    } catch (err) {
      alert('Error loading products:', err);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    ...mapMutations([
      'setSelectedCategories',
      'clearSelectedCategories',
      'toggleFilter',
    ]),
    ...mapActions(['getAllProductsByCategories']),

    clearFilters() {
      this.originalCategoriesLocal = [];

      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    applyFilters() {
      this.setSelectedCategories(this.originalCategoriesLocal);

      this.getAllProductsByCategories();
    },
  },
};
</script>

<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/elementsVariable.css"></style>
<style scoped>
/* .filter-container {
position: ;
} */
</style>
