<template>
  <div class="mainContainer">
    <authenticated-navbar/>
    <div class="body">
      <account-side-navbar/>
    </div>
  </div>
</template>

<script>
import authenticatedNavbar from "~/components/authenticatedNavbar";
import accountSideNavbar from "~/components/accountSideNavbar";
export default {
  name: "index",
  components : {
    authenticatedNavbar,
    accountSideNavbar
  }
}
</script>

<style scoped>
.mainContainer{
  margin: 0;
  padding: 0;
}

.body{
  border: 1px red solid;
  width: 90%;
  margin: auto;
}
</style>
