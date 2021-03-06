const { exec } = require('../db.js')

module.exports = {
	async isUsernameOccupied (username) {
		username = escape(username)
	
		const sql = `select id,username from user WHERE username = '${username}'`
		const rows = await exec(sql)
		return rows[0]
	},

	register (username, password) {
		username = escape(username)
		password = escape(password)

		const sql = `insert into user (username, pass) values ('${username}', '${password}')`
		return exec(sql)
	},

	async login (username, password, isadmin) {
		username = escape(username)
		password = escape(password)

		const sql = `select id,username,usertype from user
		WHERE username = '${username}' and pass = '${password}' and isadmin = ${isadmin}`
		const rows = await exec(sql)
		return rows[0]
	},

	userTypeChange (username, usertype) {
		username = escape(username)
		usertype = escape(usertype)
		const sql = `UPDATE user SET usertype = '${usertype}' WHERE username = '${username}';`
		return exec(sql)
	},

	// getUserId (username) {
	// 	username = escape(username)
	// 	const sql = `select id from user WHERE username = '${username}';`
	// 	return exec(sql)
	// },

	userTypeUpdate (username, usertype) {
		username = escape(username)
		usertype = escape(usertype)
		const sql =  `insert into ${usertype} (username) values ('${username}');`
		return exec(sql)
	},

	async getListData (tablename) {
		tablename = escape(tablename)
		const sql = `select * from ${tablename}`
		const rows = await exec(sql)
		return rows
	},

	async search (tablename, fieldname, keyword) {
		tablename = escape(tablename)
		keyword = escape(keyword)
		const sql = `select * from ${tablename} where ${fieldname} like '${keyword}%%'`
		const rows = await exec(sql)
		return rows
	},

	async getApplication (tablename) {
		tablename = escape(tablename)
		const sql = `select * from ${tablename} where isapprove = '0'`
		const rows = await exec(sql)
		return rows
	}


}