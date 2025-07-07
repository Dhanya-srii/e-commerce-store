<template>
  <div class="login-container">
    <div class="login-wrapper-container">
      <h3 class="title">Login / Join Us</h3>
      <p class="message">Enter your name and password to log in</p>
      <div class="user-details">
        <label class="label">NAME</label>
        <input
          required="true"
          v-model="username"
          placeholder="Name"
        />
      </div>
      <div class="user-details">
        <label class="label">PASSWORD</label>
        <input
          required="true"
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>

      <button @click="loginUserHandler">LOGIN</button>
      <div
        v-if="errorMessage"
        style="color: red"
      >
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../api/userLogin';
import { ROUTE_NAMES } from '../constants/Routes';

export default {
  data() {
    return {
      username: 'emilys',
      password: 'emilyspass',
      errorMessage: '',
    };
  },
  methods: {
    async loginUserHandler() {
      try {
        await loginUser(this.username, this.password);
        this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
      } catch {
        this.errorMessage = 'Incorrect username or password!';
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
}

.login-wrapper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
  width: 320px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: 300;
}

.message {
  font-size: 14px;
  font-weight: 300;
}

.user-details {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 12px;
  margin-bottom: 8px;
  color: #333;
}

input {
  padding: 16px 12px;
  border: 1px solid #aaa;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #959595;
  color: rgb(15, 15, 15);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
