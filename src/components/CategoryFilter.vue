<template>
  <div
    class="modal-filter-container"
    @click="toggleFilter"
  >
    <div
      class="filters-panel display-flex flex-direction-column"
      @click.stop
    >
      <loading-data v-if="isLoading" />

      <div
        v-else
        class="categories display-flex flex-direction-column"
      >
        <div
          class="filters-panel-header display-flex align-items-center justify-content-space-between"
        >
          <p class="filters-panel-title">Product Filters</p>
          <button
            @click="toggleFilter"
            class="close-filter"
          >
            <i class="ri-close-large-line"></i>
          </button>
        </div>

        <div class="filters-panel-body display-flex flex-direction-column">
          <p class="custom">Category</p>

          <div
            v-for="(category, index) in categoryList"
            :key="index"
          >
            <el-checkbox
              :label="category.slug"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category.slug }}
            </el-checkbox>
          </div>
        </div>

        <div
          class="filter-panel-footer display-flex align-items-center justify-content-center flex-direction-column"
        >
          <button
            class="clear-all"
            v-if="originalCategories.length > 0"
            @click="clearFilters"
          >
            <span>Clear All</span>
            <i class="ri-close-circle-line"></i>
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
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
import { products } from '../api/products';
import LoadingData from './LoadingData.vue';
export default {
  data() {
    return {
      categoryList: [],
      isLoading: true,
      originalCategoriesLocal: [],
    };
  },
  components: {
    LoadingData,
  },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
      originalCategories: (state) => state.storeProducts.selectedCategories,
    }),
    ...mapGetters(['isLoggedIn']),
  },

  async created() {
    try {
      this.isLoading = true;
      const categoryData = await products.fetchCategoryNames();
      this.categoryList = categoryData;
      this.originalCategoriesLocal = [...this.originalCategories];
    } catch (err) {
      alert('Error loading products: ' + err.message);
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

    applyFilters() {
      this.setSelectedCategories(this.originalCategoriesLocal);
      this.toggleFilter();
      this.getAllProductsByCategories();
    },

    clearFilters() {
      this.originalCategoriesLocal = [];
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
      this.getAllProducts();
    },
  },
};
</script>


<style lang="scss" scoped>
.filter-pill,
.clear-filters {
  background-color: rgb(238, 238, 238);
  padding: 0 18px;
  white-space: nowrap;
  text-transform: capitalize;
  font-size: 14px;
}

.remove-filter,
.ri-close-circle-line {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  font-weight: 300;
  text-align: left;
}

.clear-filters {
  flex-shrink: 0;
  font-weight: 800;
  background-color: $secondary-color;
  cursor: pointer;
  margin: 0px;
  padding: 0px;
}

.filters-panel {
  gap: 2rem;
  top: 0%;
  background-color: rgb(254, 254, 254);
  position: fixed;
  left: 0%;
  z-index: 1000;
  width: 450px;
  height: 100vh;
}

.categories {
  overflow-y: scroll;
  position: relative;
}

.filters-panel-header {
  width: 100%;
  border-bottom: 1px solid rgb(236, 233, 233);

  .filters-panel-title {
    font-weight: 600;
    font-size: 1.17em;
    padding: 16px;
  }
}

.filters-panel-body {
  gap: 2rem;
  padding: 16px;
}

.filters {
  background-color: $secondary-color;
  padding: 16px 0px;
  width: 1600px;
}

.filter-container {
  overflow-x: auto;
  flex-wrap: nowrap;
  flex: 1;
  gap: 8px;
  padding-bottom: 4px;
}

.filter-panel-footer {
  gap: 16px;
  min-width: 420px;
  min-height: 130px;
  position: sticky;
  bottom: 0;
  z-index: 1000;
  background-color: $secondary-color;
}

.filter-sort-panel {
  padding: 1rem 2rem;
  width: 100vw;
  border-bottom: 1px solid rgb(194, 192, 192);

  option {
    font-size: 14px;
  }
}

.sub-filter-sort-panel {
  min-width: 1600px;
}
</style>
