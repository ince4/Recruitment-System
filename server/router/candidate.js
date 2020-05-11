const candidate = require('../controller/candidate')

module.exports = function (app) {
	app.post('/api/candidate/userinfo', async(req, res) => {
		await candidate.infoEdit(req.body.username, req.body.formData)
		res.send({ok: true, data: req.body.formData})
	})

	app.post('/api/collection/add', async(req, res) => {
		await candidate.addCollection(req.body.username, req.body.collectionid, req.body.collectiontype)
		res.send({ok: true})
	})

}