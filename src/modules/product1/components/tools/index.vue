<template>
    <div class="tools">
      <div class="nav">
        <div class="title">工具列表</div>
        <div class="list">
          <router-link :to="routerOne.tool+v.path" v-for="(v,i) in nav" :key="i">{{v.label}}</router-link>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
	export default {
		data() {
			return {
			  nav: [
          {label: 'js注释率检测', path: ''},
          {label: 'csdn爬虫数据展示', path: '/reptile'},
          {label: '6v电影爬虫数据展示', path: '/movie'},
        ],
      }
		},
		computed: {
      ...mapState(['routerOne']),
    },
		watch: {},
		methods: {},
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang='less' scoped>
  .tools{
    background: #fff;
    height: ~"calc(100% - 50px)";
    display: flex;
    justify-content: space-between;
    align-items: center;
    // .bor(#ccc);
    >div{
      height: 100%;
      overflow: auto;
      .al_scorll();
    }
    .content{
      width: 1024px;
      padding: 10px;
    }
    .nav{
      flex-grow: 1;
      border-right: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .title{
        width: 100%;
        height: 40px;
        background: #ed4014;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .list{
        width: 100%;
        flex-grow: 1;
        a{
          width: 100%;
          color: #333;
          border-bottom: 1px solid #ccc;
          height: 42px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.router-link-exact-active{
            color: @themeColor;
          }
        }
      }

    }
  }
</style>
