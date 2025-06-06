<template>
  <div class="category">
    <input
      id="input"
      type="checkbox"
      :value="categoryData"
      :checked="value === categoryData"
      @change="handleChange"
    />
    <p>{{ categoryData }}</p>
  </div>
</template>

<script>
export default {
  props: {
    categoryData: String,
    value: String,
  },
  methods: {
    handleChange() {
      if (this.value === this.categoryData) {
        this.$emit('input', '');
      } else {
        this.$emit('input', this.categoryData);
      }
    },
  },
};
</script>
<style scoped>
.category {
  display: flex;
  gap: 1rem;
}
