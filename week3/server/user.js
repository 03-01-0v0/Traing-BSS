// books.js
const fs = require('fs');
const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
	prefix: '/user'
});

let data = fs.readFileSync('./data/account.json', 'utf8');

router.get('/', (ctx, next) => {
	ctx.body = JSON.parse(data);
	next();
});

// Routes will go here

module.exports = router;