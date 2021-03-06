
/* 路由主页 */

//系统处理
var system = require("./system");
//主页
var home = require("./home");
//对话页面
var chat = require("./chat");
//登陆
var sysLogin = require("./sys/login");
//登出
var sysOut = require("./sys/out");
//注册
var sysReg = require("./sys/register");
//create
var sysCreate = require("./sys/create");
//into
var sysInto = require("./sys/into")

// 提供给前台的ajax api 
var api = require("./sys/api");

var socketServer = require("../lib/socketServer");

var socketio = require('socket.io');




module.exports = function ( app ) {


	//处理 session
	app.all("*", system.session);
	
	// index /
	app.get('/', home.get);

	// chat
	app.get('/:key', chat.get);

	
	//登陆
	app.get('/sys/login', sysLogin.get);
	
	//登出
	app.get('/sys/out', sysOut.get);
	
	//注册
	app.get('/sys/reg', sysReg.get);
	

	/** 
		post 数据提交
	
	*/
	
	//对话发送信息
	app.post('/:key', chat.post);

	// post 创建对话 /
	app.post('/sys/create', sysCreate.post);

	// get login
	app.post('/sys/login', sysLogin.post);

	// get reg
	app.post('/sys/reg', sysReg.post);

	//进入一个房间
	app.post('/sys/into', sysInto.post);



	/**
		ajax api 
	*/
	//获取模板
	app.get('/sys/tmpl', api.getTmpl);

	//get more
	app.get('/sys/getmore', api.getMore);

	//修改用户信息
	app.post('/sys/set_user_name', api.setUserName);

	//修改对话房间信息
	app.post('/sys/update_room', api.updateRoom);

	//匿名用户绑定email  bindmail
	app.post('/sys/bindmail', api.bindMail);
	//获取我的活动记录
	app.get('/sys/ichats', api.ichats);
	//检查用户名是否注册
	app.get('/sys/checkmail', api.checkMailIsReg);
};

