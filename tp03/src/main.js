import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueRouter from "vue-router";
import Restaurants from "./components/Restaurants.vue";
import RestaurantDetail from "./components/RestaurantDetail.vue";
import RestaurantMap from "./components/RestaurantMap.vue";
import RestaurantEvaluation from "./components/RestaurantEvaluation.vue";

// configs...
Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.use(VueRouter);

// config du router :
const router = new VueRouter({
  routes: [
    {
      path: "/restaurants",
      name: "restaurants",
      component: Restaurants
    },
    {
      path: "/restaurant/details/:id",
      name: "restaurantDetail",
      component: RestaurantDetail
    },
    {
      path: "/restaurant/details/map",
      name: "restaurantMap",
      component: RestaurantMap
    },
    {
      path: "/restaurant/details/eval",
      name: "restaurantEvaluation",
      component: RestaurantEvaluation
    }
  ],
  mode: "history"
});

new Vue({
  router,
  render: h => h(App) // si router pas de rendu de composant
}).$mount("#app");
