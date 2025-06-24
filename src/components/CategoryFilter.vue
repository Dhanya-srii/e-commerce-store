<template>
  <div class="filter-container">
    <div class="filters-panel modal">
      <div class="categories">
        <div class="filters-panel-header">
          <h3>Product Filters</h3>
          <button class="close-filter">
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
            v-model="originalCategories"
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
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import filterMixin from '../mixins/filterMixin';

export default {
  props: ['categoryList'],

  mixins: [filterMixin],

  computed: {
    originalCategories: {
      get() {
        return this.$store.state.storeProducts.selectedCategories;
      },
      set(value) {
        this.setSelectedCategories(value);
      },
    },
  },

  methods: {
    ...mapMutations(['setSelectedCategories', 'clearSelectedCategories']),
    ...mapActions(['getAllProductsByCategories']),

    clearFilters() {
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    applyFilters() {
      this.getAllProductsByCategories();
    },

    hello() {
      console.log(this.showFilters);
    },
  },
};
</script>
// here why not access by map state this.selected categoires err(maximum call
stack) and couldnt mutate to hide filters
<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/elementsVariable.css"></style>
<style scoped>
.filter-container {
}
</style>
