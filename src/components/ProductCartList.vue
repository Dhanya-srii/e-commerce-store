<template>

  <div class="cart">
    <h1 v-if="getAddedCartProducts.length === 0">No items in cart.</h1>

    <div
      v-else
      class="cart-wrapper"
    >
      <h1>
        {{ 'My Shopping Cart' | toUpperCase }}
        <span class="item-count">({{ getAddedCartProducts.length || 0 }})</span>
      </h1>

      <div class="cart-content">
        <div class="cart-items">
          <product-cart
            v-for="product in getAddedCartProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="cart-summary">
          <p class="free-shipping">
            <i class="ri-truck-line"></i>
            {{ "You've earned free shipping" | toUpperCase }}
          </p>
          <p class="free-returns">
            <i class="ri-clockwise-line"></i>
            {{ 'Free returns on all qualifying orders' | toUpperCase }}
          </p>
          <select class="promo-select">
            <option value="">{{ 'Apply a promo card' | toUpperCase }}</option>
          </select>

          <div class="order-breakdown">
            <p class="discount-info">
              <span>{{ 'Extra 15% off applied' | toUpperCase }}</span>
              <span class="discount-amount"></span>
            </p>
            <div class="price-details">
              <p>
                <span>{{ 'Subtotal' | toUpperCase }}</span>
                <span>${{ cartSubtotal }}</span>
              </p>
              <p>
                <span>{{ 'shipping costs' | toUpperCase }}</span>
                <span>Free</span>
              </p>
              <p>
                <span>{{ 'order discount' | toUpperCase }}</span>
                <span>${{cartSubtotal}}</span>
              </p>
            </div>
          </div>

          <div class="total">
            <h3>
              {{ 'Grand Total' | toUpperCase }}
              <span class="gst-note">{{
                'Prices include GST' | toUpperCase
              }}</span>
            </h3>
            <h3>${{ cartSubtotal }}</h3>
          </div>

          <button class="checkout-button">
            {{ 'Checkout' | toUpperCase }}
          </button>
          <p class="terms-text">
            By continuing, I confirm that I have read and accept the
            <a href="#">Terms and Conditions</a> and the
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from './ProductCart.vue';
import filterMixin from '@/mixins/filterMixin';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductCartList',
  components: { ProductCart },
  mixins: [filterMixin],
  mounted() {
    console.log("getCartedProducts",this.getAddedCartProducts.total,this.getAddedCartProducts);
  },
  computed: {
    ...mapGetters(['getAddedCartProducts']),
    cartSubtotal() {
      return this.getAddedCartProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
};
</script>

<style scoped src="@/assets/styles/components/ProductCartList.css"></style>
