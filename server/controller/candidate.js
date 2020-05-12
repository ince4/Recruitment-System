const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		const sql = `UPDATE candidate SET 姓名 = '${data['姓名']}', 求职类型 = '${data['求职类型']}', 年龄 = '${data['年龄']}', 籍贯 = '${data['籍贯']}', 学历 = '${data['学历']}', 简介 = '${data['简介']}', 联系方式 = '${data['联系方式']}' 
		WHERE username = '${username}'`
		return exec(sql)
	},

	addCollection (username, collectiontype, collectionid) {
		username = escape(username)
		collectionid = escape(collectionid)
		collectiontype = escape(collectiontype)
		const sql = `insert into collection (username, collectiontype, collectionid) values ('${username}', '${collectiontype}', '${collectionid}')` 
		return exec(sql)
	},

	removeCollection (username, collectionid) {
		username = escape(username)
		collectionid = escape(collectionid)
		const sql = `delete from collection where collectionid = '${collectionid}' and username = '${username}' `
		return exec(sql)
	},

	async getCollection (username, collectiontype) {
		username = escape(username)
		collectiontype = escape(collectiontype)
		const sql = `select ${collectiontype}.* from collection, ${collectiontype}
		where collection.username = '${username}' 
		and collection.collectiontype = '${collectiontype}'
		and collection.collectionid = ${collectiontype}.id`
		const rows = await exec(sql)
		return rows
	}
}