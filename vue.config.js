/*
 * @Author: Joe.Rh 
 * @Date: 2019-05-06 10:04:35 
 * @Last Modified by: Joe.Rh
 * @Last Modified time: 2019-05-06 13:53:19
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports={
  chainWebpack:config =>{
    config.module.rule('svgIcon').test(/\.svg$/).include.add(resolve('src/icons')).end()  // 处理 svg 目录
    .use('svg-sprite-loader').loader('svg-sprite-loader').tap(options=>{
      options = {symbolId:'icon-[name]'}
      return options
    })

    // 原有得 svg 图像处理loader 添加 exclude
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
  }
}