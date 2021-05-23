<template>
  <div id="new-inventory">
    <h3>New Inventory</h3>
    <div class="row">
      <form @submit.prevent="saveInventory" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="model" required />
            <label>Model</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="price" required />
            <label>Price</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="ammount" required />
            <label>Ammount</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="source" required />
            <label>Source</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="txt" required />
            <label>Txt</label>
          </div>
        </div>
        <div class="row">
          <i class="fas fa-angle-right"></i>
          <input type="radio" id="one" value="Ok" v-model="condition" />
          <label for="one">&nbsp; OK</label>
          <input type="radio" id="two" value="Borrowed" v-model="condition" />
          <label for="two">BORROWED</label>
          <input type="radio" id="three" value="Damaged" v-model="condition" />
          <label for="three">DAMAGED &nbsp;</label>
          <i class="fas fa-angle-left"></i>
          <div class="input-field col s12">
            <input type="text" v-model="condition" required />
          </div>
        </div>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox">{{ checked }}</label>

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
      name: null,
      model: null,
      price: null,
      ammount: null,
      source: null,
      condition: null,
      txt: null,
      date: null,
      num: null,
    };
  },
  methods: {
    saveInventory() {
      db.collection("inventories")
        .add({
          inventory_id: Math.random(),
          garden_id: this.$route.params.garden_id,
          name: this.name,
          model: this.model,
          price: this.price,
          ammount: this.ammount,
          source: this.source,
          condition: this.condition,
          txt: this.txt,
          date: new Date().toLocaleString(),
          num: 1,
        })
        .then((docRef) => this.$router.push("/"))
        .catch((error) => console.log(err));
    },
  },
};
</script>