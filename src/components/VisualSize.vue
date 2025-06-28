<template>
  <div class="visual-size">
    <div class="product-length">
      <h4>{{ totalProducts }} PRODUCTS</h4>
    </div>
    <div>
      <button
        :class="['grid-button', { active: gridColumns === 2 }]"
        @click="setGridColumns(2)"
      >
        <i class="ri-layout-grid-line"></i>
      </button>
      <button
        :class="[{ active: gridColumns === 4 }]"
        @click="setGridColumns(4)"
      >
        <i class="ri-layout-grid-2-line"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: ['totalProducts'],
  computed: {
    ...mapState({
      gridColumns: (state) => state.storeProducts.gridColumns,
    }),
  },
  methods: {
    ...mapMutations(['setGridColumns']),
  },
};
</script>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/visualSize.css"></style>
<style scoped>
button.active {
  border: 1px solid #333;
}
</style>
