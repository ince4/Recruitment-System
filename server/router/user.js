const user = require('../controller/user')

module.exports = function (app) {
	app.get('/api', async(req,res) => {
		res.send('')
	})
	
	app.post('/api/login', async(req, res) => {
		const username = req.body.username
		const password = req.body.password
		const isadmin = req.body.isadmin

		let isLogged = await user.login(username, password, isadmin)
		if (isLogged) {
			res.send({ok: true, msg: '登陆成功', usertype: isLogged.usertype, username: isLogged.username})
		} else {
			res.send({ok: false, msg: '用户名或密码错误'})
		}
	})

	app.post('/api/register', async(req, res) => {
		const username = req.body.username
		const password = req.body.password
		
		let isOccupied = await user.isUsernameOccupied(username)

		if (isOccupied) {
			res.send({ok: false, msg: '该用户名已被使用'})
		} else {
			user.register(username, password)
			res.send({ok: true, msg: '注册成功'})
		}
	})

	app.post('/api/usertype', async(req, res) => {
		await user.userTypeChange(req.body.username, req.body.usertype)
		await user.userTypeUpdate(req.body.username, req.body.usertype)
		res.send({ok: true})
	})

	app.get('/api/list', async (req, res) => {
		const result = await user.getListData(req.query.tablename)
		res.send(result)
	})

	app.get('/api/admin/application', async (req, res) => {
		const result = await user.getApplication(req.query.tablename)
		res.send(result)
	})
}