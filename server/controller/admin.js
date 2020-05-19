const { exec } = require('../db.js')

module.exports = {
	approve (tablename, id) {
		tablename = escape(tablename)
		id = escape(id)
		const sql = `UPDATE ${tablename} SET isapprove = true 
		WHERE id = ${id}`
		return exec(sql)
	}
}