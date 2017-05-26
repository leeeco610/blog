/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2017-04-05 09:05:05
 * @version $Id$
 */

/*mongoDB*/
const mongoDbHost = '112.74.214.123'
const mongoDbPort = '27017'
const mongoDbName = 'blog'
const mongoDBUser = 'lihaipeng'
const mongoDBPwd = 'lihaipeng'

/*WEB*/
const host = 'localhost'
const isDev = process.env.NODE_ENV == 'production' ? false : true
const port = isDev ? '7777' : '8888'

/*API地址*/
let requestAPI
if(process.env.NODE_ENV == 'hechuanhua' ){
	requestAPI = "http://"+host+"/api/"
}else{
	requestAPI = "http://"+host+":"+port+"/api/"
}


var config = {
    mongoDbHost : mongoDbHost,
    mongoDbPort : mongoDbPort,
    mongoDbName : mongoDbName,
    mongoDBUser: mongoDBUser,
    mongoDBPwd: mongoDBPwd,
    isDev : isDev,
    host : host,
    port : port,
    requestAPI:requestAPI
}



//export default host
module.exports = config