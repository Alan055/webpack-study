<template>
  <div class="hello">
    <div class="box">
      <div class="item">
        <label >用户名：</label>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      <div class="item">
        <label >密码：</label>
        <input type="text" v-model="password" placeholder="请输入密码">
      </div>
      <div class="item">
        <button @click="login()">登录</button>
        <span>{{mes}}</span>
      </div>
      <div class="item">
        <button @click="register()">注册</button>
        <span>{{mes1}}</span>
      </div>
      <!--<c1></c1>-->
      <!--<c2></c2>-->
    </div>


  </div>
</template>

<script>
  import c1 from "./c1.vue";
  import c2 from "./c2.vue";
  import md5 from "md5";



  export default {
    name: 'HelloWorld',
    components: {c1, c2},
    data() {
      return {
        username: '',
        password: '',
        mes: '',
        mes1: '',
      }
    },
    methods: {
      login(){
        service.postDefault(this,'/api/login',{username:this.username,password:md5(this.password)}).then(function(result){
          this.mes = result.data

        },function(err){
        	console.log(err)
        })
      },
      register(){
        service.getDefault(this,'/api/register',{username:this.username,password:md5(this.password)}).then(function(result){
          this.mes1 = result.data

        },function(err){
          console.log(err)
        })
      }
    },
    created(){
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
      width: 50%;
      display: flex;
      justify-content: left;
      align-items: center;
      height: 46px;
      label{
        width: 100px;
      }
      input{
        height: 32px;
        width: 200px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 5px;
      }
      button{
        cursor: pointer;
      }
    }

  }
</style>
