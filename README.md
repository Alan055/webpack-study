# 本地开发环境启动（这里一般是启动指定项目）
npm run dev -- --env=dev --open=product1

# 打包
全部打包 npm run build
指定项目打包 npm run build -- --open=product2 --env=prod // 打包暂时没有区分环境 如果是h5可以区分 加一个console 需要的时候再加

