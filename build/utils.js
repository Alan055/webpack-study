'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html中将css文件加上hash值  保证每次打包的css都不一样  这样用户就不需要清楚缓存来清空css了
const merge = require('webpack-merge') // 用于合并对象 类似于Object.assign()

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

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

// Generate loaders for standalone style files (outside of .vue)
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
const entries = function() {
  return glob.sync('./src/modules/**/main.js') // 同步匹配 /src/modules/ 目录下 某个下级文件夹下 的entry.js文件 也就是所有的entry.js 这个就是多入口
}()

exports.getHtmlPlugins = (config) => {
  let htmlPlugins = []
  for(const path of entries){
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
