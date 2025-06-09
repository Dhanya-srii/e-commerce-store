<template>
  <div class="selectable-item">
    <input
      type="checkbox"
      :value="item"
      :checked="isChecked"
      @change="handleChange"
    />
    <p>{{ item }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    item: {
      type: String,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.value.includes(this.item);
    },
  },
  methods: {
    handleChange(event) {
      const updated = [...this.value];
      if (event.target.checked && !updated.includes(this.item)) {
        updated.push(this.item);
      } else if (!event.target.checked && updated.includes(this.item)) {
        const index = updated.indexOf(this.item);
        updated.splice(index, 1);
      }
      this.$emit('input', updated);
    },
  },
};
</script>

<style scoped>
.selectable-item {
  display: flex;
  gap: 1rem;
}
</style>
