module.exports={
    // 设置公共路径
    publicPath: "./",
    runtimeCompiler: true,
    //配置别名
    configureWebpack:{
      resolve:{
        //配置别名,值src目录的子母，不用再写路径了
        alias:{
          // 内部已有一个别名： 'src'  : '@'
          'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
          'network':'@/network',
          'views':'@/views',
          
        }
      }
    }
  }
  //将来和公共设置进行合并  merge
  