<template>
  <div id="edit-inventory">
    <h3>Edit Inventory</h3>
    <div class="row">
      <form @submit.prevent="updateInventory" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="inventory_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="garden" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="condition" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "edit-inventory",
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
    updateInventory() {
      db.collection("inventories")
        .where("inventory_id", "==", this.$route.params.inventory_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                inventory_id: this.inventory_id,
                name: this.name,
                garden: this.garden,
                condition: this.condition,
              })
              .then(() => {
                this.$router.push({
                  name: "view-inventory",
                  params: { inventory_id: this.inventory_id },
                });
              });
          });
        });
    },
  },
};
</script>