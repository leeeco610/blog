# blog

blog在线预览地址：http://www.hechuanhua.cn

 前端: react+redux+react-router
 
 后端: node+express+mongoDB提供的API
 
 前后端完全分离

### 开始 
修改mondoDb.sh路径为自己本机上的mongo路径

### 运行
    git clone https://github.com/hechuanhua/blog.git
    npm install
    npm install webpack babel babel-cli pm2 -g
    cd blog
    启动mongo：  ./mongoDb.sh


##### 开发环境
    npm run dev
    浏览器输入 localhost:7070

##### 生产环境
    npm run dist(npm run dist_linux)
    浏览器输入 localhost:8080


