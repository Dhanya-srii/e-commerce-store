<template>
  <div class="cart">
    <div class="cart-wrapper">
      <h1>
        {{ 'My Shopping Cart' | toUpperCase }}
        <span class="item-count">(5)</span>
      </h1>

      <div class="cart-content">
        <div class="cart-items">
          <product-cart
            v-for="n in 5"
            :key="n"
          />
        </div>

        <div class="cart-summary">
          <p class="free-shipping">
            <i class="ri-truck-line"></i
            >{{ "You've earned free shipping" | toUpperCase }}
          </p>
          <p class="free-returns">
            <i class="ri-clockwise-line"></i
            >{{ 'Free returns on all qualifying orders' | toUpperCase }}
          </p>
          <select class="promo-select">
            <option value="">{{ 'Apply a promo card' | toUpperCase }}</option>
          </select>

          <div class="order-breakdown">
            <p class="discount-info">
              <span>{{ 'Extra 15% off applied' | toUpperCase }}</span>
              <span class="discount-amount">-₹1,613.55</span>
            </p>
            <div class="price-details">
              <p>
                <span>{{ 'Subtotal' | toUpperCase }}</span
                ><span>₹51,743</span>
              </p>
              <p>
                <span>{{ 'shipping costs' | toUpperCase }}</span
                ><span>Free</span>
              </p>
              <p>
                <span>{{ 'order discount' | toUpperCase }}</span
                ><span>-₹1,613.55</span>
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
            <h3>₹50,140.45</h3>
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

<style scoped>
.cart {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-wrapper {
  min-width: 1600px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px;
}

.cart-content {
  display: flex;
  gap: 24px;
}

.cart-items {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-count {
  color: gray;
  font-weight: 300;
}

.cart-summary {
  width: 40%;
}

.free-shipping,
.free-returns {
  border: 1px solid #d0caca;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 8px;
}
.free-shipping > i,
.free-returns > i {
  padding: 16px;
  font-size: 18px;
}
.free-shipping {
  color: green;
}

.free-returns {
  color: gray;
}

.promo-select {
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  border: none;
  font-size: 18px;
  background-color: #eeeeee;
  font-weight: 400;
}

.order-breakdown {
  border-top: 1px solid #cac8c8;
  border-bottom: 1px solid #cac8c8;
  padding: 16px 0;
}

.discount-info {
  display: flex;
  justify-content: space-between;
}
.discount-info span {
  font-weight: 300;
  font-size: 14px;
}
.discount-amount {
  color: green;
}

.price-details {
  margin-top: 24px;
  color: #5e5d5d;
  font-size: 14px;
}

.price-details p,
.total {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.total {
  margin: 38px 0;
}
.total h3 {
  font-weight: 900;
}
.total .gst-note {
  font-size: 15px;
  color: gray;
}

.checkout-button {
  width: 100%;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 16px;
  font-size: 18px;
}

.terms-text {
  font-size: 12px;
  margin: 16px 0;
  font-weight: 300;
  color: var(--primary-color);
}

.terms-text a {
  color: var(--primary-color);
}
</style>
<script>
import ProductCart from './ProductCart.vue';
import filterMixin from '@/mixins/filterMixin';
export default {
  name: 'ProductCartList',
  components: {
    ProductCart,
  },
  mixins: [filterMixin],
};
</script>
