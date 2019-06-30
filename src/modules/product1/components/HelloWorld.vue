<template>
  <div class="hello">
    <h1>event bus</h1>
    <div class="box">
      <c1></c1>
      <c2></c2>
    </div>

  </div>
</template>

<script>
  import c1 from "./c1.vue";
  import c2 from "./c2.vue";


  export default {
    name: 'HelloWorld',
    components: {c1, c2},
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
