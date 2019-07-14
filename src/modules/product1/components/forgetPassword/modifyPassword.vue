<template>
  <div class="modifyPassword">
    <div class="form">
      <div class="item">
        <label >用户名：</label>
        <i-input v-model="username" placeholder="请输入用户名" style="width: 200px" @on-enter="submit"></i-input>
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
        <span class="forget"></span>
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
        password: '',
        passwordAgin: '',
        errorInfo: '',
        email: '',
        verifyCode: '',

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
        if(!this.regular.password.test(this.password)){
          return this.errorInfo = '密码输入规则不正确'
        }
        if(this.password !== this.passwordAgin){
          return this.errorInfo = '两次密码不一样'
        }
        return true
      },
      submit(){
        if(this.reg() !== true) return

        service.post(this, '/modifyPassword', {username:this.username,passwordNext: md5(this.password),code: this.verifyCode, email: this.email}).then((res) => {
          if (res.code === 200) {
            console.log(res)
            // this.jumpRouter('/')
            alert('修改密码成功！')
          } else {
            this.errorInfo = res.msg
          }
        })
      },

      init(){
        // 这里一定要区分已经登录修改密码  和 忘记密码时的修改密码
        this.email = this.$route.query.email
        this.verifyCode = this.$route.query.verifyCode
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
  .modifyPassword{
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
