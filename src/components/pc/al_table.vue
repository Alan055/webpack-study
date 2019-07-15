<template>
    <div class="al_table">
      <div class="top">
        <span v-for="(v,i) in tableTop" :key="i">{{v}}</span>
      </div>
      <div class="content">
        <slot></slot>

      </div>
      <div class="bottom" >
        <p>共 <span>{{pagination.total}}</span> 条数据</p>
        <Page :total="pagination.total" show-sizer @on-change="tableChange" @on-page-size-change="sizeChange"/>
      </div>
    </div>
</template>

<script>
	export default {
	  props: ['tableTop', 'pagination', 'init'],
		data() {
			return {}
		},
		computed: {},
		watch: {},
		methods: {
      tableChange(i){
        this.pagination.pageNumber = i - 1
        this.init()
      },
      sizeChange(size){
        this.pagination.pageNumber = 0
        this.pagination.pageSize = size
        this.init()
      }

    },
		created() {
		},
		mounted() {
		},
	}
</script>

<style lang='less' scoped>
  .al_table{
    position: relative;
    width: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    .top {
      height: 40px;
      display: flex;
      justify-content: left;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background: @themeColor;
      color: #fff;
      span{
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: none;
        }
      }
    }
    .content {
      height: ~"calc(100% - 89px)";
      overflow: auto;
      .al_scorll();
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 52px;
      border-top: 1px solid #ccc;
      background: #fff;
      p{
        margin: 0 10px;
        span{
          color: red;
        }
      }
    }
  }
</style>
