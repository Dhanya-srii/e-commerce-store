<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img
        alt="Product image"
        :src="product.thumbnail"
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
              class="counter-button"
            >
              -
            </button>
            <p class="quantity-display">{{ product.quantity }}</p>
            <button
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
          <button >
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['product'],
 
};
</script>

<style scoped src="@/assets/styles/components/ProductCart.css"></style>
