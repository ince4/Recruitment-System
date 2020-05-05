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

	async login (username, password) {
		username = escape(username)
		password = escape(password)

		const sql = `select id,username,usertype from user
		WHERE username = '${username}' and pass = '${password}'`
		const rows = await exec(sql)
		return rows[0]
	},

	userTypeChange (username, usertype) {
		username = escape(username)
		usertype = escape(usertype)
		const sql = `UPDATE user SET usertype = '${usertype}' WHERE username = '${username}'`
		return exec(sql)
	}
}