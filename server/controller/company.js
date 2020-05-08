const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		const sql = `UPDATE company SET 名称 = '${data['名称']}', 行业 = '${data['行业']}', 地址 = '${data['地址']}', 法人 = '${data['法人']}', 注册资本 = '${data['注册资本']}', 其他介绍 = '${data['其他介绍']}', 联系方式 = '${data['联系方式']}' 
		WHERE username = '${username}'`
		return exec(sql)
	},

	async getJobInfo () {
		const sql = 'select * from job'
		const rows = await exec(sql)
		return rows[0]
	},
	
	jobPublish (username, data) {
		username = escape(username)
		const sql = `insert into job (username, 职位名称, 人数, 发布时间, 任职要求, 待遇, 是否补助, 联系方式) values ('${username}', '${data['职位名称']}', '${data['人数']}', '${data['发布时间']}', '${data['任职要求']}', '${data['待遇']}', '${data['是否补助']}', '${data['联系方式']}')`
		return exec(sql)
	}
}