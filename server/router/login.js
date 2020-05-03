const user = require('../controller/user')

module.exports = function (app) {
	app.get('/api', async(req,res) => {
		res.send('?')
	})
	
	app.post('/api/login', async(req,res) => {
		const username = req.body.username
		const password = req.body.password

		let isLogged = await user.login(username, password)
		if (isLogged) {
			res.send({ok: true, msg: '登陆成功'})
		} else {
			res.send({ok: false, msg: '用户名或密码错误'})
		}
	})

	app.post('/api/register', async(req,res) => {
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

}