<template>
  <div class="register">
    <div class="form">
      <div class="item">
        <label >用户名：</label>
        <i-input v-model="username" placeholder="请输入用户名" style="width: 200px" @on-enter="submit"></i-input>
      </div>
      <div class="item">
        <label >邮箱：</label>
        <i-input v-model="email" placeholder="请输入邮箱" style="width: 200px" @on-enter="submit"></i-input>
      </div>
      <div class="item">
        <label >密码：</label>
        <i-input v-model="password" placeholder="请输入密码" style="width: 200px" @on-enter="submit"></i-input>
      </div>
      <div class="item">
        <label >确认密码：</label>
        <i-input v-model="passwordAgin" placeholder="请再次输入密码" style="width: 200px" @on-enter="submit"></i-input>
      </div>
      <div class="item error">
        <label v-if="errorInfo">错误信息：</label>
        <span class="errorInfo" v-if="errorInfo">{{errorInfo}}</span>
        <span class="forget" @click="jumpRouter('/login')">已有账号</span>
      </div>
      <div class="item">
        <i-button type="primary" long @click="submit">提交</i-button>
      </div>

    </div>
  </div>
</template>

<script>
  import md5 from "md5";



  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        passwordAgin: '',
        errorInfo: '',
      }
    },
    computed: {},
    watch: {},
    methods: {
      // 校验函数  通过返回true
      reg(){
        if(!this.regular.username.test(this.username)){
          return this.errorInfo = '账号输入规则不正确'
        }
        if(!this.regular.email.test(this.email)){
          return this.errorInfo = '邮箱输入规则不正确'
        }
        if(!this.regular.password.test(this.password)){
          return this.errorInfo = '密码输入规则不正确'
        }
        if(this.password !== this.passwordAgin){
          return this.errorInfo = '两次密码不一样'
        }
        return true
      },



      submit(){
        // 校验
        if(this.reg() !== true)  return
        service.post(this, '/register', {username:this.username,password: md5(this.password),email:this.email}).then((res) => {
          if (res.code === 200) {
            console.log(res)

            this.jumpRouter('/')
          } else {
            this.errorInfo = res.msg
          }
        })
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
  .register{
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
