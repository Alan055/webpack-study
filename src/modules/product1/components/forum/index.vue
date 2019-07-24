<template>
    <div class="forum">

      <div class="top">
        <div class="label">我来写点东西：</div>
        <i-input v-model="text" type="textarea" :rows="4" ></i-input>
        <div class="btn">
          <i-button type="primary" @click="submit">发表</i-button>
        </div>
      </div>
      <div class="title" >社区空间</div>
      <div class="content">
        <div class="item" v-for="(v,i) in communityData" :key="i">
          <div class="author">@{{v.username}}：</div>
          <div class="title">{{v.title}}<em></em></div>
          <div class="btn">
            <div class="left">
              <span>评论</span>
            </div>
          </div>
        </div>
        <div class="more" v-if="showMore" ><span @click="++pagination.pageNumber;getComunityData(true)">加载更多>></span></div>
      </div>


    </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
	export default {
		data() {
			return {
        text: '',
        pagination: { // 社区墙分页数据
          pageNumber: 0,
          pageSize: 10,
          total: 0,
        },
        communityData: [], // 社区墙数据
        showMore: false, // 是否展示 加载更多的按钮
        timer: null, // 定时器
      }
		},
		computed: {
      ...mapState(['isLogin','userInfo']),
    },
		watch: {},
		methods: {
		  async submit(){
        // 这里要先判断是否登录  只有登录了才能发表
        if(!this.isLogin) return console.log("没有登录")
        let res = await service.post(this, '/pushMood', {title: this.text,})
        if(res.code === 200){
          this.getComunityData(false) // 重新获取
          this.text = '' // 清空数据
        }else{
          console.log(res.msg)
        }
      },
      // 获取社区墙的数据
      async getComunityData(bol){ // bol=true代表向上查询
        let res = await service.post(this, '/community', {
          startId: this.communityData.length?(bol?this.communityData[this.communityData.length-1].id:this.communityData[0].id):0,
          direction: Boolean(bol),
          pageNumber: 0,
          pageSize: this.pagination.pageSize
        })
        if(res.code === 200){
          if(bol === true || bol === undefined){
            this.communityData = this.communityData.concat(res.data.list)
            this.pagination.total = res.data.total
            this.showMore = res.data.total > res.data.list.length
          }else{
            this.communityData = res.data.list.concat(this.communityData)
          }
        }else{
          console.log(res.msg)
        }
      },

		  init(){
        this.getComunityData() // 获取社区墙的数据
        this.timer = setInterval(()=>{
          this.getComunityData(false) // 获取社区墙的数据
        },10000)
      }
    },
		created() {
		  this.init()
		},
		mounted() {
		},
    destroyed(){
      clearInterval(this.timer)
      this.timer = null
    }
	}
</script>

<style lang='less' scoped>
  .forum{
    background: #fff;
    height: ~"calc(100% - 100px)";
    overflow: auto;
    .al_scorll();
    padding: 20px;
    .top{
      .label{
        font-size: 16px;
        line-height: 36px;
        text-align: left;
      }
      .btn{
        display: flex;
        justify-content: left;
        align-items: center;
        height: 40px;
      }
      /deep/ textarea{
        .al_scorll()
      }
    }
    >.title{
      font-size: 18px;
      color: @themeColor;
      height: 36px;
    }
    .content{
      .item{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 14px;
        .bor(#ccc);
        border-radius: 4px;
        padding: 0 8px;
        .author{
          display: flex;
          justify-content: left;
          align-items: center;
          height: 32px;
          font-size: 16px;
          color: #333;
        }
        .title{
          min-height: 100px;
          display: flex;
          justify-content: left;
          align-items: flex-start;
          flex-wrap: wrap;
          text-align: left;
          width: 100%;
          background: #f7f7f7;
          padding: 8px;
          word-break: break-all;
          font-size: 14px;
        }
      }
      .more{
        span{
          font-size: 14px;
          cursor: pointer;
          &:hover{
            border-bottom: 1px solid #ccc
          }
        }
      }
    }
  }
</style>
