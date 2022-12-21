<template>
  <nav-layout v-if="this.$route.name !== 'login' && this.$route.name !== 'assistance-confirm'"/>
  <div v-else><router-view/></div>
</template>

<style>
@import "@/assets/vendors/feather/feather.css";
@import "@/assets/vendors/ti-icons/css/themify-icons.css";
@import "@/assets/vendors/css/vendor.bundle.base.css";
@import "@/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css";
@import "@/assets/vendors/ti-icons/css/themify-icons.css";
@import "@/assets/js/select.dataTables.min.css";
@import "@/assets/css/vertical-layout-light/style.css";
</style>

<script>
import NavLayout from "@/components/NavLayout";

export default {
  components: {NavLayout},

}
</script>
