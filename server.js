const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const GetTaxController = require('./taxes/get-tax-controller');

const app = new Koa();
const router = new Router({
    prefix: '/api/v1/'
});

app.use(bodyParser());

router.get('/', ctx => {
    ctx.body = "Root of project"
});

const taxController = new GetTaxController();
router.post('get-tax', taxController.process);

app.use(router.routes());

app.listen(4000);