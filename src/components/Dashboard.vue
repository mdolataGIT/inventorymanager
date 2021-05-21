<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>My places</h4></li>
      <li
        v-for="inventory in inventories"
        v-bind:key="inventory.id"
        class="collection-item"
      >
        <div class="chip">{{ inventory.garden }}</div>

        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'dashboard2',
            params: { garden_id: inventory.garden_id },
          }"
        >
          <i class="fas fa-angle-right"></i>
        </router-link>
        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'view-inventory',
            params: { garden_id: inventory.garden_id },
          }"
        >
          <i class="fa fa-eye">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
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
      .where("garden", "!=", "")
      .orderBy("garden")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            inventory_id: doc.data().inventory_id,
            garden_id: doc.data().garden_id,
            garden: doc.data().garden,
          };
          this.inventories.push(data);
        });
      });
  },
};
</script>