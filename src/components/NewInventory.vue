<template>
  <div id="new-inventory">
    <h3>New Place</h3>
    <div class="row">
      <form @submit.prevent="saveInventory" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="garden" required />
            <label>Garden</label>
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
      garden_id: null,
      garden: null,
      name: null,
      model: null,
      price: null,
      ammount: null,
      source: null,
      condition: null,
      txt: null,
      num: null,
    };
  },
  methods: {
    saveInventory() {
      db.collection("inventories")
        .add({
          inventory_id: Math.random(),
          garden_id: Math.random(),
          garden: this.garden,
          name: "Name ",
          model: "| Model",
          price: "| Price ",
          ammount: "| Ammount ",
          source: "| Source",
          txt: "| Text",
          condition: "| Condition",
          num: 0,
        })
        .then((docRef) => this.$router.push("/"))
        .catch((error) => console.log(err));
    },
  },
};
</script>