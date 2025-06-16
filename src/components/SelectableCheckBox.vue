<template>
  <div class="selectable-item">
    <input
      type="checkbox"
      :id="item"
      :value="item"
      :checked="modelValue.includes(item)"
      @change="onCheckChange"
    />
    <label :for="item" class="item">{{
      item || 'All groceries' | firstLetterUpperCase
    }}</label>
  </div>
</template>

<script>
export default {
  name: 'SelectableCheckbox',
  props: {
    item: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  filters: {
    firstLetterUpperCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
  methods: {
    onCheckChange(event) {
      const updated = [...this.modelValue];
      if (event.target.checked && !updated.includes(this.item)) {
        updated.push(this.item);
      } else if (!event.target.checked && updated.includes(this.item)) {
        const index = updated.indexOf(this.item);
        updated.splice(index, 1);
      }
      this.$emit('update:modelValue', updated);
    },
  },
};
</script>

<style src="@/assets/styles/components/selectable-item.css"></style>
