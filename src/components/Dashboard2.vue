<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Inventory</h4>
      </li>
      <li
        v-for="inventory in inventories"
        v-bind:key="inventory.id"
        class="collection-item"
      >
        {{ inventory.name }} {{ inventory.model }} {{ inventory.price
        }}{{ "zł" }} {{ inventory.ammount }}{{ "pc." }}
        {{ inventory.price * inventory.ammount || "| Together " }}{{ "zł" }}
        {{ inventory.source }} {{ inventory.txt }} {{ inventory.condition }}
        {{ "|  " }}
        <i class="fa fa-calendar"></i> {{ inventory.date }}

        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'view-inventory2',
            params: { inventory_id: inventory.inventory_id },
          }"
        >
          <i class="fa fa-eye">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        </router-link>
      </li>
    </ul>

    <div
      class="fixed-action-btn"
      v-for="inventory in inventories"
      v-bind:key="inventory.id"
    >
      <router-link
        class="btn-floating btn-large red"
        v-bind:to="{
          name: 'new-inventory2',
          params: { garden_id: $route.params.garden_id },
        }"
      >
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      inventories: [],
    };
  },

  created() {
    db.collection("inventories")
      .where("garden_id", "==", this.$route.params.garden_id)
      //.where("name", "!=", "")
      .orderBy("num")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            inventory_id: doc.data().inventory_id,
            name: doc.data().name,
            model: doc.data().model,
            price: doc.data().price,
            ammount: doc.data().ammount,
            source: doc.data().source,
            condition: doc.data().condition,
            txt: doc.data().txt,
            date: doc.data().date,
            num: doc.data().num,
            //garden: doc.data().garden,
          };
          this.inventories.push(data);
        });
      });
  },
};
</script>