<template>
    <div class="forum">

      <div class="top">
        <div class="label">我来写点东西：</div>
        <i-input v-model="text" type="textarea" :rows="4" ></i-input>
        <div class="btn">
          <i-button type="primary" @click="submit">发表</i-button>
        </div>
      </div>


    </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
	export default {
		data() {
			return {
        text: '',
      }
		},
		computed: {
      ...mapState(['isLogin','userInfo']),
    },
		watch: {},
		methods: {
		  submit(){
        // 这里要先判断是否登录  只有登录了才能发表
        if(!this.isLogin) return console.log("没有登录")

        let res = service.post(this, '/pushMood', {title: this.text,})
        console.log(res)

      },


		  init(){

      }
    },
		created() {
		  this.init()
		},
		mounted() {
		},
	}
</script>

<style lang='less' scoped>
  .forum{
    background: #fff;
    height: ~"calc(100% - 100px)";
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
  }
</style>
