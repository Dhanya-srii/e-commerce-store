
  
  <script>
  import { EventBus } from '../main';
  
  export default {
    data() {
      return {
        favourites: [],
      };
    },
    mounted() {
      EventBus.$on("toggle-favourite", (product) => {
        const index = this.favourites.findIndex((item) => item.id === product.id);
        if (index === -1) {
          this.favourites.push(product);
        } else {
          this.favourites.splice(index, 1);
        }
      });
    },
    methods: {
      toggleFav(id) {
        const item = this.favourites.find((f) => f.id === id);
        if (item) {
          EventBus.$emit("toggle-favourite", item);
        }
      },
    },
  };
  </script>
  <style scoped>
  .fav {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  <template>
    <div>
      <h1>I'm from favourites</h1>
  
      <div v-if="favourites.length">
        <div v-for="item in favourites" :key="item.id" style="border:1px solid gray; padding:1rem; margin:1rem;">
          <img :src="item.image" style="width: 100px;" />
          <p>{{ item.title }}</p>
          <p>${{ item.price }}</p>
          <button class="fav" @click="toggleFav(item.id)">
            <i class="fa-solid fa-heart" style="color: red;"></i>
          </button>
        </div>
      </div>
      <div v-else>
        <p>No favourites yet!</p>
      </div>
    </div>
  </template>