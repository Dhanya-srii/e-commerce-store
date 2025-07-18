<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img
        :src="product.images[0]"
        alt="Product image"
      />
      <span class="cart-item-stock"><i class="ri-check-line"></i>IN STOCK</span>
    </div>
    <div class="cart-item-content">
      <div class="cart-item-info">
        <h2 class="cart-item-title">{{ product.title }}</h2>
        <div class="cart-item-details">
          <p><span>Color:</span> High Risk Red-Puma Black</p>
          <p><span>Size:</span> UK 8</p>
          <p><span>Style number:</span> 311887_01</p>
        </div>

        <div class="addCart-details">
          <button
            class="counter-button"
            @click="updateCart({ id: product.id, quantityChange: -1 })"
          >
            -
          </button>
          <span>{{ product.quantity }}</span>
          <button
            class="counter-button"
            @click="updateCart({ id: product.id, quantityChange: 1 })"
          >
            +
          </button>
        </div>
      </div>
      <div class="cart-item-side">
        <h3 class="cart-item-price">
          ${{ (product.price * product.quantity).toFixed(2) }}
        </h3>
        <div class="cart-item-actions">
          <button><i class="ri-edit-line"></i></button>
          <button @click="updateCart({ id: product.id, remove: true })">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['updateCart']),
  },
};
</script>

<style lang="scss" scoped src="@/styles/components/ProductCart.scss"></style>
<style lang="scss" scoped src="@/styles/components/button.scss"></style>
