<template>
  <div class="c2">
    <h3>组件2</h3>
    <div>{{fontCount}}</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        fontCount: 0
      }
    },
    computed: {},
    watch: {},
    methods: {
      ttt(){
        this.$eventBus.$on("decreased", ({num}) => {
          this.fontCount = num
        });
      }
    },
    created() {
      this.ttt()
    },
    mounted() {
    },
  }
</script>

<style lang='less' scoped>

</style>
