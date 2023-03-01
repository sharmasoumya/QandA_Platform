<template>
  <div class="mainContainer">
    <home-navbar/>
    <signup/>
  </div>
</template>

<script>
import homeNavbar from "@/components/homeNavbar";
import signup from "@/components/signup";
export default {
  name: "index",
  components: {
    signup,
    homeNavbar
  }
}
</script>

<style scoped>

</style>
