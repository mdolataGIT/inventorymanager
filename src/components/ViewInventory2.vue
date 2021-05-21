<template>
  <div id="view-inventory">
    <ul class="collection with-header">
      <li class="collection-item">Name: {{ name }}</li>
      <li class="collection-item">Model: {{ model }}</li>
      <li class="collection-item">Price: {{ price }}</li>
      <li class="collection-item">Ammount: {{ ammount }}</li>
      <li class="collection-item">Source: {{ source }}</li>
      <li class="collection-item">Condition: {{ condition }}</li>
      <li class="collection-item">Txt: {{ txt }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteInventory" class="btn red">Delete</button>

    <div
      class="fixed-action-btn"
      v-for="inventory in inventories"
      v-bind:key="inventory.id"
    ></div>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{
          name: 'edit-inventory2',
          params: { inventory_id: inventory_id },
        }"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "view-inventory",
  data() {
    return {
      inventory_id: null,
      name: null,
      model: null,
      price: null,
      ammount: null,
      source: null,
      condition: null,
      txt: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("inventories")
      .where("inventory_id", "==", to.params.inventory_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.inventory_id = doc.data().inventory_id;
            vm.name = doc.data().name;
            vm.model = doc.data().model;
            vm.price = doc.data().price;
            vm.ammount = doc.data().ammount;
            vm.source = doc.data().source;
            vm.condition = doc.data().condition;
            vm.txt = doc.data().txt;
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("inventories")
        .where("inventory_id", "==", this.$route.params.inventory_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.inventory_id = doc.data();
            this.name = doc.data().name;
            this.model = doc.data().model;
            this.price = doc.data().price;
            this.ammount = doc.data().ammount;
            this.source = doc.data().source;
            this.condition = doc.data().condition;
            this.txt = doc.data().txt;
          });
        });
    },
    deleteInventory() {
      if (confirm("Are you sure?")) {
        db.collection("inventories")
          .where("inventory_id", "==", this.$route.params.inventory_id)
          .where("name", "==", this.name)
          .where("model", "==", this.model)
          .where("price", "==", this.price)
          .where("ammount", "==", this.ammount)
          .where("source", "==", this.source)
          .where("condition", "==", this.condition)
          .where("txt", "==", this.txt)

          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>