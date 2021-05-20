<template>
  <div id="view-inventory">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Name: {{ name }}</li>
      <li class="collection-item">Condition: {{ condition }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteInventory" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{
          name: 'edit-inventory',
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
      garden: null,
      condition: null,
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
            vm.garden = doc.data().garden;
            vm.condition = doc.data().condition;
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
            this.garden = doc.data().garden;
            this.condition = doc.data().condition;
          });
        });
    },
    deleteInventory() {
      if (confirm("Are you sure?")) {
        db.collection("inventories")
          .where("inventory_id", "==", this.$route.params.inventory_id)
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