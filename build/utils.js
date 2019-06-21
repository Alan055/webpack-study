'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html中将css文件加上hash值  保证每次打包的css都不一样  这样用户就不需要清楚缓存来清空css了
const merge = require('webpack-merge') // 用于合并对象 类似于Object.assign()
const argv = require('yargs').argv // 获取命令行输入的参数
let dev = process.env.NODE_ENV != 'production' // 当前环境是不是开发环境
let open = argv.open // 获取从命令行中输入的open参数  一般是拿到指定入口或者指定出口时使用  因为我们一般不会启动所有的项目  或者打所有的包
console.log(`打开的项目是：${open}, 环境是：${argv.env}`)

exports.assetsPath = function (_path) {
  const assetsSubDirectory = !dev ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 这里是所有的样式loader 可以在这里设置全局的less、sass、stylus
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 设置样式的处理方式 返回loader的参数 [{test: Reg, use: xxx-loader}] 因为webpack不能直接处理非js文件 所以要通过loader来转换一下方可处理
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 根据环境和参数 来确定是否要单独打包 一起打包 或者全部启动  从而返回相应的一个或多个entry.js的位置
const entries = function () {
  if (open) { // 如果是打开指定目录时 就返回一个目录的而文件即可
    return glob.sync(`./src/modules/${open}/main.js`); // 一般都会走到这儿来
    // if(!dev){ // 生产环境的打包
    //   return glob.sync(`./src/modules/${open}/entry.js`); // 一般都会走到这儿来
    // }else{ // 开发环境的单入口启动项目
    //
    // }
  }
  // 没有指定哪个目录  就是说明全部的
  return glob.sync('./src/modules/**/main.js') // 同步匹配 /src/modules/ 目录下 某个下级文件夹下 的entry.js文件 也就是所有的entry.js 这个就是多入口
}()

// 动态获取多入口的数据
exports.getEntry = () => {
  let obj = {}
  for(const path of entries){
    obj[path.slice('./src/modules/'.length, -'/main.js'.length)] = path // 获取 /src/modules/ 目录和 entry.js  文件中间的这个文件夹的名称
  }
  return obj
}
// 动态获取多出口的打包
exports.getHtmlPlugins = (config) => {
  let htmlPlugins = []
  for (const path of entries) {
    const chunkName = path.slice('./src/modules/'.length, -'/main.js'.length)
    let filename = `./project/${chunkName}/index.html`
    htmlPlugins.push(new HtmlWebpackPlugin(merge({
      template: 'index.html', // 模板来源文件
      filename, // 生产的模板文件的名字 和 路径  --
      inject: true,
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', chunkName]
    }, config)))
  }
  return htmlPlugins
}
