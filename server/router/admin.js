const admin = require('../controller/admin')

module.exports = function (app) {
	app.post('/api/admin/approve', async(req, res) => {
		await admin.approve(req.body.tablename, req.body.id)
		res.send({ok: true})
	})
}