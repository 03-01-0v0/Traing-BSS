// app.js
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const cors = require('koa-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = new Router({prefix: '/login'});

app.use(cors({
    origin: "http://localhost:3000"
}));
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
        console.log("password",password)
        console.log("username",username);
        let data = fs.readFileSync('./data/account.json', 'utf8')
        let user = JSON.parse(data);
        user.forEach((e) => {
            if (e.username === username && e.password === password) {
                ctx.body = e;
            }
        })
    })

//device

const deviceRouter = new Router({prefix: '/devices'});
deviceRouter.get('/', '/', (ctx) => {
    let data = fs.readFileSync('./data/devices.json', 'utf8')
    ctx.body = JSON.parse(data);
})
    .post('/', async (ctx, next) => {
        // handle your post request here
        try {
            const d = new Date();
            var dateNow = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            var device = ctx.request.body["device"];
            var ip = ctx.request.body["ip"];
            var newDevice = {
                device: device,
                Address: "00:1B:44:11:3A:B7",
                IP: ip,
                Date: dateNow,
                Power: "30"
            }
            var data = fs.readFileSync('./data/devices.json', 'utf8')
            var dataJSON = JSON.parse(data);
            dataJSON.push(newDevice);
            console.log(dataJSON);
            fs.writeFileSync('./data/devices.json', JSON.stringify(dataJSON))
            ctx.body = dataJSON;
            console.log("dataServer", dataJSON);
        } catch (e) {
            console.log("Error update data");
        }
    })
;

//logs

const logRouter = new Router({prefix: '/logs'});
logRouter.get('/', '/', (ctx) => {
    console.log("ctx query", ctx.query)
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
            console.log(result)
            console.log("dataJSON", dataJSON)
            ctx.body = result;
        } else {
            let data = fs.readFileSync('./data/logs.json', 'utf8')
            ctx.body = JSON.parse(data);
        }
    } catch (e) {
        let data = fs.readFileSync('./data/logs.json', 'utf8')
        ctx.body = JSON.parse(data);
    }
});

app.use(logRouter.routes())
    .use(logRouter.allowedMethods());

app.use(deviceRouter.routes())
    .use(deviceRouter.allowedMethods());

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3002);