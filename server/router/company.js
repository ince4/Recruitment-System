const company = require('../controller/company')

module.exports = function (app) {
	app.post('/api/company/info', async(req,res) => {
		await company.infoEdit(req.body.username, req.body.formData)
		res.send({ok: true, data: req.body.formData})
	})
}