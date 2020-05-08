const candidate = require('../controller/candidate')

module.exports = function (app) {
	app.post('/api/candidate/userinfo', async(req,res) => {
		await candidate.infoEdit(req.body.username, req.body.formData)
		res.send({ok: true, data: req.body.formData})
	})
}