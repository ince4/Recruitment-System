const company = require('../controller/company')

module.exports = function (app) {
	app.post('/api/company/userinfo', async(req,res) => {
		await company.infoEdit(req.body.username, req.body.formData)
		res.send({ok: true, data: req.body.formData})
	})

	app.post('/api/job/publish', async(req, res) => {
		await company.jobPublish(req.body.username, req.body.jobData)
		res.send({ok: true, data: req.body.jobData})
	})
}