const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(require('cors')())
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({ extended:false}));

const loginRouter = require('./router/login')
loginRouter(app)

app.get('/', async(req,res) => {
	res.send('?')
})

app.listen(3030, () => {
	console.log('listening at port 3030')
})