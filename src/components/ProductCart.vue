<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img
        alt="Product image"
        :src="product.images[0]"
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

        <div class="quantity-controller">
          <div class="quantity-wrapper">
            <button
              @click="decreaseQuantity"
              class="counter-button"
            >
              -
            </button>
            <p class="quantity-display">{{ product.quantity }}</p>
            <button
              @click="increaseQuantity"
              class="counter-button"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="cart-item-side">
        <h3 class="cart-item-price">${{ product.price * product.quantity }}</h3>
        <div class="cart-item-actions">
          <button><i class="ri-edit-line"></i></button>
          <button @click="removeItem">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  props: ['product'],
  methods: {
    ...mapMutations(['removeProductFromCart']),
    ...mapActions(['updateQuantity']),

    increaseQuantity() {
      this.updateQuantity({
        product: this.product,
        quantity: this.product.quantity + 1,
      });
    },
    decreaseQuantity() {
      this.updateQuantity({
        product: this.product,
        quantity: this.product.quantity - 1,
      });
    },
    removeItem() {
      this.removeProductFromCart(this.product.id);
    },
  },
};
</script>

<style scoped src="@/assets/styles/components/ProductCart.css"></style>
