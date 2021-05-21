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
            <input type="text" v-model="model" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="price" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ammount" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="source" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="condition" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="txt" required />
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
                model: this.model,
                price: this.price,
                ammount: this.ammount,
                source: this.source,
                name: this.name,
                condition: this.condition,
                txt: this.txt,
              })
              .then(() => {
                this.$router.push({
                  name: "view-inventory2",
                  params: { inventory_id: this.inventory_id },
                });
              });
          });
        });
    },
  },
};
</script>