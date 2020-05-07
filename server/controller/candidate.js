const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		data = data
		const sql = `UPDATE candidate SET 姓名 = '${data.name}', 求职类型 = '${data.type}', 年龄 = '${data.age}', 籍贯 = '${data.nativePlace}', 学历 = '${data.educationalBackground}', 简介 = '${data.intro}', 联系方式 = '${data.contact}' 
		WHERE username = '${username}'`
		return exec(sql)
	}
}