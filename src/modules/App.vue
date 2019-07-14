<template>
  <div id="app">
    <div class="appBox">
      <header>
        <nav class="left">
          <router-link v-for="(v,i) in nav" :key="i" :to="{path: v.url}">{{v.label}}</router-link>
        </nav>
        <div class="right" v-if="!isLogin">
          <span @click="jump('/login')">登录</span>
          <span @click="jump('/register')">注册</span>
        </div>
        <div class="right" v-else @mouseleave="showSelect=false">
          <img src="./product1/assets/img/header.jpg" alt="我的" @mouseenter="showSelect=true">
          <div class="select" v-show="showSelect" @mouseleave="showSelect=false">
            <span v-for="(v,i) in selectList" :key="i" @click="jumpRouter(v.path)">{{v.label}}</span>
            <span @click="dropOut()">退出登录</span>
          </div>
        </div>
      </header>
      <div class="appBody">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'app',
    data() {
      return {
        nav: [
          {label: '首页', url: '/'},
          {label: '社区论坛', url: '/forum'},
          {label: '分享实例', url: '/instance'},
          {label: '实用小工具', url: '/tools'},
          {label: '我要分享', url: '/share'},
          // {label: '登录',url: '/login'},
          // {label: '注册',url: '/register'},
          {label: '关于我们', url: '/about'},
        ],
        navIndex: 0,
        showSelect: false, // 是否展示下拉框
        selectList: [ // 下拉列表
          {label: '个人中心', path: '/userCenter'},
          {label: '加入我们', path: '/joinUs'},
          {label: '修改密码', path: '/modifyPassword'},
        ],
      }
    },
    computed: {
      ...mapState(['isLogin', 'userInfo']),
    },
    watch: {},
    methods: {
      ...mapMutations(['setUserInfo']),
      ...mapActions(['logout']),
      // 跳转路由
      jump(path) {
        this.$router.push({path: path})
      },
      // 退出登录
      async dropOut() {
        let result = await this.logout(this) // 退出登录
        console.log(result)
        result && this.jumpRouter('/')
      },
      // 拿到缓存中的用户信息
      getUserInfo() {
        let str = localStorage.getItem('userInfo')
        if (str) {
          this.setUserInfo(JSON.parse(str))
        }
      },
      // 拿到平台用户的数量  总的访问数量
      async getProjectInfo() {
        let res = service.post(this, '/statistical', {})
        if (res.code === 0) {

        } else {
        }
      },


      init() {
        this.getUserInfo() // 拿到缓存中的用户信息
        this.getProjectInfo() // 拿到平台用户的数量  总的访问数量

      }
    },
    created() {
      this.init()
    },
    mounted() {
      console.log(this.isLogin)
    },
  }
</script>

<style lang="less">
  * {
    box-sizing: border-box;
    font-size: 14px;
  }

  html, body {
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    height: 100%;
    width: 100%;
    background: url("./product1/assets/img/homeBg.jpg") no-repeat;
    background-size: cover;

    .appBox {
      background: rgba(51, 51, 51, 0.5);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      header {
        height: 100px;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          justify-content: left;
          align-items: center;
          height: 100%;

          a {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 120px;
            font-size: 16px;
            color: #fff;

            &.router-link-exact-active {
              color: @themeColor;
              font-size: 24px;
            }
          }

        }

        .right {
          display: flex;
          justify-content: right;
          align-items: center;
          position: relative;
          min-height: 50px;
          > span {
            cursor: pointer;
            width: 80px;
            color: #fff;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;

            &:last-child {
              color: @themeColor;
              border: 1px solid @themeColor;
              border-radius: 8px;
            }
          }

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
          }

          .select {
            position: absolute;
            top: 50px;
            left: -34px;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
            line-height: 32px;
            border-radius: 4px;
            overflow: hidden;

            span {
              display: flex;
              width: 100%;
              cursor: pointer;
              justify-content: center;
              align-items: center;

              &:hover {
                background: #3399ff;
              }
            }
          }
        }
      }

      > .appBody {
        width: 100%;
        flex-grow: 1;
        overflow: auto;
        .al_scorll();

        > div {
          width: 1200px;
          margin: auto;
        }
      }
    }

  }
</style>
