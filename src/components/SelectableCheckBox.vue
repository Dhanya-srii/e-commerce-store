<template>
  <div class="selectable-item">
    <input
      type="checkbox"
      :value="item"
      :checked="isChecked"
      @change="handleChange"
    />
    <p class="item">{{ item || 'All groceries' | firstLetterUpperCase }}</p>
  </div>
</template>

<script>
export default {
  filters: {
    firstLetterUpperCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
  props: {
    value: {
      type: Array,
    },
    item: {
      type: String,
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
input {
  width: 1.3rem;
}
.item {
  font-size: 1.1rem;
}
</style>
