<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img
        :src="product.thumbnail"
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

        <div class="quantity-controller">
          <div class="quantity-wrapper">
            <button class="counter-button" @click="decrement">-</button>
            <p class="quantity-display">{{ product.quantity }}</p>
            <button class="counter-button" @click="increment">+</button>
          </div>
        </div>
      </div>
      <div class="cart-item-side">
        <h3 class="cart-item-price">${{ product.price }}</h3>
        <div class="cart-item-actions">
          <button><i class="ri-edit-line"></i></button>
          <button>
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: ['product'],
  mounted() {
    console.log('productCart', this.product);
  },
  methods: {
    ...mapMutations(['updateCartQuantity']),
    increment() {
      const newQty = this.product.quantity + 1;
      this.updateCartQuantity({
        id: this.product.id,
        quantity: newQty,
      });
    },
    decrement() {
      if (this.product.quantity > 1) {
        const newQty = this.product.quantity - 1;
        this.updateCartQuantity({
          id: this.product.id,
          quantity: newQty,
        });
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/components/ProductCart.css"></style>
