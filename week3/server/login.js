// books.js
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const cors = require('koa-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = new Router({prefix: '/login'});

let data = fs.readFileSync('./data/account.json', 'utf8');

app.use(bodyParser());
router.get('/', async (ctx) => {
    console.log(ctx.param);
    let data = fs.readFileSync('./data/account.json', 'utf8')
    console.log(data);
    ctx.body = JSON.parse(data);
})

.post('/', async (ctx, next) => {
	console.log(ctx.request);
	let username = ctx.request.body["username"];
	let password = ctx.request.body["password"];
	let data = fs.readFileSync('./data/account.json', 'utf8')
	let user = JSON.parse(data);
	user.forEach((e) => {
		if (e.username === username && e.password === password) {
			ctx.body = e;
		}
	})
})

// Routes will go here

module.exports = router;