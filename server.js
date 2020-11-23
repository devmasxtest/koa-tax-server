const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const getTax = require('./taxes/get-tax');

const app = new Koa();
const router = new Router({
    prefix: '/api/v1/'
});

app.use(bodyParser());

router.get('/', ctx => {
    ctx.body = "Root of project"
});

router.post('get-tax', getTax);

app.use(router.routes());

app.listen(4000);