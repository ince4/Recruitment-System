const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		const sql = `UPDATE candidate SET 姓名 = '${data['姓名']}', 求职类型 = '${data['求职类型']}', 年龄 = '${data['年龄']}', 籍贯 = '${data['籍贯']}', 学历 = '${data['学历']}', 简介 = '${data['简介']}', 联系方式 = '${data['联系方式']}' 
		WHERE username = '${username}'`
		return exec(sql)
	},

	addCollection (username, collectionid, collectiontype) {
		username = escape(username)
		collectionid = escape(collectionid)
		collectiontype = escape(collectiontype)
		const sql = `insert into collection (username, collectionid, collectiontype) values ('${username}', '${collectionid}', '${collectiontype}')` 
		return exec(sql)
	}
}