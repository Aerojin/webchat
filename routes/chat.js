/**
	
	chat
	
	对话页面
*/

var UserModel = require("../lib/UserModel");
var RoomModel = require('../lib/RoomModel');
var ChatModel = require('../lib/ChatModel');
var LogModel = require('../lib/LogModel');

var socketServer = require('../lib/socketServer');

var maxIndex = {};



module.exports = {

	
		/**

			对话首页
		
		*/
		get:function(req, res){

			var i = 0;
			var user = req.session.user ? req.session.user.getInfo() : null;
			var indexData = {
				user:user
			};

			if( user == null ){

				UserModel.createAnonymousUser( function( status ){

					if(status.code == 0){
						user = status.result;//User.factory( userjson );
						res.setHeader("Set-Cookie", ["sid="+user.toCookie()+";path=/;expires="+new Date("2030") ]);
						indexData.user = user.getInfo();
						intoPage();
					}else{

						//  创建匿名用户错误
						throw " createAnonymousUser error "+ status.code;
					}
				});

			}else{

				intoPage();
			}


			function intoPage(){
				//var i = 0;
				
				var key = req.params.key;

				//查找对话房间信息

				RoomModel.idOrNameFind(key, key, function( status ){

					//console.log("idOrNameFind", status);
					if(status.code == "0"){

						var room = status.result;
						var roomid = room.id;
						indexData.room = room.getInfo();


						//查找首页数据 
						ChatModel.findChats( roomid , 10, function( status ){

							//console.log( status )
							indexData.indexChats = status.result || [];
							console.log("indexData.indexChats", status);
							res.render('chat', indexData);

						});


						//创建用户日志
						LogModel.create( user._id, "into_room",  room.getInfo() );

					}else{

						res.render("404", {msg:"没有找到对话空间，请再次确认输入。"});
						res.end();
					}


				});
			}

		},
		// 发布一条信息
		post:function( req, res ){

			var user = req.session.user;
			var text = req.body.text;
			var roomid = req.body.roomid;
			var to = req.body.to || null;//针对某条信息的回复 源信息id

			if(text && roomid){

				var userjson = {

					"uid":user._id,
					"uname":user.name,
					"uavatar":user.getGravatar()

				};

				ChatModel.create(roomid, text, userjson, to, function( status ){

					res.write( status.toString(), "utf-8" );
					res.end();

					//console.log("create", status );
					if(status.code == "0"){
						var chat = status.result;
						socketServer.newChat( chat[0] );
					}

				});

			}else{
				res.end("{code:-1}", 'utf-8')
			}

		}


};