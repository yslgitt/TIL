<template>
  <div>
    <h1>안녕! {{ userName }}!</h1>
    <p>{{ message }}</p>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "Ten",
      message: "반가워!",
      arr: [],
      obj: {}
    }
  }
}
</script>

<style scoped>
.text-red {
  color: red;
}

</style>