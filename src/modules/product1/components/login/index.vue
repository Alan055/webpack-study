<template>
    <div class="login">
      <div class="form">
        <div class="item">
          <label >用户名：</label>
          <i-input v-model="username" placeholder="请输入用户名/邮箱" style="width: 200px" @on-enter="login"></i-input>
        </div>
        <div class="item">
          <label >密码：</label>
          <i-input v-model="password" placeholder="请输入密码" style="width: 200px" @on-enter="login"></i-input>
        </div>
        <div class="item error">
          <label v-if="errorInfo">错误信息：</label>
          <span class="errorInfo" v-if="errorInfo">{{errorInfo}}</span>
          <span class="forget" @click="jumpRouter('/forgetPassword')">忘记密码</span>
        </div>
        <div class="item">
          <i-button type="primary" long @click="login">立即登录</i-button>
        </div>

      </div>
    </div>
</template>

<script>
  import md5 from "md5";
  import {mapState, mapMutations, mapActions} from 'vuex';


  export default {
		data() {
			return {
        username: '',
        password: '',
        errorInfo: '',
      }
		},
		computed: {},
		watch: {},
		methods: {
		  ...mapMutations(['setUserInfo']),
      ...mapActions(['logout']),
		  login(){
        service.post(this, '/login', {username:this.username,password: md5(this.password)}).then((res) => {
          if (res.code === 200) {
            this.setUserInfo(res.data) // 将用户信息写入到vuex中
            this.jumpRouter('/')
          } else {
            this.errorInfo = res.msg
          }
        })
      },

		  init(){
        this.logout(this) // 注销 进入登录页面就应该要将之前的账号注销掉
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
  .login{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .form{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background: rgba(255,255,255,.8);
      border-radius: 8px;
      border: 1px solid @themeColor;
      width: 500px;
      min-height: 400px;
      padding: 20px 0;
      .item {
        margin-top: 20px;
        height: 40px;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 280px;
        label {
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
          width: 80px;
        }
        &.error{
          color: #ff4633;
          justify-content: flex-end;
          .errorInfo{
            width: 130px;
            display: flex;
            justify-content: flex-start;
          }
          .forget{
            display: flex;
            justify-content: center;
            width: 70px;
            cursor: pointer;
            color: #666;
            &:hover{
              border-bottom: 1px solid #ccc
            }
          }
        }
        &.forget{
          justify-content: flex-end;

          span{

          }

        }
      }
    }
  }
</style>
