<template>
  <div id="view-inventory">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>My place</h4>
      </li>
      <li class="collection-item">Garden: {{ garden }}</li>
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
      garden: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("inventories")
      .where("garden_id", "==", to.params.garden_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            vm.inventory_id = doc.data().inventory_id;
            vm.garden_id = doc.data().garden_id;
            vm.garden = doc.data().garden;
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
        .where("garden_id", "==", this.$route.params.garden_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.inventory_id = doc.data().inventory_id;
            this.garden_id = doc.data().garden_id;
            this.garden = doc.data().garden;
          });
        });
    },
    deleteInventory() {
      if (confirm("Are you sure?")) {
        db.collection("inventories")
          .where("garden_id", "==", this.$route.params.garden_id)
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