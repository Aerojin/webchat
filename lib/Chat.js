
/*

	Chat  一个post的抽象类

*/

exports = module.exports = Chat;


function Chat( roomid , text, user){

	this.time = parseInt(new Date().getTime() / 1000);
	this._id = null; //此数据为数据库生成

	this.roomid = roomid;
	this.text = text || "";

	this.Uid = user.id;
	this.Uname = user.name;

	this.del = 0; // 是否已经被删除

	this.index = 0;

	this.to = null;//针对性对话信息

};

Chat.prototype = {

	// time 为标准时间错 / 1000
	setId:function( id ){
		this._id = id;
	},
	setTime:function( time ){
		this.time = time;
	},
	setText:function( text ){
		this.text = text;
	},
	setUser:function( user ){

		this.Uid = user.id;
		this.Uname = user.name;

	},
	setDel:function( del ){

		this.del = del;
	},

	setIndex:function( index ){

		this.index = index;
	},
	setTo:function( to ){
		this.to = to;
	},
	save:function(){

	},

	toJSON:function(){

		return {
			index:this.index,
			roomid:this.roomid,
			time : this.time, 
			text : this.text,

			Uid : this.Uid, 
			Uname: this.Uname,

			del : this.del  // 是否已经被删除

		}

	},

	onUpdate:function( keys ){


	}
}
