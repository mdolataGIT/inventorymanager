<template>
  <div id="new-inventory">
    <h3>New Inventory</h3>
    <div class="row">
      <form @submit.prevent="saveInventory" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="inventory_id" required />
            <label>Inventory ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="garden" required />
            <label>Garden</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="condition" required />
            <label>Condition</label>
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
  name: "new-inventory",
  data() {
    return {
      inventory_id: null,
      name: null,
      garden: null,
      condition: null,
    };
  },
  methods: {
    saveInventory() {
      db.collection("inventories")
        .add({
          inventory_id: this.inventory_id,
          name: this.name,
          garden: this.garden,
          condition: this.condition,
        })
        .then((docRef) => this.$router.push("/"))
        .catch((error) => console.log(err));
    },
  },
};
</script>