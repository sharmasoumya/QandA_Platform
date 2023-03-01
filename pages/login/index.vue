<template>
  <div class="mainContainer">
    <home-navbar/>
    <login/>
  </div>
</template>

<script>
import homeNavbar from "~/components/homeNavbar";
import login from "~/components/login";
export default {
  name: "index",
  components: {
    homeNavbar,
    login
  }
}
</script>

<style scoped>

</style>
