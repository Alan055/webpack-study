'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora') // 加载中的效果 图标 颜色之类的
const rm = require('rimraf') // 删除一个文件或文件夹 不管是否为空都可以删除
const path = require('path') // node中操作路径的模块
const chalk = require('chalk') // 这个是改变输出文字的样色  样式之类的
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...') // 传入加载中文本
spinner.start() // 开始加载中效果

// 这里是删除一个文件 一般都是删除入口文件index.html
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  // ★★★★★★★★★★★★★★★★★★★★
  // 开始打包
  webpack(webpackConfig, (err, stats) => { // 回调
    spinner.stop() // 关闭加载中效果
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n')) // 输入红色的文字  Build failed with errors.
      process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n')) // 输入青色的文字
    console.log(chalk.yellow( // 输入黄色的文字
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
