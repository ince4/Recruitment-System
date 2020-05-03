// const env = process.env.NODE_ENV
const mysql = require('mysql')

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'p7512349',
	port: '3306',
	database: 'recruitment_system'
})

con.connect()

function exec (sql) {
	const p = new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	})
	return p
}

module.exports = {
	exec
}