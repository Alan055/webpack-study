import Vue from 'vue';
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
  install(Vue, options) {
    // 复制功能
    Vue.prototype.copy = function (v, fn) { // fn存在时走fn
      this.$copyText(v).then(() => {
        !fn ? this.$Modal.al_default({status: 'success', content: '您已复制成功'}) : fn();
      }).catch(() => {
        this.$Modal.al_default({status: 'warning', content: '复制出错，请手动复制'})
      })
    }
    // 时间转换器
    Vue.prototype.timeTranslate2 = function (v) {
      let m = Math.floor(v / 60)
      let s = v - (m * 60)
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
    }
    // 随机数
    Vue.prototype.al_random = function (x, y) {
      // 随机数 在x，y之间的整数,不包含y
      !y && (y = 0)
      return Math.floor(Math.random() * (x - y) + y)
    };
    // 将数字转换成两位小数
    Vue.prototype.al_fi = function (v, bol) {
      // bol 是否转换成金额的字符串  1000,1000.22
      if (v) {
        if (isNaN(Number(v))) {
          return v // 如果不能转换成数字，就直接返回字符串
        } else {
          let str = Number(v).toFixed(2) + ''
          if (!bol) return str
          let arr = str.split('.')
          let s = ''
          for (let [i, val] of arr[0].split("").reverse().entries()) {
            if (i % 3 == 0 && i != 0) {
              s = val + ',' + s
            } else {
              s = val + s
            }
          }
          return s + '.' + arr[1]
        }
      } else {
        return '0.00'
      }
    };
    // 扩展moment事件插件
    Vue.prototype.moment = moment
    // 路由跳转 存储之前的路由和参数 放在storage里面
    Vue.prototype.jumpRouter = function (path, data) {
      this.$router.push({path: path, query: data}) // 跳转页面
    }
    Vue.prototype.backRouter = function () {
      this.$router.push(this.$store.state.routerList.slice(-1)[0]) // 跳转到最近的一个路由去
    }
    // 正则
    Vue.prototype.regular = {
      username: /^[a-zA-Z0-9_]{6,10}$/,
      email: /^.+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
      verifyCode: /^([0-9]){5}$/,
    }
  }
}
