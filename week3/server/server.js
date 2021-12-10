// app.js
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const cors = require('koa-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = require('./login.js')

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(bodyParser());

//device

const deviceRouter = require('./dashbroad.js')

//logs

const logRouter = require('./logs.js')

app.use(logRouter.routes())
    .use(logRouter.allowedMethods());

app.use(deviceRouter.routes())
    .use(deviceRouter.allowedMethods());

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3002);