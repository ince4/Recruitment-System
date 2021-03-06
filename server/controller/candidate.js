const { exec } = require('../db.js')

module.exports = {
	infoEdit (username, data) {
		username = escape(username)
		const sql = `UPDATE candidate SET 姓名 = '${data['姓名']}', 求职类型 = '${data['求职类型']}', 年龄 = '${data['年龄']}', 籍贯 = '${data['籍贯']}', 学历 = '${data['学历']}', 简介 = '${data['简介']}', 联系方式 = '${data['联系方式']}',  isapprove = false 
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
		where collection.username = '${username}' and collection.collectiontype = '${collectiontype}' and ${collectiontype}.id = collection.collectionid`
		const rows = await exec(sql)
		return rows
	},

	jobApply (jobid, candidatename) {
		jobid = escape(jobid)
		candidatename = escape(candidatename)
		const sql = `insert into jobapplication (jobid, candidatename) values ('${jobid}', '${candidatename}')` 
		return exec(sql)
	},

	isApplicationDupte (jobid, candidatename) {
		jobid = escape(jobid)
		candidatename = escape(candidatename)
		const sql = `select status from jobapplication
		where jobid = ${jobid} and candidatename = '${candidatename}'` 
		return exec(sql)
	},

	async getJobApplication (candidatename) {
		candidatename = escape(candidatename)
		const sql = `select job.*, jobapplication.status from jobapplication, job
		where jobapplication.candidatename = '${candidatename}' and job.id = jobapplication.jobid` 
		const rows = await exec(sql)
		// let res = []
		// for (item of rows) {
		// 	res.push(item.jobid)
		// }
		return rows
	}
}