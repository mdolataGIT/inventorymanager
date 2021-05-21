<template>
  <div id="edit-inventory">
    <h3>Edit Place</h3>
    <div class="row">
      <form @submit.prevent="updateInventory" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="garden" required />
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
      garden: null,
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
        .where("inventory_id", "==", this.$route.params.inventory_id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.inventory_id = doc.data();

            this.garden = doc.data().garden;
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

                garden: this.garden,
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