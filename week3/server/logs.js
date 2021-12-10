const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const cors = require('koa-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router({prefix: '/logs'});

router.get('/', '/', (ctx) => {
    try {
        if (ctx.query.search !== null) {
            let search = ctx.query.search.toString().toLowerCase();
            let result = []
            let data = fs.readFileSync('./data/logs.json', 'utf8')
            let dataJSON = JSON.parse(data);
            dataJSON.forEach(e => {
                if (e.Name.toString().toLowerCase().indexOf(search) != -1) {
                    result.push(e)
                }
            })
            ctx.body = result;
        } else {
            let data = fs.readFileSync('./data/logs.json', 'utf8')
            ctx.body = JSON.parse(data);
        }
    } catch (e) {
        let data = fs.readFileSync('./data/logs.json', 'utf8')
        ctx.body = JSON.parse(data);
    }
})

module.exports = router;