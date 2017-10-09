# shipyard_zh
shipyard 中文静态插件
    
用法:

1.删除英文静态网页

        docker exec -it shipyard-controller  rm -rf static/app
    
        docker exec -it shipyard-controller  rm -f static/index.html
        
2.下载中文静态页面

        git clone https://github.com/Tangxzh317/shipyard_zh.git

3.将汉化文件拷贝到Docker 

        docker cp  shipyard_zh/static/app  shipyard-controller:/static/
    
        docker cp  shipyard_zh/static/index.html  shipyard-controller:/static/
    
4.删除本地文件

        rm -rf shipyard_zh/
