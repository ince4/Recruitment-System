const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		data = data
		const sql = `UPDATE company SET 名称 = '${data.name}', 行业 = '${data.profession}', 地址 = '${data.address}', 法人 = '${data.artificial}', 注册资本 = '${data.capital}', 其他介绍 = '${data.intro}', 联系方式 = '${data.contact}' 
		WHERE username = '${username}'`
		return exec(sql)
	}
}