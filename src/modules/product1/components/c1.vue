<template>
    <div class="c1">
      <h3>组件1</h3>
      <button @click="ttt">来点我</button>
    </div>
</template>

<script>

  export default {

		data() {
			return {
			  num: 1
      }
		},
		computed: {},
		watch: {},
		methods: {
		  ttt(){
        this.$eventBus.$emit("decreased", {
          num: this.num++,
        });
      }

    },
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang='less' scoped>

</style>
