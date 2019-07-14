<template>
    <div class="forgetPassword">
      <div class="form">
        <div class="item">
          <label >邮箱：</label>
          <i-input v-model="email" placeholder="请输入注册邮箱" style="width: 200px" @on-enter="submit"></i-input>
        </div>
        <div class="item error">
          <label v-if="errorInfo">错误信息：</label>
          <span class="errorInfo" v-if="errorInfo">{{errorInfo}}</span>
          <span class="forget"></span>
        </div>
        <div class="item">
          <i-button type="primary" long @click="submit">发送邮件</i-button>
        </div>

      </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        email: '',
        errorInfo: '',
      }
    },
    computed: {},
    watch: {},
    methods: {
      submit(){
        if(!this.regular.email.test(this.email)){ // 校验邮箱
          return this.errorInfo = '邮箱号码错误！'
        }
        service.post(this, '/forgetPassword', {email:this.email}).then((res) => {
          if (res.code === 200) {
            alert('请查看邮件！')
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
  .forgetPassword{
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
