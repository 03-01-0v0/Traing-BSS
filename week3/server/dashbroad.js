const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const cors = require('koa-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router({prefix: '/devices'});
router.get('/', '/', (ctx) => {
    let data = fs.readFileSync('./data/devices.json', 'utf8')
    ctx.body = JSON.parse(data);
})
    .post('/', async (ctx, next) => {
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
            if (device !== '' && ip !== '')
                dataJSON.push(newDevice);
            fs.writeFileSync('./data/devices.json', JSON.stringify(dataJSON))
            ctx.body = dataJSON;
        } catch (e) {
            console.log("Error update data..........");
        }
    })
module.exports = router