<template>
    <div class="home">

    </div>
</template>

<script>
	export default {
		data() {
			return {
			  nav: [
          {label: '首页',url: '/'},
          {label: '社区论坛',url: '/forum'},
          {label: '分享实例',url: '/instance'},
          {label: '实用小工具',url: '/tools'},
          {label: '我要分享',url: '/share'},
          {label: '登录',url: '/login'},
          {label: '注册',url: '/register'},
          {label: '关于我们',url: '/about'},
        ],
      }
		},
		computed: {},
		watch: {},
		methods: {},
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang='less' scoped>
  .home{

  }
</style>
