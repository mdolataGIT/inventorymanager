<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Inventories</h4></li>
      <li
        v-for="inventory in inventories"
        v-bind:key="inventory.id"
        class="collection-item"
      >
        <div class="chip">{{ inventory.garden }}</div>
        {{ inventory.name }}: {{ inventory.condition }}
        <router-link
          class="secondary-content"
          v-bind:to="{
            name: 'view-inventory',
            params: { inventory_id: inventory.inventory_id },
          }"
        >
          <i class="fa fa-eye"></i>
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
      .orderBy("garden")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            inventory_id: doc.data().inventory_id,
            name: doc.data().name,
            condition: doc.data().condition,
            garden: doc.data().garden,
          };
          this.inventories.push(data);
        });
      });
  },
};
</script>